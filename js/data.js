/* Loader: exposes the database (data/database.js) to the scoring model and the pages. Edit data in data/database.js, not here. */
/* A draft saved by the Data Editor takes the place of the file for this tab only, so an
   administrator can see the whole portal with unsaved edits before committing them. */
window.TII_DRAFT = false;
(()=>{ try{ const d = sessionStorage.getItem('tii.draft');
  if(d){ window.TII_DB = JSON.parse(d); window.TII_DRAFT = true; } }catch(e){} })();
const DB = (()=>{
  const d = window.TII_DB;
  return Object.assign({}, d, {
    topics: d.topics.map(t=>({id:t.id, go:t.page, t:t.label, c:t.colour})),
    analysis: Object.fromEntries(Object.entries(d.analysis).map(([k,v])=>[k,[v.finding,v.whyItMatters]])),
    keyFindings: d.keyFindings.map(k=>[k.title,k.text,k.topic]),
    quickFacts: d.quickFacts.map(q=>[q.label,q.value,q.note]),
    actions: d.actions.map((g,i)=>['a'+(i+1), g.group, g.items.map(x=>[x.title,x.text,x.indicators])]),
    kpis: Object.fromEntries(Object.entries(d.kpis).map(([k,v])=>[k,v.map(r=>[r.label,r.value,r.note,r.unit])]))
  });
})();
const IND = DB.indicators.map(o=>[o.domain,o.code,o.name,o.weight,o.value,o.score,o.bands,o.source,o.comparators]);
const PILLARS = DB.pillars;
const SUBS = DB.domains.map(s=>({id:s.id, p:s.pillar, name:s.name, short:s.short||s.name}));
const STAGES = ['Activated','Accelerating','Mobilising','Initiating','Inactive'];
const STAGE_COL = {Activated:'var(--s-act)',Accelerating:'var(--s-acc)',Mobilising:'var(--s-mob)',Initiating:'var(--s-ini)',Inactive:'var(--s-off)'};

/* Status ladders, as implemented in column M of the master sheet */
const stageInd = s => s>=99.999?'Activated':s>=75?'Accelerating':s>=50?'Mobilising':s>=25?'Initiating':'Inactive';
const stageSub = s => s>=85?'Activated':s>=70?'Accelerating':s>=40?'Mobilising':s>=20?'Initiating':'Inactive';
const stagePil = s => s>=85?'Activated':s>=40?'Accelerating':s>=25?'Mobilising':s>=15?'Initiating':'Inactive';

