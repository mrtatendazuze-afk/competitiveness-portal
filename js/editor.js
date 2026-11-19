/* =====================================================================================
   DATA EDITOR — administrator only
   Edits every number and every piece of text the portal shows, then writes the result
   back to data/database.js in a GitHub repository. GitHub Pages rebuilds the live site
   from that commit, so there is no file to download and swap by hand.

   How it connects
   - You supply a fine-grained personal access token scoped to the one repository, with
     Contents set to Read and write. The token is held in this browser tab only
     (sessionStorage) and is gone when the tab closes or you sign out.
   - Nothing else is needed: no server, no build step, no hosting account.

   What it is not
   - The token in this tab can write to that repository. Treat it like a password: do not
     use the editor on a shared machine, and give it an expiry date.
   ===================================================================================== */

const ED = {
  cfg:  {owner:'', repo:'', branch:'main', path:'data/database.js'},
  tok:  '',
  W:    null,      // working copy being edited
  base: null,      // the data as last loaded, for the change list
  sha:  null,      // blob sha of the file on GitHub, needed to commit
  prefix: '',      // the comment header at the top of database.js, preserved on write
  comments: {},    // the comment above each section, also preserved
  tab:  'ind',
  q:    '',
  dom:  '',
  chart:'',
  fields: [],
  changes: new Map(),
  msg: '',
  status: {kind:'idle', text:'Not connected'}
};

const CFG_KEY = 'tii.gh.cfg', TOK_KEY = 'tii.gh.tok', DRAFT_KEY = 'tii.draft', WORK_KEY = 'tii.draft.work';

/* ---------- plumbing ---------- */
const edClone = o => JSON.parse(JSON.stringify(o));
const edWords = s => (String(s||'').trim().match(/\S+/g)||[]).length;

function edLoadCfg(){
  try{ const c = JSON.parse(localStorage.getItem(CFG_KEY)||'null'); if(c) Object.assign(ED.cfg, c); }catch(e){}
  try{ ED.tok = sessionStorage.getItem(TOK_KEY) || ''; }catch(e){}
}
function edSaveCfg(){
  try{ localStorage.setItem(CFG_KEY, JSON.stringify(ED.cfg)); }catch(e){}
  try{ ED.tok ? sessionStorage.setItem(TOK_KEY, ED.tok) : sessionStorage.removeItem(TOK_KEY); }catch(e){}
}
function edReset(){
  ED.W = edClone(window.TII_DB);
  ED.base = edClone(window.TII_DB);
  ED.changes.clear();
  /* coming back from a preview: the draft is now the working copy, so restore what it
     was edited from, and the change list that goes with it */
  if(window.TII_DRAFT){
    try{
      const w = JSON.parse(sessionStorage.getItem(WORK_KEY)||'null');
      if(w){ ED.base = w.base; ED.changes = new Map(w.changes); ED.sha = w.sha; ED.prefix = w.prefix || ''; ED.comments = w.comments || {}; }
    }catch(e){}
  }
}
function edSaveWork(){
  try{ sessionStorage.setItem(WORK_KEY, JSON.stringify({
    base: ED.base, changes: [...ED.changes], sha: ED.sha, prefix: ED.prefix, comments: ED.comments })); }catch(e){}
}

/* base64 that survives accents and symbols in the text */
function b64enc(s){
  const b = new TextEncoder().encode(s); let out=''; const C=0x8000;
  for(let i=0;i<b.length;i+=C) out += String.fromCharCode.apply(null, b.subarray(i,i+C));
  return btoa(out);
}
function b64dec(s){
  const bin = atob(s.replace(/\s+/g,'')); const b = new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++) b[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(b);
}

/* ---------------------------------------------------------------------------------
   database.js is JavaScript, not JSON: it carries a header and a comment above each
   section so it can also be edited by hand. Reading it keeps those comments; writing
   it puts them back, so the editor never strips the guidance out of the file.
   --------------------------------------------------------------------------------- */
