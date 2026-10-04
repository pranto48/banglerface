import { Article, Category } from './types';
import { INITIAL_ARTICLES, INITIAL_CATEGORIES, BREAKING_TICKER_ITEMS } from './mock-data';
import { getSupabaseServerClient, isServerSupabaseConfigured } from './supabase/server';

export async function getCategories(): Promise<Category[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return INITIAL_CATEGORIES;
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('order_index', { ascending: true });

    if (error || !data || data.length === 0) {
      return INITIAL_CATEGORIES;
    }

    return data as Category[];
  } catch {
    return INITIAL_CATEGORIES;
  }
}

export async function getArticles(categorySlug?: string): Promise<Article[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    if (categorySlug && categorySlug !== 'latest') {
      return INITIAL_ARTICLES.filter((a) => a.category?.slug === categorySlug);
    }
    return INITIAL_ARTICLES;
  }

  try {
    let query = supabase
      .from('articles')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (categorySlug && categorySlug !== 'latest') {
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();

      if (categoryData) {
        query = query.eq('category_id', categoryData.id);
      }
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      if (categorySlug && categorySlug !== 'latest') {
        return INITIAL_ARTICLES.filter((a) => a.category?.slug === categorySlug);
      }
      return INITIAL_ARTICLES;
    }

    return data as Article[];
  } catch {
    return INITIAL_ARTICLES;
  }
}

export async function getLeadArticle(): Promise<Article> {
  const articles = await getArticles();
  const lead = articles.find((a) => a.is_lead);
  return lead || articles[0] || INITIAL_ARTICLES[0];
}

export async function getBreakingNews(): Promise<string[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return BREAKING_TICKER_ITEMS;
  }

  try {
    const { data } = await supabase
      .from('articles')
      .select('title')
      .eq('is_breaking', true)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(8);

    if (data && data.length > 0) {
      return data.map((d) => d.title);
    }
    return BREAKING_TICKER_ITEMS;
  } catch {
    return BREAKING_TICKER_ITEMS;
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    const found = INITIAL_ARTICLES.find((a) => a.slug === slug);
    return found || null;
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('slug', slug)
      .single();

    if (error || !data) {
      const found = INITIAL_ARTICLES.find((a) => a.slug === slug);
      return found || null;
    }

    return data as Article;
  } catch {
    return INITIAL_ARTICLES.find((a) => a.slug === slug) || null;
  }
}

export async function searchArticles(queryStr: string, categorySlug?: string): Promise<Article[]> {
  const allArticles = await getArticles(categorySlug);
  if (!queryStr || queryStr.trim() === '') {
    return allArticles;
  }

  const q = queryStr.toLowerCase().trim();
  return allArticles.filter((article) => {
    const titleMatch = article.title.toLowerCase().includes(q);
    const excerptMatch = article.excerpt?.toLowerCase().includes(q);
    const tagMatch = article.tags?.some((t) => t.toLowerCase().includes(q));
    return titleMatch || excerptMatch || tagMatch;
  });
}
