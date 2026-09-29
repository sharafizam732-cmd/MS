-- Supabase: run in SQL editor. Passwords live in Supabase Auth only, never in these tables.
create table admins(id uuid primary key references auth.users on delete cascade,email text,role text check(role in('admin','editor')) default 'editor',last_login timestamptz);
create table subjects(id bigserial primary key,name text not null,description text,image_url text,topics text[],status text default 'draft',created_at timestamptz default now());
create table resources(id bigserial primary key,title text not null,category text,description text,file_url text,thumb_url text,status text default 'draft',created_at timestamptz default now());
create table messages(id bigserial primary key,name text,email text,message text,status text default 'new',created_at timestamptz default now());
create table settings(key text primary key,value jsonb);
create function is_admin() returns boolean language sql security definer stable as $$select exists(select 1 from admins where id=auth.uid())$$;
alter table admins enable row level security;alter table subjects enable row level security;alter table resources enable row level security;alter table messages enable row level security;alter table settings enable row level security;
create policy "admins read self" on admins for select using(id=auth.uid());
create policy "public reads published" on subjects for select using(status='published' or is_admin());
create policy "public reads published" on resources for select using(status='published' or is_admin());
create policy "admin writes" on subjects for all using(is_admin()) with check(is_admin());
create policy "admin writes" on resources for all using(is_admin()) with check(is_admin());
create policy "anyone can send" on messages for insert with check(true);
create policy "admin manages messages" on messages for all using(is_admin()) with check(is_admin());
create policy "admin settings" on settings for all using(is_admin()) with check(is_admin());
-- After creating your user in Auth > Users: insert into admins(id,email,role) values('<user uuid>','you@example.com','admin');
-- ---- students, videos, courses (roles: admin via admins table, student via students table) ----
create table students(id uuid primary key references auth.users on delete cascade,email text,full_name text,created_at timestamptz default now());
create table videos(id bigserial primary key,title text not null,description text,url text,thumb_url text,subject text,status text default 'draft',created_at timestamptz default now());
create table courses(id bigserial primary key,title text not null,subject text,description text,duration text,level text,price text,status text default 'draft',created_at timestamptz default now());
-- every self-signup becomes a student only; admins are added manually, so nobody can self-promote
create function handle_new_user() returns trigger language plpgsql security definer as $$begin insert into students(id,email) values(new.id,new.email);return new;end$$;
create trigger on_signup after insert on auth.users for each row execute function handle_new_user();
alter table students enable row level security;alter table videos enable row level security;alter table courses enable row level security;
create policy "student reads self" on students for select using(id=auth.uid() or is_admin());
create policy "admin manages students" on students for all using(is_admin()) with check(is_admin());
create policy "public reads published" on videos for select using(status='published' or is_admin());
create policy "public reads published" on courses for select using(status='published' or is_admin());
create policy "admin writes" on videos for all using(is_admin()) with check(is_admin());
create policy "admin writes" on courses for all using(is_admin()) with check(is_admin());
-- Auth users live in Supabase's built-in auth.users table (the "users" table); passwords are never stored by us.
