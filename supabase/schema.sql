-- =========================================================
-- BANGLAR FACE (বাংলার ফেস) - SUPABASE POSTGRESQL SCHEMA
-- Futuristic, High-Performance Media Portal Database
-- =========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. CATEGORIES TABLE
create table if not exists public.categories (
    id uuid default gen_random_uuid() primary key,
    name_bn text not null,
    name_en text not null,
    slug text unique not null,
    description text,
    order_index integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index on slug for fast routing lookup
create index if not exists idx_categories_slug on public.categories(slug);

-- 2. ARTICLES TABLE
create table if not exists public.articles (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    slug text unique not null,
    excerpt text,
    content text not null,
    featured_image text,
    category_id uuid references public.categories(id) on delete set null,
    is_lead boolean default false,
    is_breaking boolean default false,
    view_count integer default 0,
    author_name text default 'বাংলার ফেস ডেস্ক',
    author_id uuid references auth.users(id) on delete set null,
    status text default 'published' check (status in ('draft', 'published', 'archived')),
    tags text[] default array[]::text[],
    published_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Fast Indexes for Queries
create index if not exists idx_articles_slug on public.articles(slug);
create index if not exists idx_articles_category on public.articles(category_id);
create index if not exists idx_articles_published on public.articles(published_at desc);
create index if not exists idx_articles_lead on public.articles(is_lead) where is_lead = true;
create index if not exists idx_articles_breaking on public.articles(is_breaking) where is_breaking = true;
create index if not exists idx_articles_views on public.articles(view_count desc);

-- 3. BOOKMARKS TABLE (Saved reading list for users)
create table if not exists public.bookmarks (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    article_id uuid references public.articles(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, article_id)
);

create index if not exists idx_bookmarks_user on public.bookmarks(user_id);

-- 4. COMMENTS TABLE
create table if not exists public.comments (
    id uuid default gen_random_uuid() primary key,
    article_id uuid references public.articles(id) on delete cascade not null,
    user_id uuid references auth.users(id) on delete set null,
    author_name text not null,
    content text not null,
    status text default 'approved' check (status in ('pending', 'approved', 'spam')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_comments_article on public.comments(article_id);

-- 5. SITE SETTINGS TABLE (Branding, Footer, Socials, Ticker controls)
create table if not exists public.site_settings (
    key text primary key,
    value jsonb not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================

alter table public.categories enable row level security;
alter table public.articles enable row level security;
alter table public.bookmarks enable row level security;
alter table public.comments enable row level security;
alter table public.site_settings enable row level security;

-- Public Read Policies
create policy "Allow public read access for categories"
    on public.categories for select using (true);

create policy "Allow public read access for published articles"
    on public.articles for select
    using (status = 'published');

create policy "Allow public read access for approved comments"
    on public.comments for select
    using (status = 'approved');

create policy "Allow public read access for site settings"
    on public.site_settings for select using (true);

-- Authenticated Users Bookmark Policies
create policy "Users can view their own bookmarks"
    on public.bookmarks for select
    using (auth.uid() = user_id);

create policy "Users can insert their own bookmarks"
    on public.bookmarks for insert
    with check (auth.uid() = user_id);

create policy "Users can delete their own bookmarks"
    on public.bookmarks for delete
    using (auth.uid() = user_id);

-- Comment Submission
create policy "Allow anyone to insert comments"
    on public.comments for insert
    with check (true);

-- Admin / Staff Policies (Full Access for Service Role or Admin Users)
create policy "Admin full access to articles"
    on public.articles for all
    using (auth.role() = 'service_role' or auth.jwt()->>'role' = 'admin');

create policy "Admin full access to categories"
    on public.categories for all
    using (auth.role() = 'service_role' or auth.jwt()->>'role' = 'admin');

-- Function to safely increment article view count
create or replace function public.increment_article_views(article_slug text)
returns void as $$
begin
    update public.articles
    set view_count = view_count + 1
    where slug = article_slug;
end;
$$ language plpgsql security definer;