function edScan(s){
  let out='', depth=0, i=0, inStr=false, bs=false, pend=[]; const comments={};
  while(i<s.length){
    const c = s[i];
    if(inStr){ out+=c; if(bs) bs=false; else if(c==='\\') bs=true; else if(c==='"') inStr=false; i++; continue; }
    if(c==='/' && s[i+1]==='*'){
      const j = s.indexOf('*/', i+2), cm = s.slice(i, j<0?s.length:j+2);
      if(depth===1) pend.push(cm);
      out += cm.replace(/[^\n]/g,' ');
      i = j<0 ? s.length : j+2; continue;
    }
    if(c==='/' && s[i+1]==='/'){
      const j = s.indexOf('\n', i), cm = s.slice(i, j<0?s.length:j);
      if(depth===1) pend.push(cm);
      out += cm.replace(/[^\n]/g,' ');
      i = j<0 ? s.length : j; continue;
    }
    if(c==='"'){
      if(depth===1 && pend.length){
        const m = /^"((?:[^"\\]|\\.)*)"\s*:/.exec(s.slice(i));
        if(m){ comments[JSON.parse('"'+m[1]+'"')] = pend.join('\n'); pend = []; }
      }
      inStr = true; out += c; i++; continue;
    }
    if(c==='{' || c==='[') depth++;
    if(c==='}' || c===']'){ depth--; if(depth===0){ out += c; break; } }
    out += c; i++;
  }
  return {clean: out, comments};
}
function edParseFile(txt){
  const i = txt.indexOf('window.TII_DB');
  if(i < 0) throw new Error('That file does not look like the portal data file: no window.TII_DB in it.');
  const open = txt.indexOf('{', txt.indexOf('=', i));
  const {clean, comments} = edScan(txt.slice(open));
  return {prefix: txt.slice(0, i), obj: JSON.parse(clean), comments};
}
/* the file exactly as it will be committed */
function edFileText(){
  const head = ED.prefix || '/* Zimbabwe Competitiveness Report 2026 \u2014 portal data, edited in the Data Editor. */\n\n';
  const body = Object.keys(ED.W).map(k=>{
    const cm = ED.comments[k]
      ? ED.comments[k].split('\n').map(l=>'  '+l.trim()).join('\n') + '\n'
      : '';
    const v = JSON.stringify(ED.W[k], null, 2).split('\n').map((l,n)=> n ? '  '+l : l).join('\n');
    return cm + '  ' + JSON.stringify(k) + ': ' + v;
  }).join(',\n\n');
  return head + 'window.TII_DB = {\n' + body + '\n};\n';
}

/* ---------- the model, recomputed from the edited values ---------- */
function edScores(){
  const W = ED.W, sub = {}, pil = {};
  W.domains.forEach(s=>{ sub[s.id] = W.indicators.filter(r=>r.domain===s.id)
    .reduce((a,r)=>a + (Number(r.weight)||0)*(Number(r.score)||0), 0); });
  W.pillars.forEach(p=>{ const ss = W.domains.filter(s=>s.pillar===p.id);
    pil[p.id] = ss.length ? ss.reduce((a,s)=>a+sub[s.id],0)/ss.length : 0; });
  const tii = W.pillars.reduce((a,p)=>a+pil[p.id],0) / (W.pillars.length||1);
  return {sub, pil, tii};
}

/* ---------- field registry: every input is bound to one property ---------- */
function F(key,label,wObj,bObj,prop,type){
  ED.fields.push({key,label,w:wObj,b:bObj,prop,type:type||'text'});
  return ED.fields.length - 1;
}
const inp = (i,v,extra='') =>
  `<input class="edf" data-f="${i}" value="${esc(v==null?'':v)}" ${extra}>`;
const num = (i,v,extra='') =>
  `<input class="edf edn" type="number" data-f="${i}" value="${v==null?'':v}" ${extra}>`;
const area = (i,v,rows=3) =>
  `<textarea class="edf eda" data-f="${i}" rows="${rows}">${esc(v==null?'':v)}</textarea>`;
const lab = (t,hint) => `<label class="edl">${esc(t)}${hint?`<em>${esc(hint)}</em>`:''}</label>`;

function edMark(f){
  const now = f.w[f.prop], was = f.b[f.prop];
  const same = (now==null&&was==null) || String(now)===String(was);
  if(same) ED.changes.delete(f.key);
  else ED.changes.set(f.key, {label:f.label, from:was, to:now});
}

/* ---------- page ---------- */
/* read the file this page was served with, so Download writes a file that keeps the
   header and the section comments even before a repository is connected. Skipped when
   the portal is opened straight from a folder, where fetch cannot read files. */
function edReadLocal(){
  if(ED.readLocal || location.protocol === 'file:') return;
  ED.readLocal = true;
  try{
    fetch('data/database.js').then(r=>r.ok?r.text():null).then(t=>{
      if(!t || ED.prefix) return;
      const p = edParseFile(t);
      ED.prefix = p.prefix; ED.comments = p.comments;
    }).catch(()=>{});
  }catch(e){}
}

function vEditor(){
  if(!ED.W) { edLoadCfg(); edReset(); }
  edReadLocal();
  return pageHead('Trade, Industry & Investment','Data editor',
      'Every number and every piece of text the portal shows is edited here. Check the change list, preview the result, then commit the data file to GitHub; the live site rebuilds itself from that commit.')
    + edConnectCard() + edScoreStrip() + edTabsBar()
    + `<div id="edPane">${edPane()}</div>` + edBar();
}

function edConnectCard(){
  const c = ED.cfg, st = ED.status;
  const open = !(c.owner && c.repo && ED.tok) || st.kind==='error';
  return fig({title:'Repository', sub:'Where the data file lives. Saved in this browser, the token for this tab only',
    body:`<div class="edconn">
      <div class="edstat ed-${st.kind}"><i></i><span id="edStatus">${esc(st.text)}</span></div>
      <details class="edacc" ${open?'open':''}>
        <summary>Connection settings</summary>
        <div class="edgrid4">
          <div>${lab('Owner','user or organisation')}<input class="edf" id="edOwner" value="${esc(c.owner)}" placeholder="national-competitiveness-commission"></div>
          <div>${lab('Repository')}<input class="edf" id="edRepo" value="${esc(c.repo)}" placeholder="competitiveness-portal"></div>
          <div>${lab('Branch')}<input class="edf" id="edBranch" value="${esc(c.branch)}" placeholder="main"></div>
          <div>${lab('File path')}<input class="edf" id="edPath" value="${esc(c.path)}"></div>
        </div>
        <div class="edtok">${lab('Fine-grained access token','Contents: Read and write, this repository only')}
          <input class="edf" id="edTok" type="password" value="${esc(ED.tok)}" placeholder="github_pat_..." autocomplete="off"></div>
        <div class="edrow">
          <button class="btn pri" data-act="connect">Connect And Load</button>
          <button class="btn" data-act="forget">Forget Token</button>
        </div>
      </details>
    </div>`,
    foot:'<b>Note:</b> the token can write to that repository, so it is treated like a password. It is kept in this browser tab only and is cleared when the tab closes or you sign out. Give it an expiry date and do not use the editor on a shared machine.'});
}

