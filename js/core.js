/* =====================================================================
   MODEL — replicates the workbook arithmetic
   sub-section  = Σ (indicator weight × indicator score)
   pillar       = simple mean of its sub-sections
   TII index    = simple mean of the three pillars
   ===================================================================== */
const state = {overrides:{}};
function compute(useOverrides=true){
  const sc = {};
  IND.forEach(r=>{ sc[r[1]] = (useOverrides && r[1] in state.overrides) ? state.overrides[r[1]] : r[5]; });
  const sub = {};
  SUBS.forEach(s=>{
    const rows = IND.filter(r=>r[0]===s.id);
    sub[s.id] = rows.reduce((a,r)=>a + r[3]*sc[r[1]],0);
  });
  const pil = {};
  PILLARS.forEach(p=>{
    const ss = SUBS.filter(s=>s.p===p.id);
    pil[p.id] = ss.reduce((a,s)=>a+sub[s.id],0)/ss.length;
  });
  const tii = PILLARS.reduce((a,p)=>a+pil[p.id],0)/PILLARS.length;
  const counts = {}; STAGES.forEach(s=>counts[s]=0);
  IND.forEach(r=>counts[stageInd(sc[r[1]])]++);
  return {sc,sub,pil,tii,counts};
}
const BASE = compute(false);
let M = compute();

/* =====================================================================
   HELPERS
   ===================================================================== */
const $ = s=>document.querySelector(s);
const f1 = x=>(Math.round(x*10)/10).toFixed(1);
const esc = s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const subOf = id=>SUBS.find(s=>s.id===id);
const indOf = code=>IND.find(r=>r[1]===code);
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>';
const chip = (stage,lg)=>`<span class="st${lg?' lg':''}"><i style="background:${STAGE_COL[stage]}"></i>${stage}</span>`;
function deltaTag(now,base){
  const d = now-base; if(Math.abs(d)<0.05) return '';
  return `<span class="delta ${d>0?'up':'dn'}">${d>0?'+':''}${f1(d)}</span>`;
}

