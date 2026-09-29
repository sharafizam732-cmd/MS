// SECURITY: this client-side guard only controls what the UI shows. Real protection is
// Supabase Auth + the Row Level Security policies in data/schema.sql.
const CFG=window.AUTH_CFG;
const sb=(CFG.url&&window.supabase)?supabase.createClient(CFG.url,CFG.key):null;
const go=p=>location.replace(p),page=document.body.dataset.page;
async function guard(){
 if(!sb)return go('login.html?e=config');
 const {data:{session}}=await sb.auth.getSession(); if(!session)return go('login.html');
 const {data:a}=await sb.from('admins').select('role').eq('id',session.user.id).maybeSingle();
 if(!a){await sb.auth.signOut();return go('login.html?e=denied')}
 document.body.hidden=false;return session;
}
if(page==='login'){
 const f=document.getElementById('lf'),m=document.getElementById('lm'),e=new URLSearchParams(location.search).get('e');
 if(!sb||e==='config')m.textContent='Authentication is not configured yet. Add Supabase details in js/admin.js.';
 if(e==='denied')m.textContent='This account is not an authorised admin.';
 f.onsubmit=async ev=>{ev.preventDefault();if(!sb)return;m.textContent='Signing in…';
  const {error}=await sb.auth.signInWithPassword({email:f.e.value,password:f.p.value});
  if(error){m.textContent='Login failed. Check your email and password.';return}go('dashboard.html')};
 document.getElementById('fp').onclick=async()=>{if(!sb||!f.e.value){m.textContent='Enter your email first.';return}
  await sb.auth.resetPasswordForEmail(f.e.value,{redirectTo:location.origin+location.pathname});m.textContent='If that account exists, a reset email has been sent.'};
}else guard().then(s=>{if(!s)return;
 document.getElementById('lo').onclick=async()=>{await sb.auth.signOut();go('login.html')};
 if(page==='dashboard')['subjects','resources','messages'].forEach(async t=>{const {count}=await sb.from(t).select('*',{count:'exact',head:true});document.getElementById('n-'+t).textContent=count??0});
});