function edScoreStrip(){
  const s = edScores(), b = ED.base ? (()=>{ const k=ED.W; ED.W=ED.base; const r=edScores(); ED.W=k; return r; })() : s;
  const d = v => { const x = v; return Math.abs(x)<0.05 ? '' : `<em class="${x>0?'up':'dn'}">${x>0?'+':''}${f1(x)}</em>`; };
  return `<div class="edscores">
    <div class="eds"><small>Composite Index</small><b>${f1(s.tii)}</b>${d(s.tii-b.tii)}</div>
    ${ED.W.pillars.map(p=>`<div class="eds"><small>${esc(p.name.replace(' Competitiveness',''))}</small><b>${f1(s.pil[p.id])}</b>${d(s.pil[p.id]-b.pil[p.id])}</div>`).join('')}
    <div class="eds wide"><small>Unsaved Changes</small><b id="edCount">${ED.changes.size}</b></div>
  </div>`;
}

const ED_TABS = [['ind','Indicators'],['charts','Charts'],['text','Analysis'],['actions','Policy Actions'],
  ['tiles','Headline Tiles'],['nds2','NDS2'],['meta','Report Details'],['diff','Change List']];

function edTabsBar(){
  return `<div class="edtabs">${ED_TABS.map(([k,t])=>
    `<button class="edtab${ED.tab===k?' on':''}" data-tab="${k}">${t}${k==='diff'&&ED.changes.size?` <i>${ED.changes.size}</i>`:''}</button>`).join('')}</div>`;
}

function edPane(){
  ED.fields = [];
  switch(ED.tab){
    case 'ind':     return edIndicators();
    case 'charts':  return edCharts();
    case 'text':    return edText();
    case 'actions': return edActions();
    case 'tiles':   return edTiles();
    case 'nds2':    return edNds2();
    case 'meta':    return edMeta();
    default:        return edDiff();
  }
}

/* ---------- indicators ---------- */
function edIndicators(){
  const W = ED.W, s = edScores();
  const doms = W.domains.map(d=>`<option value="${d.id}"${ED.dom===d.id?' selected':''}>${esc(d.id+' '+d.name)}</option>`).join('');
  const q = ED.q.toLowerCase();
  const rows = W.indicators.map((r,i)=>({r,i}))
    .filter(({r})=> (!ED.dom || r.domain===ED.dom) &&
      (!q || (r.code+' '+r.name+' '+(r.value||'')).toLowerCase().includes(q)));
  const body = rows.map(({r,i})=>{
    const b = ED.base.indicators[i];
    const fv = F('ind.'+r.code+'.value', r.code+' value', r, b, 'value');
    const fs = F('ind.'+r.code+'.score', r.code+' score', r, b, 'score', 'num');
    const fw = F('ind.'+r.code+'.weight', r.code+' weight', r, b, 'weight', 'num');
    const fb = F('ind.'+r.code+'.bands', r.code+' bands', r, b, 'bands');
    const fo = F('ind.'+r.code+'.source', r.code+' source', r, b, 'source');
    const fc = F('ind.'+r.code+'.comparators', r.code+' note', r, b, 'comparators');
    const fn = F('ind.'+r.code+'.name', r.code+' name', r, b, 'name');
    return `<details class="edi"><summary>
        <code>${esc(r.code)}</code><span class="edi-n">${esc(r.name)}</span>
        <span class="edi-v">${esc(r.value==null?'':r.value)}</span>
        <span class="edi-s">${r.score}</span>${chip(stageInd(Number(r.score)||0))}</summary>
      <div class="edi-b">
        <div class="edgrid4">
          <div>${lab('Reported value')}${inp(fv, r.value)}</div>
          <div>${lab('Score','0 to 100')}${num(fs, r.score, 'min="0" max="100" step="1"')}</div>
          <div>${lab('Weight','within the domain')}${num(fw, r.weight, 'step="0.000001"')}</div>
          <div>${lab('Domain')}<input class="edf" value="${esc(r.domain+'  '+(W.domains.find(d=>d.id===r.domain)||{}).name)}" disabled></div>
        </div>
        <div>${lab('Indicator name')}${inp(fn, r.name)}</div>
        <div>${lab('Scoring bands')}${inp(fb, r.bands)}</div>
        <div>${lab('Source')}${inp(fo, r.source)}</div>
        <div>${lab('Note and comparators')}${area(fc, r.comparators, 2)}</div>
      </div></details>`;
  }).join('');
  const subs = (ED.dom? W.domains.filter(d=>d.id===ED.dom) : W.domains)
    .map(d=>`<tr><td>${esc(d.id)} ${esc(d.name)}</td><td class="r">${f1(s.sub[d.id])}</td><td>${chip(stageSub(s.sub[d.id]))}</td></tr>`).join('');
  return fig({title:'Indicators', sub:`${rows.length} of ${W.indicators.length} shown · a change to a score or a weight moves the domain, pillar and index scores`,
    body:`<div class="edfilt">
        <input class="edf" id="edQ" value="${esc(ED.q)}" placeholder="Search code, name or value">
        <select class="edf" id="edDom"><option value="">All domains</option>${doms}</select>
      </div>
      <div class="edlist">${body || '<p class="edempty">No indicator matches that search.</p>'}</div>`,
    foot:'<b>Source:</b> NCC. Domain, pillar and index scores are recalculated from these values, never typed in.'})
    + fig({cls:'mt', title:'Domain scores as edited', sub:'Weighted sum of the indicators in each domain',
      body:`<div class="tw"><table class="t ind"><thead><tr><th>Domain</th><th class="r">Score</th><th>Stage</th></tr></thead><tbody>${subs}</tbody></table></div>`});
}

