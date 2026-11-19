/* =====================================================================
   VIEWS
   ===================================================================== */
const pct = v=>f1(v)+'%';
const days = v=>f1(v)+' d';
const usdm = v=>'$'+Math.round(v).toLocaleString()+' mn';
const usdb = v=>'$'+v.toFixed(2)+' bn';

const CH5_SOURCE = DB.meta.source;

/* ---------- shared UI bits ---------- */
const ICON = {
  spark:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></svg>',
  flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>',
  eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>'
};
const insight = (title,text,cls='',icon='spark')=>`<div class="note ${cls}"><div class="ic">${ICON[icon]}</div><div><b>${title}</b>${text}</div></div>`;
const arrowBtn = (go,cls='')=>`<span class="arrow ${cls}" ${go?`data-go="${go}"`:''} aria-hidden="true">${ARROW}</span>`;
function ring(v,size=86){
  const r=(size-12)/2, c=2*Math.PI*r, a=Math.max(0,Math.min(100,v))/100*c;
  return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="#2f3733" stroke-width="10"/><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--lime)" stroke-width="10" stroke-linecap="round" stroke-dasharray="${a} ${c}" transform="rotate(-90 ${size/2} ${size/2})"/></svg>`;
}
function pageHead(eyebrow,title,text,score,stage,extra=''){
  return `<div class="ph"><div><span class="eyebrow">${tc(eyebrow)}</span><h1>${/<|&/.test(title)?title:tc(title)}</h1>${text?`<p>${text}</p>`:''}</div>
    ${score!=null?`<div class="pscore"><small>Pillar Score</small><b>${score}</b><div style="margin-top:8px">${stage}</div></div>`:extra}</div>`;
}

const TII_NAME = 'Trade, Industry & Investment';

/* ---------- Colour-coded topics: one colour per section, used on jump bars, section headers, tiles and links ---------- */
const TOPICS = DB.topics;
const topicOf = a => TOPICS.find(t=>t.id===a) || TOPICS.find(t=>t.id===a.replace(/[a-c]$/,'')) || TOPICS.find(t=>t.id===a.replace(/[a-c]$/,'a'));
const topicChip = (t,label)=>`<a class="tchip" href="#${t.go}" data-go="${t.go}" data-anchor="${t.id}" style="--sec:${t.c}"><i></i>${tc(label||t.t)}</a>`;
function topicIndex(){
  return PILLARS.map(p=>`<div class="tix"><b>${pShort(p)}</b><div>${TOPICS.filter(t=>t.go===p.key).map(t=>topicChip(t)).join('')}</div></div>`).join('');
}
function sectionize(){
  const page=$('#page'); const heads=[...page.querySelectorAll(':scope > .sec-h')];
  if(!heads.length) return;
  heads.forEach(h=>{
    const sec=document.createElement('section'), t=TOPICS.find(x=>x.id===h.id);
    sec.className='sec'; sec.id=h.id; h.removeAttribute('id'); if(t) sec.style.setProperty('--sec',t.c);
    h.before(sec);
    let n=h; while(n && !(n!==h && n.classList && (n.classList.contains('sec-h')||n.classList.contains('cite')))){ const nx=n.nextSibling; sec.appendChild(n); n=nx; }
  });
  const here=TOPICS.filter(t=>document.getElementById(t.id));
  if(here.length>1){
    const bar=document.createElement('nav'); bar.className='jump'; bar.setAttribute('aria-label','Sections on this page');
    bar.innerHTML=`<span>On This Page</span>${here.map(t=>topicChip(t)).join('')}`;
    page.querySelector('.sec').before(bar);
    const io=new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting) bar.querySelectorAll('.tchip').forEach(c=>c.classList.toggle('on',c.dataset.anchor===en.target.id)); }),{rootMargin:'-15% 0px -75% 0px'});
    here.forEach(t=>io.observe(document.getElementById(t.id)));
  }
}
/* Equal heights only where it costs no empty space: tiles of identical structure, or cards in a row whose natural heights already match. */
function balance(){}
let balT; const rebalance=()=>{clearTimeout(balT);balT=setTimeout(balance,120);};
window.addEventListener('resize',rebalance);
document.addEventListener('toggle',rebalance,true);
if(document.fonts&&document.fonts.ready) document.fonts.ready.then(rebalance);

/* ---------- Competitiveness analysis shown in pop-ups, keyed by chart title ---------- */
const ANALYSIS = DB.analysis;
function openAnalysis(title){
  const t=ANALYSIS[title]; if(!t) return;
  $('#anTag').textContent='Competitiveness Analysis';
  $('#anTitle').textContent=tc(title);
  $('#anBody').innerHTML=t.map((p,i)=>`<p>${i===1?'<b>Why it matters. </b>':''}${p}</p>`).join('');
  $('#anModal').classList.add('open'); $('#anScrim').classList.add('show'); $('#anClose').focus();
}
/* Lists every indicator sitting at one activation stage. */
function openStage(stage){
  const rows=IND.map(r=>({r,s:M.sc[r[1]]})).filter(x=>stageInd(x.s)===stage).sort((a,b)=>b.s-a.s);
  $('#anTag').textContent='Activation Stage';
  $('#anTitle').textContent=tc(stage)+' \u00b7 '+rows.length+' of '+IND.length+' indicators';
  $('#anBody').innerHTML=`<p>Every indicator whose 2026 score places it at the <b>${stage}</b> stage, strongest first. Each row shows the domain it belongs to and its score out of 100.</p>
    <div class="tw"><table class="t ind"><thead><tr><th>Indicator</th><th>Domain</th><th>Score</th></tr></thead><tbody>
    ${rows.map(({r,s})=>`<tr><td>${esc(r[2])}</td><td class="hs">${esc((SUBS.find(x=>x.id===r[0])||{}).name||r[0])}</td><td class="num"><span class="minibar"><span style="width:${s}%;background:${STAGE_COL[stage]}"></span></span>${f1(s)}</td></tr>`).join('')}
    </tbody></table></div>`;
  $('#anModal').classList.add('open'); $('#anScrim').classList.add('show'); $('#anClose').focus();
}
/* Regional peers for one indicator: a ranked chart and a four-line reading,
   both generated from the stored peer values so they never drift apart. */
function openPeers(code){
  const p=(DB.peers||{})[code], r=IND.find(x=>x[1]===code); if(!p||!r) return;
  const up=p.dir!=='down';
  const fmtv=v=>(p.unit==='$'?'$'+v.toLocaleString():f1(v)+p.unit);
  const isRef=x=>/aggregate|average|median/i.test(x.k);
  const srt=a=>a.sort((x,y)=>up?y.v-x.v:x.v-y.v);
  const ref=p.rows.find(isRef);
  /* at most five comparator countries: the group leader plus Zimbabwe's nearest neighbours,
     so the chart keeps both the top of the field and the company Zimbabwe actually keeps */
  let countries=srt(p.rows.filter(x=>!isRef(x)).slice());
  if(countries.length>5){
    const lead=countries[0];
    const near=countries.slice(1).sort((x,y)=>Math.abs(x.v-p.zim)-Math.abs(y.v-p.zim)).slice(0,4);
    countries=srt([lead].concat(near));
  }
  const all=srt(countries.concat(ref?[ref]:[]).concat([{k:'Zimbabwe',v:p.zim,hl:1}]));
  const ranked=srt(countries.concat([{k:'Zimbabwe',v:p.zim,hl:1}]));
  const rank=ranked.findIndex(x=>x.hl)+1, n=ranked.length;
  const best=ranked[0], worst=ranked[n-1];
  const gap=v=>{const g=Math.abs(p.zim-v);return p.unit==='$'?Math.round(g).toLocaleString():f1(g);}, unitWord=p.unit==='%'?' percentage points':p.unit===' days'?' days':p.unit==='$'?' million':'';
  const better=(x,y)=>up?x>y:x<y;
  const lines=[
    `Zimbabwe records ${esc(r[4])} on this measure, which ranks ${ord(rank)} of ${n} in the comparator group.`,
    ref ? `That is ${p.zim>ref.v?'above':'below'} the ${ref.k} of ${fmtv(ref.v)}, a gap of ${gap(ref.v)}${unitWord} ${better(p.zim,ref.v)?"in Zimbabwe's favour":'against Zimbabwe'}.`
        : `The group spans ${fmtv(best.v)} at the top to ${fmtv(worst.v)} at the bottom.`,
    best.hl ? `No comparator in the group performs better.` : `${best.k} leads the group at ${fmtv(best.v)}, ${gap(best.v)}${unitWord} ahead of Zimbabwe.`,
    rank<=Math.ceil(n/3) ? 'Zimbabwe sits in the leading third of the group, so the task here is to hold the position rather than close a gap.'
      : rank<=Math.ceil(2*n/3) ? 'Zimbabwe sits in the middle of the group, close enough to the leaders that the gap is reachable within the plan period.'
      : 'Zimbabwe sits in the trailing third of the group, so this measure needs deliberate attention rather than incremental improvement.'
  ];
  $('#anTag').textContent='Regional Peers';
  $('#anTitle').textContent=tc(r[2]);
  $('#anBody').innerHTML=`<div class="pk-c">${hbar(all.map(x=>({k:x.k,v:Math.abs(x.v),hl:x.hl?1:0,d:fmtv(x.v)})),{fmt:v=>f1(v)})}</div>
    <p class="pk-s"><b>Source:</b> ${esc(String(r[7]||'').trim())}</p>
    <p class="pk-l">${lines.join(' ')}</p>`;
  $('#anModal').classList.add('open'); $('#anScrim').classList.add('show'); $('#anClose').focus();
}
const ord=n=>n+(['th','st','nd','rd'][(n%100-n%10!=10)*(n%10<4)*n%10]||'th');
function closeAnalysis(){ $('#anModal').classList.remove('open'); $('#anScrim').classList.remove('show'); }

