# Musthaq's Science
Static multi-page site. Run: `python3 -m http.server 8000` then open http://localhost:8000 (admin: /admin/login.html). No build step. Deploy: upload the folder to Netlify, Vercel, Cloudflare Pages or GitHub Pages.
Photo: put `assets/images/musthaq-sir.jpg`. Logo: put `assets/logo/logo.png` (and `favicon.png`). Other images in assets/images: hero-science, about, subject-physics/chemistry/biology, resource-placeholder (.jpg). Missing files show placeholders automatically.
Auth: Supabase. Create a project, run data/schema.sql, create your user in Auth > Users, insert it into `admins`, then fill CFG in js/admin.js and `supabase` in data/site.js.
Checklist: [ ] photo [ ] logo [ ] biography [ ] qualifications [ ] experience [ ] subjects/topics [ ] YouTube [ ] Facebook (set) [ ] WhatsApp [ ] email [ ] course info [ ] resource files [ ] Supabase auth config [ ] database config
Auth: fill js/auth-config.js once (used by admin and student). Contact details: data/site.js.
