import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { getArticles } from '@/lib/api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category') || undefined;
  const articles = await getArticles(category);
  return NextResponse.json(articles);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, excerpt, content, featured_image, category_id, is_lead, is_breaking, author_name, tags } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'শিরোনাম ও সংবাদ বিবরণ আবশ্যক' }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s\u0980-\u09FF-]/g, '')
      .replace(/\s+/g, '-')
      .concat(`-${Date.now().toString(36)}`);

    const supabase = getSupabaseServerClient();

    if (supabase) {
      const { data, error } = await supabase
        .from('articles')
        .insert([
          {
            title,
            slug,
            excerpt: excerpt || title,
            content,
            featured_image: featured_image || 'https://banglarface.com/uploads/settings/logo_1786447333_6a7b05e546bbe.png',
            category_id: category_id || null,
            is_lead: Boolean(is_lead),
            is_breaking: Boolean(is_breaking),
            author_name: author_name || 'বাংলার ফেস ডেস্ক',
            tags: tags || [],
            status: 'published',
            published_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, article: data }, { status: 201 });
    }

    // In-memory / Fallback success response
    const mockNewArticle = {
      id: `art-${Date.now()}`,
      title,
      slug,
      excerpt: excerpt || title,
      content,
      featured_image: featured_image || 'https://banglarface.com/uploads/settings/logo_1786447333_6a7b05e546bbe.png',
      is_lead: Boolean(is_lead),
      is_breaking: Boolean(is_breaking),
      author_name: author_name || 'বাংলার ফেস ডেস্ক',
      status: 'published',
      published_at: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, article: mockNewArticle }, { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