/* ---------- charts ---------- */
const CHART_COL = {k:'Label', v:'Value', hl:'Highlight Zimbabwe', ph:'Placeholder', d:'Display text',
  c:'Colour', n:'Note', u:'Unit', s:'Score', t:'Title', ink:'Label colour'};
function edCharts(){
  const W = ED.W, keys = Object.keys(W.charts);
  if(!ED.chart || !keys.includes(ED.chart)) ED.chart = keys[0];
  const k = ED.chart, series = W.charts[k], bser = ED.base.charts[k];
  const opts = keys.map(x=>`<option value="${esc(x)}"${x===k?' selected':''}>${esc(x)}</option>`).join('');
  let body;
  const flat = Array.isArray(series) && series.every(r=>r && typeof r==='object' && !Array.isArray(r)
    && Object.values(r).every(v=>v===null||['string','number','boolean'].includes(typeof v)));
  if(flat){
    const cols = [...new Set(series.flatMap(r=>Object.keys(r)))];
    const head = cols.map(c=>`<th>${esc(CHART_COL[c]||c)}</th>`).join('');
    const rows = series.map((r,i)=>`<tr>${cols.map(c=>{
        const bi = (bser && bser[i]) || {};
        const typ = typeof (r[c]!=null?r[c]:bi[c]) === 'number' ? 'num' : 'text';
        const fi = F(`chart.${k}.${i}.${c}`, `${k} row ${i+1} ${c}`, r, bi, c, typ);
        return `<td>${typ==='num'?num(fi,r[c]==null?'':r[c],'step="any"'):inp(fi, r[c])}</td>`;
      }).join('')}<td class="r"><button class="edx" data-del="${i}" title="Remove this row">&times;</button></td></tr>`).join('');
    body = `<div class="tw"><table class="t ind edt"><thead><tr>${head}<th></th></tr></thead><tbody>${rows}</tbody></table></div>
      <div class="edrow"><button class="btn" data-act="addrow">Add Row</button></div>`;
  } else {
    body = `${lab('Series data','this chart has a nested shape, so it is edited as data')}
      <textarea class="edf edjson" id="edJson" rows="16">${esc(JSON.stringify(series,null,2))}</textarea>
      <div class="edrow"><button class="btn pri" data-act="applyjson">Apply</button><span class="edhint" id="edJsonMsg"></span></div>`;
  }
  const ph = Array.isArray(series) && series.some(r=>r && r.ph);
  return fig({title:'Chart series', sub:`${keys.length} series feed the portal’s charts`,
    body:`<div class="edfilt"><select class="edf wide" id="edChart">${opts}</select></div>
      ${ph?'<p class="edwarn">Rows in this series are marked <code>"ph": 1</code>, which draws them faded as placeholders. Remove that column value once the real figure is in.</p>':''}
      ${body}`,
    foot:'<b>Note:</b> <code>k</code> is the label on the axis, <code>v</code> the value, <code>hl</code> marks the Zimbabwe row, <code>ph</code> marks a placeholder.'});
}

