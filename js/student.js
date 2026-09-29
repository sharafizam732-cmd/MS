const C=window.AUTH_CFG,sb=(C.url&&window.supabase)?supabase.createClient(C.url,C.key):null,go=p=>location.replace(p),page=document.body.dataset.page,$=s=>document.querySelector(s);
document.querySelectorAll('img[data-fb]').forEach(i=>{const f=()=>{i.outerHTML='<b class="tl">MUSTHAQ\'S<br><span>SCIENCE</span></b>'};i.complete&&!i.naturalWidth?f():i.onerror=f});
// SECURITY: UI guard only. Real enforcement = Supabase Auth + RLS (data/schema.sql). Students cannot read admin tables.
const isStudent=async u=>{const {data}=await sb.from('students').select('id').eq('id',u.id).maybeSingle();return !!data};
if(page==='slogin'){const f=$('#sf'),m=$('#m');let up=false;const e=new URLSearchParams(location.search).get('e');
 if(!sb)m.textContent='Student sign-in is being set up and will be available soon.';if(e==='denied')m.textContent='This account is not a student account.';
 $('#cs').onclick=()=>{up=!up;$('#t').textContent=up?'Create Student Account':'Student Login';$('#go').textContent=up?'Create Account':'Login';$('#cs').textContent=up?'I already have an account':'Create Student Account';m.textContent=''};
 f.onsubmit=async ev=>{ev.preventDefault();if(!sb)return;m.textContent='Please wait…';
  if(up){const {error}=await sb.auth.signUp({email:f.e.value,password:f.p.value,options:{emailRedirectTo:location.origin+location.pathname}});m.textContent=error?'Could not create the account. Try a stronger password.':'Check your email to confirm your account.';return}
  const {data,error}=await sb.auth.signInWithPassword({email:f.e.value,password:f.p.value});
  if(error){m.textContent='Login failed. Check your email and password.';return}
  if(!(await isStudent(data.user))){await sb.auth.signOut();m.textContent='This account is not a student account.';return}go('dashboard.html')};
 $('#fp').onclick=async()=>{if(!sb||!f.e.value){m.textContent=sb?'Enter your email first.':m.textContent;return}await sb.auth.resetPasswordForEmail(f.e.value,{redirectTo:location.origin+location.pathname});m.textContent='If that account exists, a reset email has been sent.'};
}else(async()=>{if(!sb)return go('login.html');const {data:{session}}=await sb.auth.getSession();if(!session)return go('login.html');
 if(!(await isStudent(session.user))){await sb.auth.signOut();return go('login.html?e=denied')}document.body.hidden=false;$('#lo').onclick=async()=>{await sb.auth.signOut();go('login.html')}})();
