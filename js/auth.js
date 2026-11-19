/* =====================================================================
   DEMONSTRATION SIGN-IN
   ---------------------------------------------------------------------
   This gate exists to show how the dashboard behaves for different kinds
   of user. It is NOT security. The dashboard is a static site, so these
   accounts live in this file and anyone who opens it can read them. Put
   nothing behind this gate that is not already safe to publish; a real
   restricted version needs a server (see the hosting guide).
   ===================================================================== */
const ROLES = {
  admin: {
    pw:'admin2026', label:'Administrator', who:'Competitiveness Development Department',
    routes:['summary','trade','industry','investment','indicators','recs','method','admin','editor'],
    sim:true, csv:true,
    can:['Every page, including Administration','Scenario testing','Indicator data download','Account and edition settings']
  },
  staff: {
    pw:'staff2026', label:'NCC Staff', who:'National Competitiveness Commission',
    routes:['summary','trade','industry','investment','indicators','recs','method'],
    sim:true, csv:true,
    can:['Every analytical page','Scenario testing','Indicator data download']
  },
  institution: {
    pw:'inst2026', label:'Partner Institution', who:'Ministry, agency or development partner',
    routes:['summary','trade','industry','investment','indicators','recs','method'],
    sim:false, csv:false,
    can:['Every analytical page','Read-only indicator explorer','No scenario testing or data download']
  },
  student: {
    pw:'student2026', label:'Student or Public', who:'Open access account',
    routes:['summary','trade','industry','investment','method'],
    sim:false, csv:false,
    can:['Overview and the three pillar pages','Methodology','No indicator explorer, scenario testing or download']
  }
};
const SESSION_KEY = 'tii.session';

/* ---------- Administration page, visible to the admin account only ---------- */
function vAdmin(){
  const rows = Object.entries(ROLES).map(([k,r])=>
    `<tr><td><b class="acct-n">${esc(r.label)}</b><span class="acct-w">${esc(r.who)}</span></td><td><code>${k}</code></td>
     <td>${r.routes.length} of ${Object.keys(ROLES.admin.routes).length?ROLES.admin.routes.length:8}</td>
     <td>${r.sim?'Yes':'No'}</td><td>${r.csv?'Yes':'No'}</td></tr>`).join('');
  return pageHead('Trade, Industry & Investment','Administration',
    'Accounts, what each one can reach, and how the edition is maintained. This page is visible to the administrator account only.')+`
    ${fig({title:'User accounts', sub:'Four demonstration accounts, each with its own view of the dashboard',
      body:`<div class="tw"><table class="t ind"><thead><tr><th>Account</th><th>Username</th><th>Pages</th><th>Scenario testing</th><th>Data download</th></tr></thead><tbody>${rows}</tbody></table></div>`,
      foot:'<b>Note:</b> these accounts are a demonstration of role-based views. Because the dashboard is a static site, the credentials are readable in the page source and the gate is not security. A genuinely restricted version requires a server.'})}
    ${fig({cls:'mt',title:'Maintaining the edition', sub:'What an administrator changes, and where',
      body:`<div class="tw"><table class="t ind"><thead><tr><th>What changes</th><th>File</th><th>Section</th></tr></thead><tbody>
        <tr><td>Indicator values and scores</td><td><code>data/database.js</code></td><td>indicators</td></tr>
        <tr><td>Chart series</td><td><code>data/database.js</code></td><td>charts</td></tr>
        <tr><td>Written analysis</td><td><code>data/database.js</code></td><td>analysis</td></tr>
        <tr><td>Policy actions</td><td><code>data/database.js</code></td><td>actions</td></tr>
        <tr><td>Accounts and permissions</td><td><code>js/auth.js</code></td><td>ROLES</td></tr>
      </tbody></table></div>`,
      foot:'<b>Source:</b> NCC. Domain, pillar and index scores are recalculated in the browser from the indicator values, so they are never edited by hand.'})}
  `;
}

/* ---------- gate ---------- */
function applyRole(role){
  const r = ROLES[role];
  /* a preview draft belongs to the administrator who made it; no other account sees it */
  if(!r.routes.includes('editor') && window.TII_DRAFT && typeof edClearDraft === 'function'){
    edClearDraft(); location.reload(); return;
  }
  document.body.dataset.role = role;
  Object.keys(ROUTES).forEach(k=>{ if(!r.routes.includes(k)) delete ROUTES[k]; });
  if(r.routes.includes('admin')) ROUTES.admin = {t:'Administration', v:vAdmin};
  if(r.routes.includes('editor') && typeof vEditor === 'function') ROUTES.editor = {t:'Data Editor', v:vEditor};
  const who = document.getElementById('who');
  who.innerHTML = `<span class="who-r">${esc(r.label)}</span><button class="btn" id="signOut">Sign out</button>`;
  who.hidden = false;
  document.getElementById('signOut').onclick = ()=>{
    try{ sessionStorage.removeItem(SESSION_KEY); }catch(e){}
    if(typeof edClearDraft === 'function') edClearDraft();
    location.hash = ''; location.reload();
  };
  if(!r.routes.includes((location.hash.replace(/^#\/?/,'')||'summary').split('?')[0])) location.hash = '#summary';
  document.getElementById('gate').hidden = true;
  document.body.classList.remove('locked');
  route();
}

(function initAuth(){
  const gate = document.getElementById('gate');
  let saved = null;
  try{ saved = sessionStorage.getItem(SESSION_KEY); }catch(e){}
  if(saved && ROLES[saved]){ applyRole(saved); return; }

  document.body.classList.add('locked');
  gate.hidden = false;
  const form = document.getElementById('gateForm'), err = document.getElementById('gateErr');
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const u = document.getElementById('gu').value.trim().toLowerCase();
    const p = document.getElementById('gp').value;
    const r = ROLES[u];
    if(!r || r.pw !== p){
      err.textContent = 'That username and password do not match a demonstration account.';
      err.hidden = false; return;
    }
    err.hidden = true;
    try{ sessionStorage.setItem(SESSION_KEY, u); }catch(e){}
    applyRole(u);
  });
  /* the demo accounts are listed on the gate: one click fills them in */
  document.querySelectorAll('#gateAccts button').forEach(b=>{
    b.onclick = ()=>{
      document.getElementById('gu').value = b.dataset.u;
      document.getElementById('gp').value = ROLES[b.dataset.u].pw;
      document.getElementById('gp').focus();
    };
  });
  document.getElementById('gu').focus();
})();