/* ---------- analysis and comparisons ---------- */
function edText(){
  const W = ED.W;
  const block = (store,bstore,key,t1,t2,l1,l2) => {
    const o = store[key], b = bstore[key] || {};
    const f1k = F(`${t1}.${key}.a`, `${key} — ${l1}`, o, b, t1);
    const f2k = F(`${t2}.${key}.b`, `${key} — ${l2}`, o, b, t2);
    return `<details class="edi"><summary><span class="edi-n">${esc(key)}</span>
        <span class="edi-v">${edWords(o[t1])+edWords(o[t2])} words</span></summary>
      <div class="edi-b">
        <div>${lab(l1, edWords(o[t1])+' words')}${area(f1k, o[t1], 4)}</div>
        <div>${lab(l2, edWords(o[t2])+' words')}${area(f2k, o[t2], 4)}</div>
      </div></details>`;
  };
  const an = Object.keys(W.analysis).map(k=>block(W.analysis, ED.base.analysis, k, 'finding','whyItMatters','What the chart shows','Why it matters')).join('');
  const cm = Object.keys(W.comparisons).map(k=>block(W.comparisons, ED.base.comparisons, k, 'reading','implication','Reading','Implication')).join('');
  return fig({title:'Chart analysis', sub:`${Object.keys(W.analysis).length} entries, one per chart or card`,
      body:`<div class="edlist">${an}</div>`,
      foot:'<b>Note:</b> this text is drafted analysis and needs NCC sign-off before the portal goes public.'})
    + fig({cls:'mt', title:'Domain comparison analysis', sub:`${Object.keys(W.comparisons).length} pairs on the Compare Two Domains card`,
      body:`<div class="edlist">${cm}</div>`,
      foot:'<b>Note:</b> the card holds five lines for each of the two sections, so keep each entry to roughly 45 to 60 words.'});
}

/* ---------- policy actions ---------- */
function edActions(){
  const W = ED.W;
  return W.actions.map((g,gi)=>{
    const bg = ED.base.actions[gi] || {items:[]};
    const fg = F(`act.${gi}.group`, `Group ${gi+1} name`, g, bg, 'group');
    const items = g.items.map((it,ii)=>{
      const bi = bg.items[ii] || {};
      const ft = F(`act.${gi}.${ii}.title`, `Action ${gi+1}.${ii+1} title`, it, bi, 'title');
      const fx = F(`act.${gi}.${ii}.text`, `Action ${gi+1}.${ii+1} text`, it, bi, 'text');
      const w = edWords(it.text);
      return `<details class="edi"><summary><span class="edi-n">${esc(it.title)}</span>
          <span class="edi-v ${w<30||w>70?'edbad':''}">${w} words</span></summary>
        <div class="edi-b">
          <div>${lab('Title')}${inp(ft, it.title)}</div>
          <div>${lab('Action text', w+' words · the report wording runs 36 to 66')}${area(fx, it.text, 5)}</div>
          <div>${lab('Linked indicators','read only')}<input class="edf" value="${esc((it.indicators||[]).join(', '))}" disabled></div>
        </div></details>`;
    }).join('');
    return fig({cls:gi?'mt':'', title:'Policy group '+(gi+1), sub:`${g.items.length} actions`,
      body:`<div>${lab('Group heading')}${inp(fg, g.group)}</div><div class="edlist">${items}</div>`});
  }).join('');
}

/* ---------- headline tiles, quick facts, key findings ---------- */
function edTiles(){
  const W = ED.W;
  const kp = Object.entries(W.kpis).map(([k,arr])=>{
    const barr = ED.base.kpis[k] || [];
    const rows = arr.map((t,i)=>{
      const b = barr[i] || {};
      const a1 = F(`kpi.${k}.${i}.label`, `${k} tile ${i+1} label`, t, b, 'label');
      const a2 = F(`kpi.${k}.${i}.value`, `${k} tile ${i+1} value`, t, b, 'value');
      const a3 = F(`kpi.${k}.${i}.unit`,  `${k} tile ${i+1} unit`,  t, b, 'unit');
      const a4 = F(`kpi.${k}.${i}.note`,  `${k} tile ${i+1} note`,  t, b, 'note');
      return `<tr><td>${inp(a1,t.label)}</td><td>${inp(a2,t.value)}</td><td>${inp(a3,t.unit)}</td><td>${inp(a4,t.note)}</td></tr>`;
    }).join('');
    return `<details class="edi"><summary><span class="edi-n">${esc(k)}</span><span class="edi-v">${arr.length} tiles</span></summary>
      <div class="edi-b"><div class="tw"><table class="t ind edt"><thead><tr><th>Label</th><th>Value</th><th>Unit</th><th>Note</th></tr></thead><tbody>${rows}</tbody></table></div></div></details>`;
  }).join('');
  const qf = W.quickFacts.map((t,i)=>{
    const b = ED.base.quickFacts[i] || {};
    return `<tr><td>${inp(F(`qf.${i}.label`,`Quick fact ${i+1} label`,t,b,'label'), t.label)}</td>
      <td>${inp(F(`qf.${i}.value`,`Quick fact ${i+1} value`,t,b,'value'), t.value)}</td>
      <td>${inp(F(`qf.${i}.note`,`Quick fact ${i+1} note`,t,b,'note'), t.note)}</td></tr>`;
  }).join('');
  const kf = W.keyFindings.map((t,i)=>{
    const b = ED.base.keyFindings[i] || {};
    const a1 = F(`kf.${i}.title`, `Key finding ${i+1} headline`, t, b, 'title');
    const a2 = F(`kf.${i}.text`,  `Key finding ${i+1} text`,     t, b, 'text');
    return `<details class="edi"><summary><span class="edi-n">${esc(t.title)}</span><span class="edi-v">${edWords(t.text)} words</span></summary>
      <div class="edi-b"><div>${lab('Headline')}${inp(a1,t.title)}</div><div>${lab('Finding')}${area(a2,t.text,4)}</div></div></details>`;
  }).join('');
  return fig({title:'Headline tiles', sub:`${Object.keys(W.kpis).length} tile groups across the pages`, body:`<div class="edlist">${kp}</div>`})
    + fig({cls:'mt', title:'Quick facts', sub:'The eight facts on the Overview page',
      body:`<div class="tw"><table class="t ind edt"><thead><tr><th>Label</th><th>Value</th><th>Note</th></tr></thead><tbody>${qf}</tbody></table></div>`})
    + fig({cls:'mt', title:'Key findings', sub:`${W.keyFindings.length} findings on the Overview page`, body:`<div class="edlist">${kf}</div>`});
}