/* Figure card with chart / table toggle */
let figN = 0;
function fig(o){
  const id = 'fg'+(++figN);
  const hasT = !!o.table;
  const an = (typeof ANALYSIS!=='undefined' && ANALYSIS[o.title]) ? `<button class="an-btn" data-an="${esc(o.title)}" aria-haspopup="dialog" title="Competitiveness analysis" aria-label="Competitiveness analysis"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg><span>Analysis</span></button>` : '';
  const ic={c:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
            t:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10"/></svg>'};
  /* the header carries only Analysis and the Chart/Table toggle, always top right;
     chart-specific switches sit in a control row above the plot */
  const tools = an + (hasT?`<div class="seg ct" data-fig="${id}"><button class="on" data-v="c" title="Chart view" aria-label="Chart view">${ic.c}<span>Chart</span></button><button data-v="t" title="Table view" aria-label="Table view">${ic.t}<span>Table</span></button></div>`:'');
  let tbl = '';
  if(hasT){
    const [cols,rows] = o.table;
    tbl = `<table class="t"><thead><tr>${cols.map((c,i)=>`<th class="${i?'r':''}">${c}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((v,i)=>`<td class="${i?'r':''}">${v}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }
  return `<section class="fig ${o.cls||''}" id="${id}">
    <div class="fig-h"><div class="t"><h3>${tc(o.title)}${o.ph?` <span class="phb" title="Contains placeholder values">${o.ph===2?'Partly illustrative':'Illustrative data'}</span>`:''}</h3>${o.sub?`<div class="sub">${o.sub}</div>`:''}</div><div class="fig-x">${tools}</div></div>
    ${o.tools?`<div class="fig-ctl">${o.tools}</div>`:''}
    <div class="fig-b">${o.body}</div>
    <div class="fig-t">${tbl}</div>
    ${(o.foot||o.ph)?`<div class="fig-f">${o.foot||''}${o.ph?`${o.foot?'<br>':''}<span class="phk"><i></i></span>${o.ph===2?'Faded marks are placeholder values for years or peers not yet sourced; solid marks are reported data.':'All values in this figure are placeholders to preview the layout and workflow — replace when data is supplied.'}`:''}</div>`:''}
  </section>`;
}

/* Horizontal bar chart (HTML). rows: {k, v, d?, hl?}
   o: {min, max, ref:{v,label}, color, ticks:[...], fmt} */
function hbar(rows,o={}){
  const vals = rows.map(r=>r.v);
  const min = o.min ?? Math.min(0,...vals);
  const max = o.max ?? Math.max(...vals, o.ref?o.ref.v:0)*1.08;
  const pos = v=>((v-min)/(max-min))*100;
  const z = pos(0);
  const fmt = o.fmt || (v=>v);
  const ticks = o.ticks || [];
  const tf = o.tfmt || (t=>String(fmt(t)).replace(/\.0(?=\D|$)/,''));
  let h = '';
  if(o.ref) h += `<div class="reflab"><span style="display:inline-block;width:2px;height:11px;border-radius:2px;background:var(--ink)"></span><b>${o.ref.label}</b></div>`;
  h += `<div class="hb${o.dot?' lolli':''}">`;
  rows.forEach(r=>{
    const col = r.hl ? (o.color||'var(--hl)') : (r.c || 'var(--peer)');
    const neg = r.v<0;
    const left = neg ? pos(r.v) : z;
    const w = Math.abs(pos(r.v)-z);
    const tip = `<b>${esc(r.k)}</b><br>${esc(r.d ?? fmt(r.v))}${r.t?'<br>'+esc(r.t):''}${r.ph?'<br><i>Placeholder value</i>':''}`;
    h += `<div class="l${r.hl?' hl':''}${r.ph?' phv':''}" title="${esc(r.k)}">${r.k}</div>
      <div class="tr" data-tip="${esc(tip)}">
        ${ticks.map(t=>`<div class="grid-l" style="left:${pos(t)}%"></div>`).join('')}
        ${min<0?`<div class="zero" style="left:${z}%"></div>`:''}
        <div class="bar${neg?' neg':''}${r.ph?' phm':''}" style="left:${left}%;width:${Math.max(w,0.4)}%;background:${col}"></div>
        ${o.ref?`<div class="ref" style="left:calc(${pos(o.ref.v)}% - 1px)"></div>`:''}
      </div>
      <div class="v${r.hl?' hl':''}${r.ph?' phv':''}">${r.d ?? fmt(r.v)}</div>`;
  });
  if(ticks.length) h += `<div></div><div class="axis">${ticks.map(t=>`<span style="left:${pos(t)}%">${tf(t)}</span>`).join('')}</div><div></div>`;
  return h + '</div>';
}

/* Column chart for short time series */
function cols(rows,o={}){
  const max = o.max ?? Math.max(...rows.map(r=>Math.abs(r.v)))*1.12;
  const fmt = o.fmt||(v=>v);
  const neg = rows.every(r=>r.v<0);
  return `<div class="cols${neg?' down':''}">${rows.map(r=>`<div class="c" data-tip="${esc(`<b>${r.k}</b><br>${r.d??fmt(r.v)}${r.ph?'<br><i>Placeholder value</i>':''}`)}">${neg?'':`<div class="val${r.ph?' phv':''}">${r.d??fmt(r.v)}</div>`}<div class="b${neg?' neg':''}${r.ph?' phm':''}" style="height:${Math.abs(r.v)/max*100}%;background:${r.c||'var(--zim)'}"></div>${neg?`<div class="val${r.ph?' phv':''}" style="margin:4px 0 0">${r.d??fmt(r.v)}</div>`:''}</div>`).join('')}</div>
    <div class="colx">${rows.map(r=>`<span>${r.k}</span>`).join('')}</div>`;
}

/* 100% segmented bar with key */
function sbar(parts,o={}){
  const tot = parts.reduce((a,p)=>a+p.v,0);
  const fmt = o.fmt||(v=>v);
  const sh = p=> o.raw ? p.v : p.v/tot*100;
  return `<div class="sbar">${parts.map(p=>{const pc=sh(p);return `<div class="${p.ph?'phm':''}" style="flex:${p.v};background:${p.c};color:${p.ink||'#fff'}" data-tip="${esc(`<b>${p.k}</b><br>${p.d ? p.d+' · ' : (o.raw?'':fmt(p.v)+' · ')}${f1(pc)}%`)}">${pc>=9?f1(pc)+'%':''}</div>`}).join('')}</div>
  <div class="skey">${parts.map(p=>`<i class="${p.ph?'phm':''}" style="background:${p.c}"></i><span>${p.k}${p.ph?' <span class="phs">placeholder</span>':''}</span><span class="r">${p.d ?? (o.raw?'':fmt(p.v))}</span><span class="m">${o.raw?p.v.toFixed(2).replace(/0$/,''):f1(sh(p))}%</span>`).join('')}</div>`;
}

/* Line chart for time series. Paths scale with the card; points and labels are HTML so text never distorts. */
function line(rows,o={}){
  const fmt=o.fmt||(v=>v), vs=rows.map(r=>r.v), hi=Math.max(...vs), lo=Math.min(...vs), sp=(hi-lo)||Math.abs(hi)||1, n=rows.length;
  const neg=lo<0;
  const min=neg?lo-sp*.30:Math.max(0,lo-sp*.7), max=neg?Math.max(0,hi)+sp*.30:hi+sp*.38;
  const X=i=>n===1?50:(i/(n-1))*100, Y=v=>100-((v-min)/(max-min))*100;
  const base=(min<0&&max>0)?Y(0):100;
  const pts=rows.map((r,i)=>`${X(i).toFixed(2)},${Y(r.v).toFixed(2)}`).join(' ');
  const zero=(min<0&&max>0)?`<div class="ln-0" style="top:${Y(0)}%"><span>0</span></div>`:'';
  return `<div class="lnc"><div class="ln-p">${zero}<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polygon class="ln-a" points="0,${base.toFixed(2)} ${pts} 100,${base.toFixed(2)}"/><polyline class="ln-l" points="${pts}" vector-effect="non-scaling-stroke"/></svg>
    ${rows.map((r,i)=>`<div class="ln-d${r.ph?' ph':''}${i===n-1&&!r.ph?' last':''}" style="left:${X(i)}%;top:${Y(r.v)}%" data-tip="${esc(`<b>${r.k}</b><br>${r.d??fmt(r.v)}${r.ph?'<br><i>Placeholder value</i>':''}`)}"><span class="${r.ph?'phv':''}">${r.d??fmt(r.v)}</span></div>`).join('')}
    ${rows.map((r,i)=>`<em style="left:${X(i)}%">${r.k}</em>`).join('')}</div></div>`;
}
/* Donut for parts of a whole (2–5 parts). */
function donut(parts,o={}){
  const tot=parts.reduce((a,p)=>a+p.v,0), fmt=o.fmt||(v=>v), R=44, C=2*Math.PI*R, gap=parts.length>1?1.6:0;
  const sh=p=>o.raw?p.v:p.v/tot*100;
  let acc=0;
  const act=p=>o.action?` ${o.action}="${esc(p.k)}" class="act"`:'';
  const segs=parts.map(p=>{const len=p.v/tot*C; const s=`<circle class="dn-s${p.ph?' phm':''}${o.action?' act':''}" r="${R}" cx="60" cy="60" fill="none" style="stroke:${p.c}" stroke-width="15" stroke-dasharray="${Math.max(len-gap,.6).toFixed(2)} ${C.toFixed(2)}" stroke-dashoffset="${(-acc).toFixed(2)}"${o.action?` ${o.action}="${esc(p.k)}"`:''} data-tip="${esc(`<b>${p.k}</b><br>${p.d?p.d+' · ':(o.raw?'':fmt(p.v)+' · ')}${f1(sh(p))}%${o.action?'<br><i>Select to list the indicators</i>':''}`)}"/>`; acc+=len; return s;}).join('');
  const top=parts.slice().sort((a,b)=>b.v-a.v)[0];
  return `<div class="dn${o.stack?' stack':''}"><div class="dn-c"><svg viewBox="0 0 120 120" aria-hidden="true">${segs}</svg><div class="dn-m"><b>${o.center??f1(sh(top))+'%'}</b><small>${o.label??top.k.split(/[ (]/).slice(0,2).join(' ')}</small></div></div>
  <div class="skey${o.action?' act':''}">${parts.map(p=>`<i class="${p.ph?'phm':''}" style="background:${p.c}"${act(p)}></i><span${act(p)}>${p.k}</span><span class="r"${act(p)}>${p.d ?? (o.raw?'':fmt(p.v))}</span><span class="m"${act(p)}>${f1(sh(p))}%</span>`).join('')}</div></div>`;
}

/* progress against a target */
function prog(rows){
  return `<div class="pg">${rows.map(r=>{const a=Math.min(1,r.a);return `<div class="l">${r.k}</div><div class="tr" data-tip="${esc(`<b>${r.k}</b><br>Actual ${r.actual} · target ${r.target}<br>Attainment ${Math.round(r.a*100)}%`)}"><span style="width:${a*100}%;background:${a>=1?'var(--s-act)':a>=.6?'var(--zim)':'var(--c2)'}"></span></div><div class="v"><b>${r.actual}</b> / ${r.target}</div>`}).join('')}</div>`;
}

function kpi(k,v,n,unit){ return `<div class="kpi"><div class="k">${tc(k)}</div><div class="v">${v}${unit?`<small>${unit}</small>`:''}</div>${n?`<div class="n">${n}</div>`:''}</div>`; }

function secHead(no,title,subId){
  const sc = subId ? `<div class="score">Domain score <b class="num">${f1(M.sub[subId])}</b>${deltaTag(M.sub[subId],BASE.sub[subId])} &nbsp; ${chip(stageSub(M.sub[subId]))}</div>` : '';
  return `<div class="sec-h" id="s-${(subId||no).replace(/\./g,'-')}"><span class="no">${no}</span><h2>${tc(title)}</h2>${sc}</div>`;
}

/* House style: card, header and button titles capitalise every word.
   Existing capitals are left alone so acronyms (NDS2, FDI, AfCFTA) survive. */
function tc(s){
  return String(s).replace(/[A-Za-z][A-Za-z'\u2019]*/g, w => w.charAt(0).toUpperCase()+w.slice(1));
}

/* NDS2 progress. The 2026 report reads 2025 data, so the comparator is the framework's
   2025 baseline rather than a forward target. Default composite-indicator normalisation
   with min 0 and max the baseline, held within 0-100 and read on the stage ladder:
     higher-is-better   score = actual / baseline x 100
     lower-is-better    score = baseline / actual x 100 */
function nds2Num(s){const m=String(s).match(/-?\$?\s?[\d,]+(?:\.\d+)?/);return m?parseFloat(m[0].replace(/[$,\s]/g,'')):null;}
function nds2Score(o,actual){
  const a=nds2Num(actual), b=o.baselineV;
  if(a===null||!b) return null;
  const raw = o.dir==='down' ? (a<=0?100:b/a*100) : a/b*100;
  return Math.max(0,Math.min(100,raw));
}
function nds2Table(list){
  const rows=list.map(o=>({o, r:IND.find(x=>x[1]===o.code)})).filter(x=>x.r);
  return `<div class="tw"><table class="t ind nds2"><thead><tr><th>Indicator</th><th class="r">Actual</th><th class="r">2025 NDS2 Target</th><th>Score</th><th>Stage</th></tr></thead><tbody>
  ${rows.map(({o,r})=>{const s=nds2Score(o,r[4]), st=stageInd(s);
    const pk=(typeof DB!=='undefined'&&DB.peers)?DB.peers[o.code]:null;
    return `<tr><td><b>${esc(r[2])}</b></td>
      <td class="r">${esc(r[4])}</td><td class="r tgt">${esc(o.baseline)}</td>
      <td class="num"><span class="minibar"><span style="width:${s}%;background:${STAGE_COL[st]}"></span></span>${f1(s)}</td>
      <td class="stg">${chip(st)}${pk?`<button class="pbtn" data-peers="${o.code}">Regional Peers</button>`:''}</td></tr>`}).join('')}
  </tbody></table></div>`;
}

function indTable(filterFn){
  const rows = IND.filter(filterFn);
  return `<div class="tw"><table class="t ind"><thead><tr><th class="hs">Code</th><th>Indicator</th><th class="r">Actual</th><th class="r hs">Weight</th><th>Score</th><th>Stage</th></tr></thead><tbody>
  ${rows.map(r=>{const s=M.sc[r[1]];const st=stageInd(s);const ch=r[1] in state.overrides;
    return `<tr class="click" data-ind="${r[1]}"><td class="code hs">${r[1]}</td><td>${esc(r[2])}${ch?' <span class="pill" style="border-color:#e3c27a;color:#7a5a12">scenario</span>':''}</td><td class="r">${esc(r[4])}</td><td class="r hs">${(r[3]*100).toFixed(1)}%</td><td class="num"><span class="minibar"><span style="width:${s}%;background:${STAGE_COL[st]}"></span></span>${f1(s)}</td><td>${chip(st)}</td></tr>`}).join('')}
  </tbody></table></div>`;
}
function domainIndicators(subId){
  const n = IND.filter(r=>r[0]===subId).length;
  return `<details class="acc mt"><summary><span><b>Indicators in this domain</b> <small>${n} scored · select a row for bands, sources and scenario testing</small></span><i></i></summary><div class="acc-b">${indTable(r=>r[0]===subId)}</div></details>`;
}

/* subsection score strip (Figure 5.1 style) */
function strip(pillarIds){
  const ticks=[0,25,50,75,100];
  let h = '<div class="strip">';
  pillarIds.forEach(pid=>{
    const p = PILLARS.find(x=>x.id===pid);
    if(pillarIds.length>1) h += `<div class="gh">${p.name.replace(' Competitiveness','')} · ${f1(M.pil[pid])}</div>`;
    SUBS.filter(s=>s.p===pid).forEach(s=>{
      const v = M.sub[s.id], st = stageSub(v);
      h += `<div class="sl" data-go="${p.key}" data-anchor="s-${s.id.replace(/\./g,'-')}"><span class="c">${s.id}</span>${s.name}</div>
      <div class="tr" data-tip="${esc(`<b>${s.name}</b><br>Score ${f1(v)} · ${st}<br>Pillar average ${f1(M.pil[pid])}`)}">
        ${ticks.map(t=>`<div class="g" style="left:${t}%"></div>`).join('')}
        <div class="bar" style="width:${v}%;background:${STAGE_COL[st]}"></div>
        <div class="pav" style="left:calc(${M.pil[pid]}% - 1px)"></div>
      </div>
      <div class="sv"><b>${f1(v)}</b>${deltaTag(v,BASE.sub[s.id])}<span style="color:var(--muted);font-size:11.5px">${st}</span></div>`;
    });
  });
  h += `<div></div><div class="ax">${ticks.map(t=>`<span style="left:${t}%">${t}</span>`).join('')}</div><div></div></div>`;
  return h;
}
function stageLegend(){ return `<div class="legend">${STAGES.map(s=>`<span><i style="background:${STAGE_COL[s]}"></i>${s}</span>`).join('')}<span><i class="ln"></i>Pillar average</span></div>`; }

/* Grouped effect bars on a shared zero axis: one group per item, one bar per component.
   o.parts = [{key,label,c}], o.fmt formats values, o.ticks draws the shared scale. */
function effects(rows,o={}){
  const parts=o.parts, fmt=o.fmt||(v=>v);
  const all=rows.flatMap(r=>parts.map(p=>r[p.key]));
  /* o.lo / o.hi pin the scale so a toggled view keeps one comparable axis */
  const lo=o.lo!==undefined?o.lo:Math.min(0,...all), hi=o.hi!==undefined?o.hi:Math.max(0,...all), pad=(hi-lo)*0.04;
  const min=lo-pad, max=hi+pad, X=v=>((v-min)/(max-min))*100, Z=X(0);
  const ticks=o.ticks||[];
  const axis=cls=>ticks.length?`<div class="efx-ax${cls}"><span></span><div>${ticks.map(t=>`<i style="left:${X(t)}%">${fmt(t)}</i>`).join('')}</div><span></span></div>`:'';
  /* o.multi lays the groups out as small multiples once the card is wide enough */
  return `<div class="efx${o.multi?' multi':''}${o.solo?' solo':''}">
    <div class="legend">${parts.map(p=>`<span><i style="background:${p.c}"></i>${p.label} effect</span>`).join('')}</div>
    <div class="efx-gs" style="--n:${rows.length}">
    ${rows.map(r=>`<section class="efx-g">
      <header><b>${r.k}</b><span class="efx-n">${o.netFmt?o.netFmt(r):fmt(r.net)}${r.pc?` <i>${r.pc}</i>`:''}</span></header>
      ${parts.map(p=>{const v=r[p.key], pos=v>=0, l=pos?Z:X(v), w=Math.abs(X(v)-Z);
        return `<div class="efx-b" style="--pc:${p.c}"><span class="efx-l">${p.label}</span>
          <div class="efx-t" data-tip="${esc(`<b>${r.k}</b><br>${p.label} effect ${fmt(v)}`)}">
            ${ticks.map(t=>`<i class="efx-gl" style="left:${X(t)}%"></i>`).join('')}
            <i class="efx-z" style="left:${Z}%"></i>
            <i class="efx-f${pos?'':' neg'}" style="left:${l}%;width:${Math.max(w,0.5)}%;background:${p.c}"></i>
          </div><span class="efx-v${pos?'':' neg'}">${fmt(v)}</span></div>`}).join('')}
      ${axis(' in')}
    </section>`).join('')}
    </div>
    ${axis('')}
  </div>`;
}

/* Absolute stacked bars, one row per period: the parts read against a common scale
   and the total sits at the end of each row. */
function sbars(rows,o={}){
  const parts=o.parts, fmt=o.fmt||(v=>v);
  const tot=r=>parts.reduce((a,p)=>a+(r[p.key]||0),0);
  const max=o.max||Math.max(...rows.map(tot))*1.02;
  return `<div class="sbs">
    <div class="legend">${parts.map(p=>`<span><i style="background:${p.c}"></i>${p.label}</span>`).join('')}</div>
    ${rows.map(r=>`<div class="sb-r"><span class="sb-k">${r.k}</span>
      <div class="sb-t">${parts.map(p=>`<i style="width:${(r[p.key]||0)/max*100}%;background:${p.c};color:${p.ink||'#fff'}" data-tip="${esc(`<b>${r.k} · ${p.label}</b><br>${fmt(r[p.key])}`)}"><b>${fmt(r[p.key])}</b></i>`).join('')}</div>
      <span class="sb-v">${fmt(tot(r))}</span></div>`).join('')}
  </div>`;
}

/* Treemap for a composition that should fill a landscape card.
   Splits the list into two near-equal halves and divides the rectangle along its
   longer side, recursively — blocks stay close to square instead of becoming slivers. */
function treemap(parts,o={}){
  const fmt=o.fmt||(v=>v), tot=parts.reduce((a,p)=>a+p.v,0), out=[];
  const place=(items,x,y,w,h)=>{
    if(items.length===1){ out.push([items[0],x,y,w,h]); return; }
    const sum=items.reduce((a,p)=>a+p.v,0);
    let cut=1, acc=0, best=Infinity;
    for(let i=1;i<items.length;i++){ acc+=items[i-1].v; const d=Math.abs(acc/sum-0.5); if(d<best){best=d;cut=i;} }
    const head=items.slice(0,cut), tail=items.slice(cut);
    const f=head.reduce((a,p)=>a+p.v,0)/sum;
    if(w>=h){ place(head,x,y,w*f,h); place(tail,x+w*f,y,w*(1-f),h); }
    else    { place(head,x,y,w,h*f); place(tail,x,y+h*f,w,h*(1-f)); }
  };
  place(parts.slice().sort((a,b)=>b.v-a.v),0,0,100,100);
  return `<div class="tmap">${out.map(([p,x,y,w,h])=>
    `<div class="tm-c${p.ph?' phm':''}" style="left:${x.toFixed(3)}%;top:${y.toFixed(3)}%;width:${w.toFixed(3)}%;height:${h.toFixed(3)}%;background:${p.c};color:${p.ink||'#fff'}"
       data-tip="${esc(`<b>${p.k}</b><br>${p.d ?? fmt(o.raw?p.v:p.v/tot*100)}`)}">
      <b>${p.k}</b><span>${p.d ?? fmt(o.raw?p.v:p.v/tot*100)}</span></div>`).join('')}</div>`;
}

/* Quadrant plot: four zones around crossing axes, each sized by its share of the total. */
function quadPlot(qs,o={}){
  const tot=qs.reduce((a,q)=>a+q.n,0);
  const cell=q=>{
    const up=/RSCA\s*>\s*0/.test(q.s), right=/CAGR\s*>\s*0/.test(q.s);
    /* headline figures as stat tiles, each with a bar showing its share of the whole */
    const bar=p=>`<i class="qp-bar"><s style="width:${Math.max(p,0.6).toFixed(2)}%"></s></i>`;
    return `<div class="qp-c" style="--qc:${q.c};grid-area:${up?'t':'b'}${right?'r':'l'}">
      <div class="qp-h"><i></i><b>${q.k}</b><span>${q.s}</span></div>
      <div class="qp-s">
        <div data-tip="${esc(`<b>${q.k}</b><br>${q.sh}% of 2025 export earnings · ${q.usd}`)}"><span>Share of earnings</span><b>${q.sh}%</b>${bar(q.sh)}<small>${q.usd} in 2025</small></div>
        <div data-tip="${esc(`<b>${q.k}</b><br>${q.n} of ${tot} classified product lines`)}"><span>Product lines</span><b>${q.n}</b>${bar(q.n/tot*100)}<small>of ${tot} classified</small></div>
      </div>
      <p class="qp-e">${q.e}</p></div>`;
  };
  /* the arrow sits outside the label so the rotated side gutters keep pointing the right way */
  const ax=(cls,dir,name,sign,txt)=>`<div class="qp-ax ${cls}"><i class="qp-arr ${dir}"></i><span><b>${name} ${sign}</b> <em>${txt}</em></span></div>`;
  return `<div class="qp">
    ${ax('y t','up', o.yName||'RSCA','high', o.yHigh||'holds comparative advantage')}
    <div class="qp-row">
      ${ax('x l','left', o.xName||'CAGR','low', o.xLow||'exports contracting')}
      <div class="qp-grid">${qs.map(cell).join('')}</div>
      ${ax('x r','right', o.xName||'CAGR','high', o.xHigh||'exports growing')}
    </div>
    ${ax('y b','down', o.yName||'RSCA','low', o.yLow||'no comparative advantage')}
    <p class="qp-note">${o.note||'Read it as a map: <b>up</b> is stronger revealed comparative advantage (RSCA), <b>right</b> is faster export growth (CAGR, 2021–2025). The best place to be is the top right; the bottom left is where value is thinnest.'}</p>
  </div>`;
}