/* Replaces {tii}, {trade}, {industry}, {investment} and {domain id} in database text with live scores */
function liveText(t){
  return String(t).replace(/\{([^}]+)\}/g,(m,k)=>{
    if(k==='tii') return f1(M.tii);
    const p=PILLARS.find(x=>x.key===k); if(p) return f1(M.pil[p.id]);
    return (k in M.sub) ? f1(M.sub[k]) : m;
  });
}
/* ---------- Scorecard components ---------- */
const DOMAIN_BANDS=[['Inactive','0–19'],['Initiating','20–39'],['Mobilising','40–69'],['Accelerating','70–84'],['Activated','85–100']];
function bandLegend(){
  return `<div class="bandleg">${DOMAIN_BANDS.map(([s,r])=>`<div><i style="background:${STAGE_COL[s]}"></i><b>${s}</b><span>${r}</span></div>`).join('')}</div>`;
}
const pShort = p => p.name.replace(' Competitiveness','');
function domainTile(s){
  const v=M.sub[s.id], st=stageSub(v), p=PILLARS.find(x=>x.id===s.p);
  return `<div class="dt" data-go="${p.key}" data-anchor="s-${s.id.replace(/\./g,'-')}" data-tip="${esc(`<b>${s.name}</b><br>${IND.filter(r=>r[0]===s.id).length} indicators · open in ${pShort(p)}`)}">
    <div class="dt-n"><i class="tdot" style="background:${(topicOf('s-'+s.id.replace(/\./g,'-'))||{c:'var(--muted)'}).c}"></i>${s.name}</div><div class="dt-v">${f1(v)}${deltaTag(v,BASE.sub[s.id])}</div>
    <div class="minibar"><span style="width:${v}%;background:${STAGE_COL[st]}"></span></div>${chip(st)}</div>`;
}
function scorecard(){
  return PILLARS.map(p=>`<div class="scp"><div class="scp-h" data-go="${p.key}"><small>${p.role}</small><b>${pShort(p)}</b>
      <div class="scp-v">${f1(M.pil[p.id])}</div>${chip(stagePil(M.pil[p.id]))}</div>
    <div class="scp-t" style="--n:${SUBS.filter(s=>s.p===p.id).length}">${SUBS.filter(s=>s.p===p.id).map(domainTile).join('')}</div></div>`).join('');
}
/* ---------- Compare two domains (within one pillar) ---------- */
const cmp={p:null,a:null,b:null};
const cmpDomains = p => SUBS.filter(s=>s.p===p);
const cmpKey = (a,b) => { const o=SUBS.map(s=>s.id); return o.indexOf(a)<o.indexOf(b) ? a+'|'+b : b+'|'+a; };
function cmpWidest(p){
  const ds=cmpDomains(p); let best=[ds[0].id,ds[1].id,-1];
  ds.forEach((x,i)=>ds.slice(i+1).forEach(y=>{const g=Math.abs(M.sub[x.id]-M.sub[y.id]); if(g>best[2]) best=[x.id,y.id,g];}));
  return M.sub[best[0]]>=M.sub[best[1]] ? [best[0],best[1]] : [best[1],best[0]];
}
function cmpSet(p,a,b){ cmp.p=p; if(a&&b){cmp.a=a;cmp.b=b;} else [cmp.a,cmp.b]=cmpWidest(p); }
function cmpSide(id,tag){
  const s=subOf(id), v=M.sub[id], st=stageSub(v);
  const rows=IND.filter(r=>r[0]===id).map(r=>({n:r[2],s:M.sc[r[1]]})).sort((x,y)=>y.s-x.s);
  const act=rows.filter(r=>r.s>=99.999).length, t=topicOf('s-'+id.replace(/\./g,'-'));
  return `<article class="cmp-s"><header><span class="cmp-tag">${tag}</span><b>${s.name}</b></header>
    <div class="cmp-sc"><span class="cmp-v">${f1(v)}</span>${chip(st)}</div>
    <div class="minibar"><span style="width:${v}%;background:${STAGE_COL[st]}"></span></div>
    <dl><div><dt>Indicators Scored</dt><dd>${rows.length}</dd></div><div><dt>Fully Activated</dt><dd>${act} of ${rows.length}</dd></div>
      <div><dt>Strongest Indicator</dt><dd>${esc(rows[0].n)} <i>${f1(rows[0].s)}</i></dd></div><div><dt>Weakest Indicator</dt><dd>${esc(rows[rows.length-1].n)} <i>${f1(rows[rows.length-1].s)}</i></dd></div></dl>
    ${t?`<footer>${topicChip(t,'Open '+t.t)}</footer>`:''}</article>`;
}
function cmpMatrix(){
  const ds=cmpDomains(cmp.p), key=cmp.a+'|'+cmp.b;
  const max=Math.max(...ds.flatMap((x,i)=>ds.slice(i+1).map(y=>Math.abs(M.sub[x.id]-M.sub[y.id]))),1);
  return `<div class="tw cmx-w"><table class="cmx"><thead><tr><th><span class="cmx-k">Gap</span></th>${ds.map(d=>`<th scope="col" class="${d.id===cmp.b?'hb':''}"><span>${d.short}</span></th>`).join('')}</tr></thead><tbody>${ds.map(r=>`<tr><th scope="row" class="${r.id===cmp.a?'ha':''}">${r.short}</th>${ds.map(c=>{
      if(r.id===c.id) return `<td class="dg">${f1(M.sub[r.id])}</td>`;
      const g=Math.abs(M.sub[r.id]-M.sub[c.id]), on=(r.id+'|'+c.id)===key;
      return `<td><button class="${on?'on':''}" data-cmp-pair="${r.id}|${c.id}" style="--g:${(g/max).toFixed(2)}" aria-pressed="${on}" aria-label="Compare ${r.name} with ${c.name}, gap ${f1(g)} points">${f1(g)}</button></td>`;}).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function cmpAnalysis(){
  const A=subOf(cmp.a), B=subOf(cmp.b), va=M.sub[cmp.a], vb=M.sub[cmp.b], gap=Math.abs(va-vb);
  const hi=va>=vb?A:B, lo=va>=vb?B:A, sh=stageSub(Math.max(va,vb)), sl=stageSub(Math.min(va,vb));
  const size=gap>=30?'wide':gap>=15?'clear':gap>=5?'modest':'narrow';
  /* kept tight so the lead wraps to two lines at every domain-name length */
  const lead = `${hi.name} scores ${f1(Math.max(va,vb))} and ${lo.name} ${f1(Math.min(va,vb))}, a ${size} gap of ${f1(gap)} points; the stronger is ${sh}, the weaker ${sl}.`;
  const c=(window.TII_DB.comparisons||{})[cmpKey(cmp.a,cmp.b)];
  return `<header><span class="an-tag">Comparison Analysis</span><h4>${tc(hi.short)} Against ${tc(lo.short)}</h4></header>
    <div class="cmp-grid"><div class="cmp-txt"><p>${lead}</p>${c?`<p>${c.reading}</p>`:''}</div>${c?`<div class="cmp-imp"><p><b>Policy implication. </b>${c.implication}</p></div>`:''}</div>`;
}
function cmpRender(){
  if(!cmp.p) cmpSet('5.1');
  const ds=cmpDomains(cmp.p), gap=Math.abs(M.sub[cmp.a]-M.sub[cmp.b]);
  return `<div class="cmp-ctl">
      <span class="cmp-ctl-l">Select A Pillar</span>
      <div class="seg" role="group" aria-label="Pillar">${PILLARS.map(p=>`<button class="${cmp.p===p.id?'on':''}" data-cmp-p="${p.id}" aria-pressed="${cmp.p===p.id}">${pShort(p)}</button>`).join('')}</div>
    </div>
    <div class="cmp-mx"><header><h4>Gap matrix · ${pShort(PILLARS.find(p=>p.id===cmp.p))}</h4><p>Each cell is the gap in points between two domains, with each domain’s own score on the diagonal. Select a cell to load that pair: the row becomes A, the column becomes B.</p></header>${cmpMatrix()}</div>
    <div class="cmp">${cmpCards()}</div>
    <div class="cmp-an">${cmpAnalysis()}</div>`;
}
function cmpCards(){
  const gap=Math.abs(M.sub[cmp.a]-M.sub[cmp.b]);
  return `${cmpSide(cmp.a,'A')}<div class="cmp-gap"><small>Gap</small><b>${f1(gap)}</b><small>points</small></div>${cmpSide(cmp.b,'B')}`;
}
/* Same pillar: controls and matrix update in place while the cards and analysis cross-fade. New pillar: the whole tool cross-fades. */
let cmpT;
function cmpUpdate(full){
  const w=$('#cmpWrap'); if(!w) return;
  clearTimeout(cmpT);
  if(full || !w.querySelector('.cmp')){
    w.classList.add('sw');
    cmpT=setTimeout(()=>{ w.innerHTML=cmpRender(); void w.offsetWidth; w.classList.remove('sw'); },200);
    return;
  }
  const key=cmp.a+'|'+cmp.b;
  w.querySelectorAll('.cmx button').forEach(b=>{const on=b.dataset.cmpPair===key; b.classList.toggle('on',on); b.setAttribute('aria-pressed',on);});
  const ds=cmpDomains(cmp.p);
  w.querySelectorAll('.cmx thead th').forEach((th,i)=>th.classList.toggle('hb', i>0 && ds[i-1].id===cmp.b));
  w.querySelectorAll('.cmx tbody th').forEach((th,i)=>th.classList.toggle('ha', ds[i].id===cmp.a));
  const c=w.querySelector('.cmp'), an=w.querySelector('.cmp-an');
  c.classList.add('sw'); an.classList.add('sw');
  cmpT=setTimeout(()=>{ c.innerHTML=cmpCards(); an.innerHTML=cmpAnalysis(); void c.offsetWidth; c.classList.remove('sw'); an.classList.remove('sw'); },200);
}
function citeCard(){
  return `<div class="cite mt"><div><b>Data And Citation</b><p>${esc(DB.meta.citation)} Scores are on a 0–100 scale.</p></div>
    <div class="cite-a"><button class="btn pri" data-act="csv">Download Indicator Data</button><a class="btn" href="#method">Read The Methodology</a></div></div>`;
}

/* ---------- Trade, Industry & Investment: profile page ---------- */
function vSummary(){
  const st = stagePil(M.tii);
  const cuts = [0,15,25,40,85,100];
  const bandCols = ['var(--s-off)','var(--s-ini)','var(--s-mob)','var(--s-acc)','var(--s-act)'];
  const scale = `<div class="scale"><div class="bands">${cuts.slice(0,-1).map((c,i)=>`<div style="flex:${cuts[i+1]-c};background:${bandCols[i]}"></div>`).join('')}</div>
    ${Math.abs(M.tii-BASE.tii)>.05?`<div class="mk base" style="left:calc(${BASE.tii}% - 2px)" data-tip="Baseline ${f1(BASE.tii)}"></div>`:''}
    <div class="mk" style="left:calc(${M.tii}% - 2px)"></div>
    <div class="ticks">${cuts.map(c=>`<span style="left:${c}%">${c}</span>`).join('')}</div></div>
    <div class="scale-n">Index ladder: Initiating 15 · Mobilising 25 · Accelerating 40 · Activated 85</div>`;
  const tot = IND.length;
  const sorted = SUBS.slice().sort((a,b)=>M.sub[b.id]-M.sub[a.id]);
  const topP = PILLARS.slice().sort((a,b)=>M.pil[b.id]-M.pil[a.id])[0];
  const hiDom = SUBS.filter(s=>M.sub[s.id]>=70).length;
  const pil = PILLARS.map(p=>{
    const ss = SUBS.filter(s=>s.p===p.id).sort((a,b)=>M.sub[b.id]-M.sub[a.id]);
    const n = IND.filter(r=>r[0].startsWith(p.id)).length;
    return `<div data-go="${p.key}">${arrowBtn(p.key)}<div class="pn">${p.role}</div><div class="pt">${pShort(p)}</div>
      <div class="ps">${f1(M.pil[p.id])}<small> / 100</small>${deltaTag(M.pil[p.id],BASE.pil[p.id])}</div><div>${chip(stagePil(M.pil[p.id]))}</div>
      <div class="pm">${n} indicators · ${ss.length} domains<br>Strongest: ${ss[0].name} (${f1(M.sub[ss[0].id])})<br>Weakest: ${ss[ss.length-1].name} (${f1(M.sub[ss[ss.length-1].id])})</div></div>`;
  }).join('');
  const KF=DB.keyFindings;
  const QF=DB.quickFacts;
  const recal = DB.nds2Indicators;
  return pageHead('Zimbabwe · 2026 edition','<span class="one">Trade, Industry &amp; Investment</span>','A competitiveness chain from market access, through domestic production and value addition, to the capital needed to scale and retain productive capacity.')+
    `<section class="hero2" aria-label="Overall score">
      <div class="h2-score">${ring(M.tii,96)}<div><small>Overall Score · 2026</small>
        <div class="big">${f1(M.tii)}<small> / 100</small>${deltaTag(M.tii,BASE.tii)}</div>${chip(st,true)}</div></div>
      <div class="h2-scale">${scale}</div>
      <div class="h2-stats">
        <div><small>Strongest Pillar</small><b>${pShort(topP)} · ${f1(M.pil[topP.id])}</b></div>
        <div><small>Domains At Accelerating Or Above</small><b>${hiDom} of ${SUBS.length}</b></div>
        <div><small>Indicators Fully Activated</small><b>${M.counts.Activated} of ${tot}</b></div>
      </div>
    </section>
    <section class="ovw mt" aria-label="Overview analysis"><header><span class="an-tag">Overview Analysis</span><h3>What Is Behind The Score</h3></header>
      <p>${(DB.meta.overview||[]).map(liveText).join(' ')}</p></section>
    <div class="pillars mt">${pil}</div>
    ${fig({cls:'mt',title:'Key findings', sub:'Nine results that shape the 2026 score. Each links to the section with the evidence.', body:`<div class="kf">${KF.map((k,i)=>`<div class="kf-i" data-go="${topicOf(k[2]).go}" data-anchor="${k[2]}"><div class="kf-h"><span class="kf-n">${i+1}</span><b>${k[0]}</b></div><p>${k[1]}</p><span class="tchip" style="--sec:${topicOf(k[2]).c}"><i></i>Go to ${topicOf(k[2]).t}</span></div>`).join('')}</div>`})}
    <section class="qfx mt" aria-label="Quick facts"><header><div><h3>Quick Facts</h3><p>Zimbabwe, latest reported values</p></div><small>Sources: ZimStat, TradeMap, RBZ, UNIDO, CZI, World Investment Report</small></header>
      <div class="qfx-g">${QF.map(q=>`<div><span>${q[0]}</span><b>${q[1]}</b><small>${q[2]}</small></div>`).join('')}</div></section>
    ${fig({cls:'mt',title:'Scorecard: three pillars, fourteen domains', sub:'Each tile is one scored domain. Select a tile to open its charts and indicators.',
      body: bandLegend()+scorecard(), foot:`<b>Source:</b> ${CH5_SOURCE}`,
      table:[['Domain','Pillar','Score','Stage'],SUBS.map(s=>[s.name,pShort(PILLARS.find(p=>p.id===s.p)),f1(M.sub[s.id]),stageSub(M.sub[s.id])])]})}
    ${fig({cls:'mt',title:'Explore by topic', sub:'Each topic has its own colour. The same colour marks its section, charts and links throughout the dashboard.', body:topicIndex()})}
    ${fig({cls:'mt',title:'Compare two domains', sub:'Pick a pillar, then select any cell in the gap matrix to compare that pair of domains.', body:`<div id="cmpWrap">${cmpRender()}</div>`})}
    <div class="grid g2 mt">
      ${fig({title:'Activation profile', sub:`${tot} indicators by stage — select a stage to list the indicators it holds`,
        body:donut(STAGES.map(s=>({k:s,v:M.counts[s],c:STAGE_COL[s],d:M.counts[s]+' indicators'})),{stack:1,action:'data-stage',center:M.counts.Activated+M.counts.Accelerating,label:'at 75 or above'}),
        table:[['Stage','Indicators','Share'],STAGES.map(s=>[s,M.counts[s],pct(M.counts[s]/tot*100)])]})}
      ${fig({ph:2,title:'Score over editions',sub:'2026 is scored; later editions show a placeholder path',body:line([{k:'2026',v:M.tii,d:f1(M.tii)}].concat(DB.charts.score_over_editions),{fmt:f1,max:80})})}
    </div>
    ${fig({cls:'mt', title:'Indicators on NDS2 2025 baselines', sub:`The ${recal.length} indicators in this assessment that also carry a Key Performance Indicator in the NDS2 Results Framework 2026–30. This report reads 2025 data, so each is scored against the framework's 2025 baseline rather than a forward target`, body:nds2Table(recal), foot:'<b>Source:</b> NDS2 National and Sector Results Frameworks 2026–30; NCC assessment.'})}
    ${citeCard()}`;
}

/* ---------- 5.1 Trade ---------- */
function vTrade(){
  const P='5.1';
  const cagr = DB.charts.export_growth_peers;
  const inten = DB.charts.export_intensity_peers;
  const conc = DB.charts.export_concentration;
  Object.values(conc).forEach(c=>{c.fmt=v=>c.dec?v.toFixed(c.dec):Math.round(v);});
  const pv = DB.charts.price_volume_effects;
  const pvMin=-200, pvMax=2200, pp=v=>(v-pvMin)/(pvMax-pvMin)*100;
  /* one product at a time, on a scale fixed across all three so the toggle compares like with like */
  const pvAll = pv.flatMap(r=>[r.vol,r.p]);
  window._pv = {rows:pv, o:{parts:[{key:'vol',label:'Volume',c:'var(--c1)'},{key:'p',label:'Price',c:'var(--c2)'}],
    fmt:v=>(v<0?'−$':'$')+Math.abs(v).toLocaleString(undefined,{maximumFractionDigits:0})+' mn',
    netFmt:r=>'Net +$'+Math.round(r.net).toLocaleString()+' mn',
    ticks:[0,500,1000,1500], lo:Math.min(0,...pvAll), hi:Math.max(0,...pvAll), solo:1}};
  const pvTabs = `<div class="seg" data-switch="pv">${pv.map((r,i)=>`<button class="${i?'':'on'}" data-v="${i}">${r.tab||r.k.split(/[ (-]/)[0]}</button>`).join('')}</div>`;
  const pvBody = `<div id="pvBody">${effects([pv[0]],_pv.o)}</div>`;
  const quads = DB.charts.export_portfolio_quadrants;
  const quadBody = quadPlot(quads);

  const tbal = DB.charts.trade_balance_peers;
  const cust = DB.charts.border_clearance_times;
  window._cust=cust; window._conc=conc;
  const sla = DB.charts.ntb_sla_compliance;
  const ntbd = DB.charts.ntb_resolution_days;

  return pageHead('Pillar · Outward market gate','Trade','Fast, largely digitised border processes and strong standards capacity provide a solid platform, constrained by a narrow export base, unused preferential access and limited shock resilience.',f1(M.pil[P])+deltaTag(M.pil[P],BASE.pil[P]),chip(stagePil(M.pil[P])))+`
    ${fig({num:'Figure 5.2', title:'Trade domain scores', body:stageLegend()+strip([P]), foot:`<b>Source:</b> ${CH5_SOURCE} The 34-point gap between Trade Facilitation and Export Performance is the analytical starting point.`,
      table:[['Domain','Score','Stage'],SUBS.filter(s=>s.p===P).map(s=>[s.name,f1(M.sub[s.id]),stageSub(M.sub[s.id])])]})}

    ${secHead('5.1.1','Export Performance and Concentration','5.1.1')}
    <p class="lede">Exports grew quickly since 2021 and surged in 2025, but a small number of commodities account for most of the increase.</p>
    <div class="grid g4">${DB.kpis.export_value_2025.map(k=>kpi(...k)).join('')}</div>
    <div class="grid g2 mt">
      ${fig({num:'Figure 5.3a', title:'Export growth vs peers', sub:'Per cent per year', body:hbar(cagr,{dot:1,fmt:pct,ticks:[0,10,20,30],max:36,min:-5}), foot:'<b>Source:</b> UNIDO trade database; NCC calculations from ZimStat/TradeMap data.',table:[['Economy','CAGR %'],cagr.map(r=>[r.k,f1(r.v)])]})}
      ${fig({num:'Figure 5.3b', title:'Export intensity', sub:'Zimbabwe 2025; peers 2024', body:hbar(inten,{fmt:pct,ticks:[0,15,30,45],max:50}), foot:'<b>Source:</b> UNIDO trade database; NCC calculations. Zimbabwe ranks 2nd on growth but 4th on intensity.',table:[['Economy','% of GDP'],inten.map(r=>[r.k,f1(r.v)])]})}
    </div>
    <div class="grid g2 mt">
      ${fig({num:'Table 5.1', title:'What drove export growth', sub:'Share of the 2024–2025 increase', body:donut(DB.charts.what_drove_export_growth,{fmt:v=>'+$'+v.toFixed(3)+' bn',label:'from gold'}), foot:'<b>Source:</b> NCC calculations from TradeMap and ZimStat data. Gold alone added $2.085 bn of the $2.250 bn increase.'})}
      ${fig({num:'Figure 5.4', title:'Price vs volume effects', sub:'Share of the 2024–2025 change from shipping more, and from higher prices', tools:pvTabs, body:pvBody, foot:'<b>Source:</b> NCC calculations from TradeMap and ZimStat HS6 data (2026). Gold was price-led (price effect 56.2% vs volume 26.5%); nickel and lithium grew on volume against falling prices.',
        table:[['Product','Volume $mn','Price $mn','Net $mn'],pv.map(r=>[r.k,r.vol,r.p,r.net])]})}
    </div>
    <div class="grid g3 mt">
      ${['hhi','theil','rsca'].map(k=>fig({title:{hhi:'Product concentration (HHI)',theil:'Earnings inequality (Theil)',rsca:'Competitive product lines'}[k], sub:conc[k].lab+(k==='rsca'?' · more is broader':' · higher is more exposed'), body:hbar(conc[k].rows,{fmt:conc[k].fmt,max:conc[k].max,ticks:conc[k].ticks}), table:[['Economy','Value'],conc[k].rows.map(r=>[r.k,conc[k].fmt(r.v)])]})).join('')}
    </div>
    <div class="fig-f" style="padding:10px 6px 0"><b>Source:</b> TradeMap HS6; UNIDO; UNCTAD; NCC calculations. 74.95% of measured concentration comes from revenue inequality among active lines.</div>
    ${fig({cls:'mt',num:'Figure 5.6', title:'Export portfolio matrix', sub:'581 classified products placed by comparative advantage (RSCA) and export growth (CAGR); the bar in each figure shows its share of the whole', body:quadBody, foot:'<b>Source:</b> NCC calculations based on ZimStat/TradeMap HS6 data (2021–2025). 22 lines unclassified (zero CAGR or first exported in 2025).',
        table:[['Quadrant','Products','% earnings','2025 earnings'],quads.map(q=>[q.k,q.n,q.sh,q.usd])]})}
    ${domainIndicators('5.1.1')}

    ${secHead('5.1.2','Trade Balance and Resilience','5.1.2')}
    <div class="grid g3">${DB.kpis.goods_trade_balance_2025.map(k=>kpi(...k)).join('')}</div>
    <div class="grid g-21 mt">
      ${fig({num:'Figure 5.7a', title:'Trade balance vs peers', sub:'Stability range −5% to 0%', body:hbar(tbal,{fmt:v=>(v>0?'+':'')+f1(v)+'%',min:-30,max:5,ticks:[-30,-20,-10,0]}), foot:'<b>Source:</b> UNIDO Trade Database; NCC calculations.',table:[['Economy','% of GDP'],tbal.map(r=>[r.k,f1(r.v)])]})}
      ${fig({num:'Figure 5.7b', title:'Trade balance trend', sub:'US$ million, deficit against a zero balance', body:line(DB.charts.trade_balance_trend,{fmt:v=>'−$'+Math.abs(v).toLocaleString()}), ph:2, foot:'<b>Source:</b> UNIDO; NCC calculations. Improvement coincides with the gold-led export surge.'})}
    </div>
    ${domainIndicators('5.1.2')}

    ${secHead('5.1.3','Trade Facilitation and Paperless Trade','5.1.3')}
    <div class="grid g3">
      ${[['exp','Export customs release',10,[0,2.5,5,7.5,10]],['imp','Import customs release',10,[0,2.5,5,7.5,10]],['lic','Import licence',20,[0,5,10,15,20]]].map(([k,t,mx,tk])=>{
        const inAxis = cust[k].ref<=mx;   /* a benchmark beyond the axis is stated, not drawn off the end */
        return fig({title:t, sub:'Days, lower is faster',
          body:hbar(cust[k].rows,Object.assign({fmt:days,max:mx,ticks:tk}, k==='lic'?{}:{tfmt:t=>String(t)}, inAxis?{ref:{v:cust[k].ref,label:`SSA median ${cust[k].ref} days`}}:{})),
          foot:inAxis?'':`<b>Note:</b> the SSA median of ${cust[k].ref} days sits beyond the ${mx}-day axis.`,
          table:[['Economy','Days'],cust[k].rows.map(r=>[r.k,r.v])]})}).join('')}
    </div>
    <div class="fig-f" style="padding:10px 6px 0"><b>Source:</b> World Bank Enterprise Survey (2025).</div>
    ${fig({cls:'mt',num:'Figure 5.9', title:'Digital border readiness', sub:'Status of the twelve trade facilitation indicators', body:indTable(r=>r[0]==='5.1.3'), foot:'<b>Source:</b> NCC compilation; ZIMRA; PAPSS; RBZ; UN Trade Facilitation Survey 2025. Exporters retain 70% of FX earnings against a 100% SADC benchmark; 53.6% of manufacturers rely on imported inputs.'})}

    ${secHead('5.1.4','Market Access and Preferences','5.1.4')}
    <div class="grid g4">${DB.kpis.afcfta_preference_utilisation.map(k=>kpi(...k)).join('')}</div>
    <div class="grid g2 mt">
      ${fig({num:'Figure 5.10', title:'NTB resolution compliance', sub:'2021–2025, per cent of cases', body:hbar(sla,{fmt:pct,max:80,ticks:[0,20,40,60,80]}), foot:'<b>Source:</b> NCC compilation from TradeBarriers.org (2026). Small case counts — read as indicative.',table:[['Economy','% on time'],sla.map(r=>[r.k,f1(r.v)])]})}
      ${fig({num:'Figure 5.11', title:'NTB resolution time', sub:'Days, 2021–2025', body:hbar(ntbd,{dot:1,fmt:v=>Math.round(v).toLocaleString()+' d',ref:{v:60,label:'60-day SLA target'},max:1100,ticks:[0,250,500,750,1000]}), foot:'<b>Source:</b> NCC compilation from TradeBarriers.org (2026). Inbound complaints take 616.8 days longer than outbound grievances.',table:[['Economy','Days'],ntbd.map(r=>[r.k,r.v])]})}
    </div>
    ${domainIndicators('5.1.4')}

    ${secHead('5.1.5','Standards and SPS Compliance','5.1.5')}
    <div class="grid g4">${DB.kpis.sadcas_accredited_laboratories.map(k=>kpi(...k)).join('')}</div>
    <div class="grid g2 mt">
      ${fig({num:'Figure 5.12',title:'Accredited testing laboratories',sub:'Number of SADCAS-accredited laboratories',body:hbar(DB.charts.accredited_testing_laboratories,{fmt:v=>v,max:110,ticks:[0,50,100,150,200]}),foot:'<b>Source:</b> SADCAS Register (2026).'})}
      ${fig({ph:2,title:'Harmonised standards',sub:'Number of national standards',body:hbar(DB.charts.harmonised_standards,{fmt:v=>v.toLocaleString(),max:8500,ticks:[0,2000,4000,6000,8000]}),foot:'<b>Source:</b> SAZ / SADC Secretariat.'})}
    </div>
    ${domainIndicators('5.1.5')}`;
}

/* ---------- 5.2 Industry ---------- */
function vIndustry(){
  const P='5.2';
  const mvapc = DB.charts.mva_per_capita_peers;
  const mvash = DB.charts.mva_share_gdp_peers;
  const cu = DB.charts.capacity_utilisation_peers;
  const mgmt = DB.charts.management_practices_peers;
  const xq = DB.charts.export_quality_peers;
  const mht = DB.charts.technology_intensity_peers;
  const elec = DB.charts.grid_connection_days_peers;
  const ret = DB.charts.local_value_retention_peers;
  return pageHead('Pillar · Domestic production engine','Industry','Manufacturing scale and management capability are strengths; low technology intensity, shallow agro-industrial chains, unreliable power and limited external finance restrict upgrading.',f1(M.pil[P])+deltaTag(M.pil[P],BASE.pil[P]),chip(stagePil(M.pil[P])))+`
    ${fig({num:'Figure 5.13', title:'Industry domain scores', body:stageLegend()+strip([P]), foot:`<b>Source:</b> ${CH5_SOURCE}`,table:[['Domain','Score','Stage'],SUBS.filter(s=>s.p===P).map(s=>[s.name,f1(M.sub[s.id]),stageSub(M.sub[s.id])])]})}

    ${secHead('5.2.1','Manufacturing Capability and Technology','5.2.1')}
    <div class="grid g4">${DB.kpis.manufacturing_output_growth.map(k=>kpi(...k)).join('')}</div>
    <div class="grid g3 mt">
      ${fig({num:'Figure 5.14a', title:'Manufacturing value added per person', sub:'Constant 2020 US$', body:hbar(mvapc,{fmt:v=>'$'+v,max:330,ticks:[0,100,200,300]}), foot:'<b>Source:</b> UNIDO INDSTAT 2025.',table:[['Economy','US$'],mvapc.map(r=>[r.k,r.v])]})}
      ${fig({num:'Figure 5.14b', title:'Manufacturing share of GDP', sub:'Per cent · Zimbabwe down from 12.9% in 2021', body:hbar(mvash,{fmt:pct,ref:{v:15,label:'2030 NDS2 terminal goal 15.0%'},max:17,ticks:[0,5,10,15]}), foot:'<b>Source:</b> UNIDO INDSTAT 2025. Matches the 2026 NDS2 target of 11.5%.',table:[['Economy','%'],mvash.map(r=>[r.k,r.v])]})}
      ${fig({num:'Capacity', title:'Capacity utilisation vs peers', sub:'Per cent of installed capacity', body:hbar(cu,{fmt:pct,ref:{v:75,label:'2030 terminal goal 75%'},max:85,ticks:[0,25,50,75]}), foot:'<b>Source:</b> CZI Annual Manufacturing Survey. Nearly two-fifths of capacity idle.',table:[['Economy','%'],cu.map(r=>[r.k,r.v])]})}
    </div>
    <div class="grid g3 mt">
      ${fig({num:'Figure 5.15a', title:'Management practices', sub:'Medium and large firms', body:hbar(mgmt,{dot:1,fmt:f1,max:70,ticks:[0,20,40,60]}), foot:'<b>Source:</b> World Bank Enterprise Survey 2025.',table:[['Economy','Index'],mgmt.map(r=>[r.k,r.v])]})}
      ${fig({num:'Figure 5.15b', title:'Export quality', sub:'MXQual score', body:hbar(xq,{fmt:v=>v.toFixed(3),ref:{v:.45,label:'Policy baseline 0.45'},max:.5,ticks:[0,.1,.2,.3,.4],tfmt:v=>v.toFixed(1)}), foot:'<b>Source:</b> UNIDO CIP (2024).',table:[['Economy','Index'],xq.map(r=>[r.k,r.v])]})}
      ${fig({num:'Figure 5.15c', title:'Technology intensity', sub:'Per cent', body:hbar(mht,{dot:1,fmt:pct,max:21,ticks:[0,5,10,15,20]}), foot:'<b>Source:</b> UNIDO CIP (2024). The technology gap.',table:[['Economy','%'],mht.map(r=>[r.k,r.v])]})}
    </div>
    <div class="grid g2 mt">
      ${fig({title:'Manufacturing share trend',sub:'Manufacturing value added, per cent of GDP, 2021–2025',body:line(DB.charts.manufacturing_share_trend,{fmt:pct,max:16}),foot:'<b>Source:</b> UNIDO INDSTAT 2025.'})}
      ${fig({ph:2,title:'Capacity utilisation trend',sub:'Per cent of installed capacity',body:line(DB.charts.capacity_utilisation_trend,{fmt:pct,max:80}),foot:'<b>Source:</b> CZI Annual Manufacturing Survey.'})}
    </div>
    ${domainIndicators('5.2.1')}

    ${secHead('va','Value addition and agro-processing','5.2.2a')}
    <p class="lede">Value-added exports are 29.2% of total exports — above the NDS2 annual target of 7.5% but below the comparator average of 44.4%. Economic Complexity rank: 108th.</p>
    <div class="grid g2">
      ${fig({num:'Figure 5.16', title:'Agro-processing gap', sub:'Attainment of benchmark', body:prog(DB.charts.agro_processing_gap), foot:'<b>Source:</b> ZimStat/TradeMap; NCC calculations. Raw leaf tobacco exports $1.30 bn vs $205.8 mn processed agricultural exports.'})}
      ${fig({num:'Figure 5.17', title:'Food import bill', sub:'US$ 1.89 billion', body:donut(DB.charts.food_import_bill,{fmt:v=>'$'+v.toFixed(2)+' bn',label:'basic staples'}), foot:'<b>Source:</b> TradeMap/ZimStat HS6 (2026). Food import share 18.7% vs 15% vulnerability ceiling.'})}
    </div>
    ${fig({cls:'mt',title:'Food imports by product',sub:'US$ million, 2025 \u00b7 total bill US$1.89 bn',body:hbar(DB.charts.food_imports_by_product,{fmt:usdm,max:700,ticks:[0,200,400,600]}),foot:'<b>Source:</b> TradeMap; ZimStat (2025). Maize alone is 23.7% of the food import bill.',table:[['Product','US$ mn'],DB.charts.food_imports_by_product.map(r=>[r.k,r.v])]})}
    ${domainIndicators('5.2.2a')}

    ${secHead('gold','Gold: earnings and output')}
    <p class="lede">Gold is the largest export earner. Earnings grew much faster than output, so the 2025 surge was mostly price-led.</p>
    <div class="grid g4">${DB.kpis.gold_export_earnings_2025.map(k=>kpi(...k)).join('')}</div>
    <div class="grid g2 mt">
      ${fig({num:'Figure 5.18a',title:'Gold export earnings',sub:'US$ billion \u00b7 2026 NDS2 target US$5.0 bn',body:line(DB.charts.gold_export_earnings,{fmt:v=>'$'+v.toFixed(2),max:5.2}),foot:'<b>Source:</b> TradeMap HS 710812/710813; FGR; MMCZ. 2024 is semi-manufactured gold (HS 710813).'})}
      ${fig({num:'Figure 5.18b',title:'Gold output',sub:'Tonnes delivered \u00b7 2026 target 55 t',body:cols(DB.charts.gold_output,{fmt:v=>v.toFixed(1)+' t',max:58}),foot:'<b>Source:</b> Fidelity Gold Refinery; MMCZ. Shown separately from earnings — no shared axis.'})}
    </div>
    ${fig({cls:'mt',num:'Figure 5.18c',title:'Gold output by producer type',sub:'Tonnes delivered to Fidelity Gold Refinery, split between artisanal and large-scale producers',
      body:sbars(DB.charts.gold_output_by_producer,{parts:[{key:'asm',label:'Artisanal & small-scale',c:'var(--c1)'},{key:'lsp',label:'Large-scale producers',c:'var(--s-mob)',ink:'#141414'}],
        fmt:v=>f1(v)+' t', max:48}),
      foot:'<b>Source:</b> Fidelity Gold Refinery; MMCZ (2025). Artisanal and small-scale output rose from 16.5 t in 2021 to 34.9 t in 2025, while large-scale output stayed close to 12 t throughout.',
      table:[['Year','Artisanal t','Large-scale t','Total t'],DB.charts.gold_output_by_producer.map(r=>[r.k,r.asm,r.lsp,r.net])]})}

    ${secHead('mb','Mineral beneficiation: lithium, PGMs and chrome','5.2.2b')}
    <div class="grid g2">
      ${fig({title:'Lithium revenue by processing stage', sub:'Unit value rises from $352 to $1,317 per tonne after processing', body:donut(DB.charts.lithium_revenue_by_processing_stage,{raw:1,center:'12.6%',label:'processed'}), foot:'<b>Source:</b> MMCZ; TradeMap; NCC. 65,000 t of lithium sulphate processed at 4 facilities; share is above the 12.5% Phase-1 milestone.'})}
      ${fig({num:'Figure 5.19a', title:'PGM revenue by processing stage', sub:'Only 2.9% of earnings leave as refined platinum', body:donut(DB.charts.pgm_revenue_by_processing_stage,{raw:1}), foot:'<b>Source:</b> TradeMap; MMCZ; RBZ; NCC. With no operational Precious Metals Refinery, smelted matte goes to South Africa for final refining.'})}
    </div>
    <div class="grid g2 mt">
      ${fig({num:'Figure 5.19b', title:'Chrome revenue by processing stage', sub:'Cumulative 2021–2025; ferro-chromium leads', body:donut(DB.charts.chrome_revenue_by_processing_stage,{raw:1}), foot:'<b>Source:</b> TradeMap; MMCZ; NCC. Local smelting share reached 69% in 2025 — the strongest value retention of the three minerals.'})}
      ${fig({num:'Retention', title:'Local value retention', sub:'Per cent', body:hbar(ret,{fmt:v=>'~'+v+'%',tfmt:v=>v+'%',max:75,ticks:[0,25,50,75]}), foot:'Beneficiation Alignment Index 0.28x — see Investment › allocation.',table:[['Economy','%'],ret.map(r=>[r.k,r.v])]})}
    </div>
    ${domainIndicators('5.2.2b')}

    ${secHead('5.2.3','Enterprise Environment and Innovation','5.2.3')}
    <div class="grid g3">${DB.kpis.firms_affected_by_outages.map(k=>kpi(...k)).join('')}</div>
    <div class="grid g2 mt">
      ${fig({num:'Figure 5.20', title:'Grid connection time', body:hbar(elec,{fmt:days,max:34,ticks:[0,10,20,30]}), foot:'<b>Source:</b> World Bank Enterprise Survey (2025).',table:[['Economy','Days'],elec.map(r=>[r.k,r.v])]})}
      ${fig({title:'Power outage frequency',sub:'Outages per month, formal firms',body:hbar(DB.charts.power_outage_frequency,{fmt:v=>v.toFixed(1),max:23,ticks:[0,5,10,15,20]}),foot:'<b>Source:</b> World Bank Enterprise Survey (2025).'})}
    </div>
    ${domainIndicators('5.2.3')}`;
}

/* ---------- 5.3 Investment ---------- */
function vInvestment(){
  const P='5.3';
  const fdi = DB.charts.fdi_inflows_peers;
  Object.values(fdi).forEach(c=>{c.o.fmt=c.o.unit==='pct'?pct:(v=>'$'+Math.round(v).toLocaleString());});
  window._fdi=fdi;
  const cpermit = DB.charts.permit_licence_times;
  window._cp=cpermit;
  const funnel = DB.charts.investor_journey;
  const prov = DB.charts.licences_by_province;
  return pageHead('Pillar · Capital enabler','Investment','Does Zimbabwe attract productive capital, convert approvals into operating assets, allocate it to value-adding sectors and places, and retain it once it arrives?',f1(M.pil[P])+deltaTag(M.pil[P],BASE.pil[P]),chip(stagePil(M.pil[P])))+`
    ${fig({num:'Figure 5.21', title:'Investment domain scores', body:stageLegend()+strip([P]), foot:`<b>Source:</b> ${CH5_SOURCE}`,table:[['Domain','Score','Stage'],SUBS.filter(s=>s.p===P).map(s=>[s.name,f1(M.sub[s.id]),stageSub(M.sub[s.id])])]})}

    ${secHead('5.3.1','Investment Inflows and Conversion','5.3.1a')}
    <div class="grid g4">${DB.kpis.net_fdi_inflows.map(k=>kpi(...k)).join('')}</div>
    <div class="grid g2 mt">
      ${fig({num:'Figure 5.22', title:'FDI inflows vs peers', sub:'<span id="fdiLab">Net FDI inflows, US$ million</span>', tools:`<div class="seg" data-switch="fdi"><button class="on" data-v="usd">US$</button><button data-v="gdp">% GDP</button></div>`,
        body:`<div id="fdiBody">${hbar(fdi.usd.rows,fdi.usd.o)}</div>`, foot:'<b>Source:</b> World Investment Report 2025; ZIDA Quarterly Reports 2025.'})}
      ${fig({num:'Figure 5.23', title:'From licence to realised capital', sub:'US$ million · pipeline domain scores '+f1(M.sub['5.3.1b']), body:hbar(DB.charts.from_licence_to_realised_capital,{max:3500,fmt:v=>'$'+v,ticks:[0,1000,2000,3000]}), foot:'<b>Source:</b> World Investment Report (2025); ZIDA. Gross realised value derived as 29.6% × $3.26 bn.'})}
    </div>
    ${fig({cls:'mt',title:'Capital against activation thresholds',sub:'Realised value as a share of each benchmark',body:prog(DB.charts.capital_against_activation_thresholds)})}
    ${secHead('ret','Repatriation and retention','5.3.1c')}
    <div class="grid g4">${DB.kpis.repatriation_wait_time.map(k=>kpi(...k)).join('')}</div></div>
    ${fig({cls:'mt',ph:2,title:'Repatriation wait time',sub:'Days · SADC benchmark under 30',body:line(DB.charts.repatriation_wait_time,{fmt:v=>v+' d',max:200}),foot:'<b>Source:</b> RBZ; ZIDA.'})}
    ${domainIndicators('5.3.1c')}

    ${secHead('5.3.2','Investment Facilitation and Licensing','5.3.2')}
    <div class="grid g2">
      ${[['con','Construction permit'],['op','Operating licence']].map(([k,t])=>fig({title:t+' time', sub:'Days, lower is faster', body:hbar(cpermit[k].rows,{fmt:days,ref:{v:cpermit[k].ref,label:`SSA median ${cpermit[k].ref} days`},max:34,ticks:[0,10,20,30]}), foot:'<b>Source:</b> World Bank Enterprise Survey (2025).', table:[['Economy','Days'],cpermit[k].rows.map(r=>[r.k,r.v])]})).join('')}
    </div>
    <div class="grid g2 mt">${DB.kpis.investment_licences.map(k=>kpi(...k)).join('')}</div>
    <div class="grid g2 mt">
      ${fig({num:'Trend', title:'Construction permit trend', sub:'Days', body:line(DB.charts.construction_permit_trend,{fmt:v=>f1(v)+' d'}),foot:'<b>Source:</b> World Bank Enterprise Survey.'})}
      ${fig({ph:2,title:'Investment licences issued',sub:'ZIDA registry, count',body:cols(DB.charts.investment_licences_issued,{fmt:v=>v,max:900}),foot:'<b>Source:</b> ZIDA registry. * 2025 derived as 2024 × 1.208 (IF-02 licence growth).'})}
    </div>
    ${fig({cls:'mt',num:'Table 5.2', title:'Investor journey: licence to exit', sub:'Attainment = actual ÷ benchmark, capped at 100%', body:prog(funnel), foot:'<b>Source:</b> ZIDA IGRM register and Quarterly Reports; RBZ. Performance weakens once investors move from licensing to operation.',
      table:[['Stage','Actual','Target','Attainment'],funnel.map(r=>[r.k,r.actual,r.target,Math.round(r.a*100)+'%'])]})}
    ${domainIndicators('5.3.2')}

    ${secHead('5.3.3','Sectoral and Spatial Allocation','5.3.3a')}
    <div class="grid g4">${DB.kpis.beneficiation_alignment_index.map(k=>kpi(...k)).join('')}</div>
    ${fig({cls:'mt',num:'Figure 5.25a', title:'Investment by sector', sub:'Share of approved investment value — each block is sized by its share', body:treemap(DB.charts.investment_by_sector,{fmt:v=>f1(v)+'%'}), foot:'<b>Source:</b> ZIDA Quarterly Reports.', table:[['Sector','% of approved value'],DB.charts.investment_by_sector.map(r=>[r.k,f1(r.v)])]})}
    <div class="grid g2 mt">
      ${fig({num:'Figure 5.25b', title:'Licences by province', sub:'Number of licences', body:hbar(prov,{dot:1,fmt:v=>v,max:280,ticks:[0,100,200]}), foot:'<b>Source:</b> ZIDA Quarterly Reports. Harare holds 62% of approved FDI capital.',table:[['Province','Licences'],prov.map(r=>[r.k,r.v])]})}
      ${fig({ph:1,title:'Investment by source country',sub:'Share of approved value, top origins of the 24 active countries',body:hbar(DB.charts.investment_by_source_country,{fmt:v=>v+'%',max:50,ticks:[0,10,20,30,40,50]}),foot:'Origin HHI 3,800 and 24 active countries are reported; the country split is a placeholder.'})}
    </div>
    ${domainIndicators('5.3.3a')}`;
}

/* ---------- Indicator explorer ---------- */
const exp = {q:'',p:'',s:'',st:''};
function vIndicators(){
  return pageHead('Trade, Industry & Investment','Indicator explorer',`All ${IND.length} indicators in the Trade, Industry &amp; Investment framework. Select a row for performance bands, source, regional comparators and scenario testing.`)+`
    <div class="filters">
      <input id="fq" placeholder="Search code, indicator or source" value="${esc(exp.q)}">
      <select id="fp"><option value="">All pillars</option>${PILLARS.map(p=>`<option value="${p.id}" ${exp.p===p.id?'selected':''}>${p.id} ${p.name}</option>`).join('')}</select>
      <select id="fs"><option value="">All domains</option>${SUBS.map(s=>`<option value="${s.id}" ${exp.s===s.id?'selected':''}>${s.id} ${s.name}</option>`).join('')}</select>
      <select id="fst"><option value="">All stages</option>${STAGES.map(s=>`<option ${exp.st===s?'selected':''}>${s}</option>`).join('')}</select>
      <span class="cnt" id="fcnt"></span>
    </div>
    <div class="card" style="overflow-x:auto" id="itab"></div>`;
}
function drawIndTable(){
  const q = exp.q.toLowerCase();
  const fn = r => (!exp.p || r[0].startsWith(exp.p)) && (!exp.s || r[0]===exp.s) && (!exp.st || stageInd(M.sc[r[1]])===exp.st)
    && (!q || (r[1]+' '+r[2]+' '+r[7]).toLowerCase().includes(q));
  const n = IND.filter(fn).length;
  $('#itab').innerHTML = `<div style="padding:4px 12px">${indTable(fn)}</div>`;
  $('#fcnt').textContent = `${n} of ${IND.length} indicators`;
}

/* ---------- Recommendations ---------- */
const RECS = DB.actions;
function vRecs(){
  let i=0;
  return pageHead('Trade, Industry & Investment','Policy actions','Eighteen actions drawn from the 2026 assessment, grouped by the competitiveness problem each one addresses.')+`
    ${RECS.map(([no,title,items])=>`${secHead(no,title)}<div class="card pad" style="padding-top:2px;padding-bottom:2px">${items.map(([h,p,codes])=>`<div class="rec"><div class="i">${++i}</div><div><h4>${tc(h)}</h4><p>${p}</p></div></div>`).join('')}</div>`).join('')}`;
}

/* ---------- Methodology ---------- */
function vMethod(){
  return pageHead('Trade, Industry & Investment','Methodology',`How indicator results are scored, combined into pillars and summarised in the Trade, Industry &amp; Investment Index.`)+`
    <div class="grid g2">
      <div class="card pad"><h3 style="margin:0 0 10px;font-size:13.5px">Aggregation</h3>
        <table class="t"><tbody>
        <tr><td style="width:150px">Indicator score</td><td>Scored 0–100 against published performance bands</td></tr>
        <tr><td>Domain score</td><td>Weighted sum of its indicator scores</td></tr>
        <tr><td>Pillar score</td><td>Simple mean of its domains</td></tr>
        <tr><td>TII Index</td><td>Simple mean of the three pillars</td></tr></tbody></table></div>
      <div class="card pad"><h3 style="margin:0 0 10px;font-size:13.5px">Activation stage ladders</h3>
        <table class="t"><thead><tr><th>Stage</th><th class="r">Indicator</th><th class="r">Domain</th><th class="r">Pillar / index</th></tr></thead><tbody>
        ${[['Activated',100,85,85],['Accelerating',75,70,40],['Mobilising',50,40,25],['Initiating',25,20,15],['Inactive','&lt;25','&lt;20','&lt;15']].map(r=>`<tr><td>${chip(r[0])}</td><td class="r">${r[1]}</td><td class="r">${r[2]}</td><td class="r">${r[3]}</td></tr>`).join('')}
        </tbody></table></div>
    </div>
`;
}

/* =====================================================================
   ROUTER + NAV
   ===================================================================== */
const ROUTES = {
  summary:{t:'Overview',v:vSummary}, trade:{t:'Trade',v:vTrade}, industry:{t:'Industry',v:vIndustry}, investment:{t:'Investment',v:vInvestment},
  indicators:{t:'Indicator explorer',v:vIndicators}, recs:{t:'Policy actions',v:vRecs}, method:{t:'Methodology',v:vMethod}
};
function nav(cur){
  const I={
    grid:'<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>',
    pulse:'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    ship:'<path d="M3 17l2 4h14l2-4M5 17V9h14v8M9 9V5h6v4"/>',
    fac:'<path d="M2 21h20M4 21V10l6 4V10l6 4V4h4v17"/>',
    coin:'<circle cx="12" cy="12" r="9"/><path d="M15 9.5a3 2.5 0 0 0-3-1.5c-1.7 0-3 .9-3 2s1.3 2 3 2 3 .9 3 2-1.3 2-3 2a3 2.5 0 0 1-3-1.5M12 6.5v1.5M12 16v1.5"/>',
    list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/>',
    pen:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'};
  const svg=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${I[k]}</svg>`;
  const a=(k,label,ic,extra='',cls='')=>`<a href="#${k}" class="${cls}${cur===k?' on':''}" ${cur===k?'aria-current="page"':''}><span class="ni">${ic}</span><span class="nl">${tc(label)}</span>${extra}</a>`;
  /* pillar rows double as a miniature scorecard: score chip plus a stage-coloured bar */
  const pil=(k,label,ic,id)=>{
    const v=M.pil[id], st=stagePil(v);
    return a(k,label,ic,`<span class="nsc">${f1(v)}</span><span class="nb" title="${st}"><i style="width:${v}%;background:${STAGE_COL[st]}"></i></span>`,'np');
  };
  const ok = k => !!ROUTES[k];
  const grp = (h,links)=> links.filter(Boolean).length ? `<h6>${h}</h6>${links.filter(Boolean).join('')}` : '';
  $('#nav').innerHTML = `${grp('Index',[ok('summary')&&a('summary','Overview',svg('pulse'))])}
    ${grp('Pillars',[ok('trade')&&pil('trade','Trade',svg('ship'),'5.1'),ok('industry')&&pil('industry','Industry',svg('fac'),'5.2'),ok('investment')&&pil('investment','Investment',svg('coin'),'5.3')])}
    ${grp('Data &amp; Methods',[ok('indicators')&&a('indicators','Indicator explorer',svg('list')),ok('recs')&&a('recs','Policy actions',svg('star')),ok('method')&&a('method','Methodology',svg('book')),ok('admin')&&a('admin','Administration',svg('grid')),ok('editor')&&a('editor','Data Editor',svg('pen'))])}
    <div class="sleg"><small>Activation stages</small>
      <div class="sleg-r">${STAGES.slice().reverse().map(s=>`<i style="background:${STAGE_COL[s]}" title="${s}"></i>`).join('')}</div>
      <div class="sleg-x"><span>Inactive</span><span>Activated</span></div></div>`;

  const st=stagePil(M.tii);
  $('#sideIdx').innerHTML = `<a href="#summary" class="sx-l">
      <small>Composite index · 2026</small>
      <div class="sx-v"><b>${f1(M.tii)}</b><em>/ 100</em>${deltaTag(M.tii,BASE.tii)}</div>
      <div class="sx-tr"><i style="width:${M.tii}%;background:${STAGE_COL[st]}"></i></div>
      <div class="sx-f"><span class="st"><i style="background:${STAGE_COL[st]}"></i>${st}</span><span>95 indicators</span></div>
    </a>`;
}
function route(){
  const req = (location.hash.replace(/^#\/?/,'')||'summary').split('?')[0];
  if(!ROUTES[req]){ if(location.hash && location.hash !== '#summary'){ location.hash = '#summary'; return; } }
  const k = ROUTES[req] ? req : 'summary';
  const r = ROUTES[k];
  $('#crumbs').innerHTML = k==='summary' ? '<b>Overview</b>' : `<a href="#summary">Overview</a> › <b>${r.t}</b>`;
  document.title = (k==='summary'?'':r.t+' · ')+'Trade, Industry & Investment Competitiveness · Zimbabwe 2026';
  nav(k);
  figN = 0;
  $('#page').innerHTML = r.v();
  if(k==='indicators') drawIndTable();
  sectionize(); a11y(); balance(); rebalance(); thinAxes();
}

/* Axis labels are positioned by value, so how many fit depends on the track width,
   not the card width. Measure after layout and hide any label that would collide,
   always keeping the first and the last. */
function thinAxes(){
  document.querySelectorAll('.hb .axis').forEach(ax=>{
    const sp=[...ax.children];
    sp.forEach(s=>s.style.display='');
    if(sp.length<3) return;
    const last=sp[sp.length-1];
    let prev=sp[0].getBoundingClientRect();
    for(let i=1;i<sp.length-1;i++){
      const r=sp[i].getBoundingClientRect();
      if(r.left < prev.right+8 || last.getBoundingClientRect().left < r.right+8) sp[i].style.display='none';
      else prev=r;
    }
  });
}
let axT; addEventListener('resize',()=>{clearTimeout(axT);axT=setTimeout(thinAxes,120);});
function a11y(){
  document.querySelectorAll('#page [data-go]:not(.arrow):not(button):not(a)').forEach(el=>{el.setAttribute('role','link');el.tabIndex=0;});
  document.querySelectorAll('#page tr[data-ind]').forEach(el=>{el.setAttribute('role','button');el.tabIndex=0;});
}
function rerender(keepScroll=true){ const y=window.scrollY; M=compute(); route(); if(keepScroll) window.scrollTo(0,y); scenBar(); }

/* =====================================================================
   DRAWER + SCENARIO
   ===================================================================== */
function openInd(code){
  const r = indOf(code); if(!r) return;
  const sub = subOf(r[0]);
  const base = r[5], cur = M.sc[code];
  $('#dCode').textContent = `${r[1]} · ${sub?sub.name:''}`;
  $('#dTitle').textContent = r[2];
  const comp = esc(r[8]).replace(/ \| /g,'<br>');
  $('#dBody').innerHTML = `<div class="dstats"><div><small>Actual value</small><b>${esc(r[4])}</b></div><div><small>Score</small><b>${f1(cur)}</b></div><div><small>Stage</small><div style="margin-top:8px">${chip(stageInd(cur))}</div></div></div>
    <dl><dt>Performance bands</dt><dd>${esc(r[6].split(' | ')[0].split(' (')[0]).replace(/; /g,'<br>')}</dd>
      <dt>Weight in domain</dt><dd>${(r[3]*100).toFixed(2)}%</dd>
      <dt>Source</dt><dd>${esc(r[7])}</dd>
      <dt>Comparators</dt><dd>${comp||'—'}${(DB.peers||{})[code]?`<br><button class="pbtn" data-peers="${code}">Regional Peers</button>`:''}</dd></dl>
    <div class="sim"><h4>Scenario test</h4><p>Change this indicator's score to see the effect on its domain, pillar and the TII Index. Scenario values are for exploration only.</p>
      <div class="row"><input type="range" min="0" max="100" step="1" value="${Math.round(cur)}" id="simR" aria-label="Scenario score"><span class="out" id="simO">${Math.round(cur)}</span></div>
      <div class="eff" id="simE"></div>
      <div style="display:flex;gap:8px;margin-top:10px"><button class="btn pri" id="simApply">Apply Scenario</button><button class="btn" id="simClear" ${code in state.overrides?'':'disabled'}>Restore Baseline (${f1(base)})</button></div></div>`;
  const eff = v=>{
    const tmp = {...state.overrides,[code]:v}; const save=state.overrides; state.overrides=tmp; const X=compute(); state.overrides=save;
    const p = r[0].slice(0,3);
    $('#simE').innerHTML = `${sub?sub.name:'Domain'}: <b>${f1(BASE.sub[r[0]])}</b> → <b>${f1(X.sub[r[0]])}</b><br>${PILLARS.find(x=>x.id===p).name.replace(' Competitiveness','')}: <b>${f1(BASE.pil[p])}</b> → <b>${f1(X.pil[p])}</b><br>TII Index: <b>${f1(BASE.tii)}</b> → <b>${f1(X.tii)}</b> (${stagePil(X.tii)})`;
  };
  eff(Math.round(cur));
  $('#simR').oninput = e=>{ $('#simO').textContent=e.target.value; eff(+e.target.value); };
  $('#simApply').onclick = ()=>{ const v=+$('#simR').value; if(Math.abs(v-base)<0.5) delete state.overrides[code]; else state.overrides[code]=v; closeDrawer(); rerender(); };
  $('#simClear').onclick = ()=>{ delete state.overrides[code]; closeDrawer(); rerender(); };
  $('#drawer').classList.add('open'); $('#scrim').classList.add('show');
}
function closeDrawer(){ $('#drawer').classList.remove('open'); $('#scrim').classList.remove('show'); }
function scenBar(){
  const n = Object.keys(state.overrides).length;
  $('#scen').classList.toggle('show', n>0);
  if(n) $('#scenTxt').innerHTML = `${n} indicator${n>1?'s':''} changed (${Object.keys(state.overrides).join(', ')}). TII Index ${f1(BASE.tii)} → <b>${f1(M.tii)}</b>.`;
}

/* =====================================================================
   EVENTS
   ===================================================================== */
const SWITCH = {
  conc:v=>{const c=_conc[v];$('#concLab').textContent=c.lab;$('#concBody').innerHTML=hbar(c.rows,{fmt:c.fmt,max:c.max,ticks:c.ticks});},
  cust:v=>{const c=_cust[v];$('#custLab').textContent=c.lab;$('#custBody').innerHTML=hbar(c.rows,{fmt:days,ref:{v:c.ref,label:`SSA median ${c.ref} days`},max:20,ticks:[0,5,10,15,20]});},
  fdi:v=>{const c=_fdi[v];$('#fdiLab').textContent=c.lab;$('#fdiBody').innerHTML=hbar(c.rows,c.o);},
  pv:v=>{$('#pvBody').innerHTML=effects([_pv.rows[+v]],_pv.o);},
  cp:v=>{const c=_cp[v];$('#cpLab').textContent=c.lab;$('#cpBody').innerHTML=hbar(c.rows,{fmt:days,ref:{v:c.ref,label:`SSA median ${c.ref} days`},max:34,ticks:[0,10,20,30]});}
};
function zcrScroll(){
  const a = window.zcrAnchor; window.zcrAnchor = null;
  const el = a && (document.getElementById(a) || document.getElementById(a.replace(/[a-c]$/,'')) || document.getElementById(a.replace(/[a-c]$/,'a')));
  window.scrollTo({top: el ? el.getBoundingClientRect().top + window.scrollY - 72 : 0, behavior:'smooth'});
  if(el){ el.classList.remove('hit'); void el.offsetWidth; el.classList.add('hit'); }
}
function closeNav(){ document.querySelector('.side').classList.remove('open'); $('#navScrim').classList.remove('show'); $('#menuBtn').setAttribute('aria-expanded','false'); }
document.addEventListener('click',e=>{
  if(e.target.closest('#menuBtn')){ const o=document.querySelector('.side').classList.toggle('open'); $('#navScrim').classList.toggle('show',o); $('#menuBtn').setAttribute('aria-expanded',o); return; }
  if(e.target.closest('#navScrim') || e.target.closest('.nav a')) closeNav();
  if(e.target.closest('[data-act="csv"]')){ $('#csvBtn').click(); return; }
  const cp=e.target.closest('[data-cmp-p]'); if(cp){ if(cp.dataset.cmpP!==cmp.p){ cmpSet(cp.dataset.cmpP); cmpUpdate(true); } return; }
  const cc=e.target.closest('[data-cmp-pair]'); if(cc){ const [x,y]=cc.dataset.cmpPair.split('|'); if(x===cmp.a&&y===cmp.b) return; cmp.a=x; cmp.b=y; cmpUpdate(); return; }
  const anB=e.target.closest('[data-an]'); if(anB){ openAnalysis(anB.dataset.an); return; }
  const stB=e.target.closest('[data-stage]'); if(stB){ openStage(stB.getAttribute('data-stage')); return; }
  const pkB=e.target.closest('[data-peers]'); if(pkB){ e.preventDefault(); e.stopPropagation(); openPeers(pkB.getAttribute('data-peers')); return; }
  if(e.target.closest('#anClose,#anScrim')){ closeAnalysis(); return; }
  const segBtn = e.target.closest('.seg button');
  if(segBtn){
    const seg = segBtn.parentElement;
    seg.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b===segBtn));
    if(seg.dataset.fig) document.getElementById(seg.dataset.fig).classList.toggle('tbl', segBtn.dataset.v==='t');
    if(seg.dataset.switch) SWITCH[seg.dataset.switch](segBtn.dataset.v);
    rebalance();
    return;
  }
  const ind = e.target.closest('[data-ind]');
  if(ind){ e.preventDefault(); openInd(ind.dataset.ind); return; }
  const go = e.target.closest('[data-go]');
  if(go){
    if(go.dataset.act) return;
    window.zcrAnchor = go.dataset.anchor || null;
    const same = location.hash.replace(/^#\/?/,'') === go.dataset.go;
    if(same){ zcrScroll(); } else location.hash = '#'+go.dataset.go;
  }
});
document.addEventListener('keydown',e=>{
  if((e.key==='Enter'||e.key===' ') && e.target.matches('[role="link"],[role="button"]')){ e.preventDefault(); e.target.click(); }
  if(e.key==='Escape'){ closeNav(); closeAnalysis(); }
});
document.addEventListener('input',e=>{
  if(['fq','fp','fs','fst'].includes(e.target.id)){
    exp.q=$('#fq').value; exp.p=$('#fp').value; exp.s=$('#fs').value; exp.st=$('#fst').value; drawIndTable(); a11y(); rebalance();
  }
});
$('#dClose').onclick = closeDrawer; $('#scrim').onclick = closeDrawer;
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeDrawer(); });
$('#scenReset').onclick = ()=>{ state.overrides={}; rerender(); };
$('#csvBtn').onclick = ()=>{
  const head=['Domain','Code','Indicator','Weight','Actual','Baseline score','Scenario score','Stage','Performance bands','Source'];
  const q=v=>'"'+String(v).replace(/"/g,'""')+'"';
  const lines=[head.map(q).join(',')].concat(IND.map(r=>[r[0],r[1],r[2],r[3],r[4],r[5],M.sc[r[1]],stageInd(M.sc[r[1]]),r[6].split(' | ')[0],r[7]].map(q).join(',')));
  const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/csv'})); a.download='ZCR2026_TII_indicators.csv'; a.click();
};
/* tooltip */
const tip = $('#tip');
document.addEventListener('mousemove',e=>{
  const t = e.target.closest('[data-tip]');
  if(!t){ tip.style.display='none'; return; }
  tip.innerHTML = t.dataset.tip; tip.style.display='block';
  const w = tip.offsetWidth, h = tip.offsetHeight;
  let x = e.clientX+14, y = e.clientY+14;
  if(x+w>innerWidth-8) x = e.clientX-w-14;
  if(y+h>innerHeight-8) y = e.clientY-h-14;
  tip.style.left=x+'px'; tip.style.top=y+'px';
});
$('#asOf').textContent = 'Data as of '+DB.meta.dataAsOf;
window.addEventListener('hashchange',()=>(window.zcrNavigate||route)());
route();