/* ---------- NDS2 ---------- */
function edNds2(){
  const W = ED.W;
  const rows = W.nds2Indicators.map((r,i)=>{
    const b = ED.base.nds2Indicators[i] || {};
    return `<tr>
      <td><code>${esc(r.code)}</code></td>
      <td>${inp(F(`nds2.${i}.kpi`,`NDS2 ${r.code} KPI`,r,b,'kpi'), r.kpi)}</td>
      <td>${inp(F(`nds2.${i}.frame`,`NDS2 ${r.code} framework area`,r,b,'frame'), r.frame)}</td>
      <td>${inp(F(`nds2.${i}.baseline`,`NDS2 ${r.code} baseline shown`,r,b,'baseline'), r.baseline)}</td>
      <td>${num(F(`nds2.${i}.baselineV`,`NDS2 ${r.code} baseline value`,r,b,'baselineV','num'), r.baselineV, 'step="any"')}</td>
      <td><select class="edf" data-f="${F(`nds2.${i}.dir`,`NDS2 ${r.code} direction`,r,b,'dir')}">
        <option value="up"${r.dir==='up'?' selected':''}>Higher is better</option>
        <option value="down"${r.dir==='down'?' selected':''}>Lower is better</option></select></td></tr>`;
  }).join('');
  return fig({title:'NDS2 indicators', sub:'The six indicators that appear in both the assessment and the NDS2 Results Framework',
    body:`<div class="tw"><table class="t ind edt"><thead><tr><th>Code</th><th>NDS2 KPI</th><th>Framework area</th><th>Baseline shown</th><th>Baseline value</th><th>Direction</th></tr></thead><tbody>${rows}</tbody></table></div>`,
    foot:'<b>Note:</b> the reported value comes from the indicator itself on the Indicators tab. The score is worked out against the 2025 baseline.'});
}

/* ---------- report details ---------- */
function edMeta(){
  const m = ED.W.meta, b = ED.base.meta;
  const one = (p,l,h) => `<div>${lab(l,h)}${inp(F('meta.'+p, l, m, b, p), m[p])}</div>`;
  const ov = (m.overview||[]).map((t,i)=>{
    const arr = m.overview, barr = b.overview||[];
    const i2 = F('meta.overview.'+i, 'Overview paragraph '+(i+1), arr, barr, i);
    return `<div>${lab('Paragraph '+(i+1), edWords(t)+' words')}${area(i2, t, 4)}</div>`;
  }).join('');
  return fig({title:'Report details', sub:'The labels that appear in the header, the footer and the citation',
    body:`<div class="edgrid2">
      ${one('title','Theme title')}${one('edition','Edition')}
      ${one('country','Country')}${one('dataAsOf','Data as of','shown in the header chip')}
      ${one('publisher','Publisher')}${one('source','Source line')}
    </div><div>${lab('Citation')}${area(F('meta.citation','Citation', m, b, 'citation'), m.citation, 2)}</div>`})
    + fig({cls:'mt', title:'Overview text', sub:'The opening paragraphs on the Overview page',
      body:ov, foot:'<b>Note:</b> <code>{tii}</code>, <code>{trade}</code>, <code>{industry}</code> and <code>{investment}</code> are replaced with the live scores, so leave them in place.'});
}

/* ---------- change list ---------- */
function edDiff(){
  if(!ED.changes.size) return fig({title:'Change list', sub:'Nothing edited yet',
    body:'<p class="edempty">Edits you make on the other tabs are listed here, with the value before and after, so you can check them before committing.</p>'});
  const rows = [...ED.changes.entries()].map(([k,c])=>
    `<tr><td>${esc(c.label)}</td><td class="edfrom">${esc(c.from==null?'—':String(c.from).slice(0,160))}</td>
     <td class="edto">${esc(c.to==null?'—':String(c.to).slice(0,160))}</td>
     <td class="r"><button class="edx" data-undo="${esc(k)}" title="Undo this change">&times;</button></td></tr>`).join('');
  return fig({title:'Change list', sub:`${ED.changes.size} field${ED.changes.size===1?'':'s'} edited since the file was loaded`,
    body:`<div class="tw"><table class="t ind edt"><thead><tr><th>Field</th><th>Was</th><th>Now</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>`,
    foot:'<b>Note:</b> nothing reaches the live portal until you commit. Preview shows these edits in this browser tab only.'});
}

/* ---------- the publish bar ---------- */
function edBar(){
  const n = ED.changes.size, drafted = !!window.TII_DRAFT;
  return `<div class="edbar">
    <div class="edbar-n"><b>${n}</b> unsaved change${n===1?'':'s'}</div>
    <input class="edf edmsg" id="edMsg" value="${esc(ED.msg)}" placeholder="Commit message, e.g. Update 2025 export figures">
    <button class="btn" data-act="preview" ${n?'':'disabled'}>Preview In Portal</button>
    ${drafted?'<button class="btn" data-act="discard">Discard Preview</button>':''}
    <button class="btn" data-act="download">Download File</button>
    <button class="btn pri" data-act="commit" ${n?'':'disabled'}>Commit To GitHub</button>
  </div>`;
}

/* ---------- redraw ---------- */
function edRefresh(full){
  const pane = document.getElementById('edPane');
  if(!pane) return;
  if(full){ pane.innerHTML = edPane(); }
  const app = document.querySelector('#page');
  const strip = app && app.querySelector('.edscores');
  if(strip) strip.outerHTML = edScoreStrip();
  const tabs = app && app.querySelector('.edtabs');
  if(tabs) tabs.outerHTML = edTabsBar();
  const bar = app && app.querySelector('.edbar');
  if(bar) bar.outerHTML = edBar();
}
function edStatus(kind,text){
  ED.status = {kind,text};
  const card = document.querySelector('.edstat');
  if(card){ card.className = 'edstat ed-'+kind; card.querySelector('span').textContent = text; }
}

/* ---------- GitHub ---------- */
async function gh(path, opts){
  opts = opts || {};
  const h = {'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'};
  if(ED.tok) h.Authorization = 'Bearer ' + ED.tok;
  if(opts.body) h['Content-Type'] = 'application/json';
  let r;
  try{ r = await fetch('https://api.github.com'+path, Object.assign({}, opts, {headers:h})); }
  catch(e){ throw new Error('Could not reach GitHub. Check the connection and try again.'); }
  const t = await r.text(); let j = null;
  try{ j = JSON.parse(t); }catch(e){}
  if(!r.ok){
    const m = (j && j.message) || ('HTTP ' + r.status);
    if(r.status===401) throw new Error('GitHub rejected the token. Check it has not expired.');
    if(r.status===404) throw new Error('Not found: check the owner, repository, branch and file path, and that the token covers this repository.');
    if(r.status===403) throw new Error('GitHub refused the request: ' + m);
    if(r.status===409 || r.status===422) throw new Error('The file changed on GitHub since it was loaded. Load it again, reapply the edits and commit.');
    throw new Error(m);
  }
  return j;
}
const ghUrl = () => `/repos/${encodeURIComponent(ED.cfg.owner)}/${encodeURIComponent(ED.cfg.repo)}/contents/${ED.cfg.path.split('/').map(encodeURIComponent).join('/')}`;

async function edConnect(){
  const c = ED.cfg;
  if(!c.owner || !c.repo){ edStatus('error','Enter the owner and the repository name.'); return; }
  if(!ED.tok){ edStatus('error','Enter an access token with Contents: Read and write on that repository.'); return; }
  edStatus('busy','Loading the file from GitHub…');
  try{
    const j = await gh(ghUrl()+'?ref='+encodeURIComponent(c.branch));
    const parsed = edParseFile(b64dec(j.content || ''));
    const obj = parsed.obj;
    ED.prefix = parsed.prefix; ED.comments = parsed.comments;
    ED.sha = j.sha;
    ED.W = obj; ED.base = edClone(obj); ED.changes.clear();
    edStatus('ok', `Connected to ${c.owner}/${c.repo} · ${c.branch} · ${c.path}`);
    edRefresh(true);
  }catch(e){ edStatus('error', e.message); }
}

async function edCommit(){
  if(!ED.changes.size) return;
  if(!ED.cfg.owner || !ED.cfg.repo || !ED.tok){ edStatus('error','Set the repository and the token under Connection settings, then Connect And Load.'); return; }
  if(!ED.sha){ edStatus('error','Load the file from GitHub first, so the commit applies to the version that is there now.'); return; }
  const msg = (document.getElementById('edMsg')||{}).value || 'Update portal data';
  edStatus('busy','Committing…');
  try{
    const j = await gh(ghUrl(), {method:'PUT', body:JSON.stringify({
      message: msg, content: b64enc(edFileText()), sha: ED.sha, branch: ED.cfg.branch })});
    ED.sha = j.content.sha;
    ED.base = edClone(ED.W); ED.changes.clear(); ED.msg = '';
    if(window.TII_DRAFT){ try{ sessionStorage.setItem(DRAFT_KEY, JSON.stringify(ED.W)); }catch(e){} edSaveWork(); }
    edStatus('ok','Committed. GitHub Pages rebuilds the live site in about a minute.');
    edRefresh(true);
  }catch(e){ edStatus('error', e.message); }
}

/* ---------- preview, download ---------- */
function edPreview(){
  try{ sessionStorage.setItem(DRAFT_KEY, JSON.stringify(ED.W)); edSaveWork(); }
  catch(e){ edStatus('error','This browser would not hold the preview.'); return; }
  location.hash = '#summary'; location.reload();
}
function edDiscard(){
  edClearDraft();
  location.reload();
}
function edClearDraft(){
  try{ sessionStorage.removeItem(DRAFT_KEY); sessionStorage.removeItem(WORK_KEY); }catch(e){}
}
function edDownload(){
  const blob = new Blob([edFileText()], {type:'text/javascript'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'database.js';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href), 2000);
}

function edRowChange(){
  const k = 'chart.'+ED.chart+'.rows';
  const was = (ED.base.charts[ED.chart]||[]).length, now = (ED.W.charts[ED.chart]||[]).length;
  if(was===now) ED.changes.delete(k);
  else ED.changes.set(k, {label:ED.chart+' row count', from:was, to:now});
}

/* ---------- events, bound once ---------- */
document.addEventListener('input', e=>{
  const el = e.target.closest('[data-f]');
  if(el){
    const f = ED.fields[+el.dataset.f]; if(!f) return;
    let v = el.value;
    if(f.type==='num') v = el.value==='' ? null : Number(el.value);
    f.w[f.prop] = v;
    edMark(f);
    edRefresh(false);
    return;
  }
  if(e.target.id==='edQ'){ ED.q = e.target.value; const p=document.getElementById('edPane');
    if(p){ p.innerHTML = edPane(); const q=document.getElementById('edQ'); if(q){ q.focus(); q.setSelectionRange(q.value.length,q.value.length); } } }
});
document.addEventListener('change', e=>{
  if(e.target.id==='edDom'){ ED.dom = e.target.value; edRefresh(true); }
  if(e.target.id==='edChart'){ ED.chart = e.target.value; edRefresh(true); }
  if(['edOwner','edRepo','edBranch','edPath'].includes(e.target.id)){
    ED.cfg[e.target.id.replace('ed','').toLowerCase()] = e.target.value.trim(); edSaveCfg(); }
  if(e.target.id==='edTok'){ ED.tok = e.target.value.trim(); edSaveCfg(); }
  if(e.target.id==='edMsg'){ ED.msg = e.target.value; }
});
document.addEventListener('click', e=>{
  const tab = e.target.closest('[data-tab]');
  if(tab){ ED.tab = tab.dataset.tab; edRefresh(true); return; }
  const undo = e.target.closest('[data-undo]');
  if(undo){
    const k = undo.dataset.undo, f = null;
    /* find the field by key across the whole working copy */
    const all = edAllFields();
    const hit = all.find(x=>x.key===k);
    if(hit){ hit.w[hit.prop] = hit.b[hit.prop]; ED.changes.delete(k); edRefresh(true); }
    return;
  }
  const del = e.target.closest('[data-del]');
  if(del){ const i = +del.dataset.del; ED.W.charts[ED.chart].splice(i,1);
    edRowChange(); edRefresh(true); return; }
  const act = e.target.closest('[data-act]');
  if(!act) return;
  switch(act.dataset.act){
    case 'connect':  edConnect(); break;
    case 'forget':   ED.tok=''; edSaveCfg(); const t=document.getElementById('edTok'); if(t) t.value=''; edStatus('idle','Token cleared.'); break;
    case 'preview':  edPreview(); break;
    case 'discard':  edDiscard(); break;
    case 'download': edDownload(); break;
    case 'commit':   edCommit(); break;
    case 'addrow': {
      const s = ED.W.charts[ED.chart];
      const shape = s[0] ? Object.fromEntries(Object.keys(s[0]).map(k=>[k, typeof s[0][k]==='number'?0:''])) : {k:'',v:0};
      s.push(shape);
      edRowChange(); edRefresh(true); break; }
    case 'applyjson': {
      const ta = document.getElementById('edJson'), msg = document.getElementById('edJsonMsg');
      try{ ED.W.charts[ED.chart] = JSON.parse(ta.value);
        ED.changes.set('chart.'+ED.chart, {label:ED.chart+' series', from:'(previous)', to:'(edited)'});
        if(msg){ msg.textContent = 'Applied.'; msg.className='edhint ok'; }
        edRefresh(false);
      }catch(err){ if(msg){ msg.textContent = 'Not valid data: '+err.message; msg.className='edhint bad'; } }
      break; }
  }
});

/* rebuild the registry across every tab so an undo can reach a field that is not on screen */
function edAllFields(){
  const keep = {tab:ED.tab, q:ED.q, dom:ED.dom, chart:ED.chart};
  const all = [];
  ED.q=''; ED.dom='';
  ED_TABS.forEach(([k])=>{ if(k==='diff') return; ED.tab=k;
    if(k==='charts'){ Object.keys(ED.W.charts).forEach(c=>{ ED.chart=c; ED.fields=[]; edPane(); all.push(...ED.fields); }); }
    else { ED.fields=[]; edPane(); all.push(...ED.fields); } });
  Object.assign(ED, keep); ED.fields=[];
  return all;
}

/* a plain marker in the header while a preview draft is in force */
(function(){
  if(!window.TII_DRAFT) return;
  const who = document.getElementById('who');
  if(!who || !who.parentNode) return;
  const bar = document.createElement('div');
  bar.className = 'draftbar';
  bar.innerHTML = 'Previewing Unsaved Edits <button type="button" data-act="discard">Discard</button>';
  who.parentNode.insertBefore(bar, who);
})();
