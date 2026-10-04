import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import NewsCard from '@/components/NewsCard';
import Sidebar from '@/components/Sidebar';
import { getArticles, getCategories } from '@/lib/api';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const currentCategory = categories.find((c) => c.slug === slug);

  if (!currentCategory && slug !== 'latest') {
    notFound();
  }

  const articles = await getArticles(slug);
  const categoryName = currentCategory ? currentCategory.name_bn : 'সর্বশেষ সংবাদ';

  return (
    <div className="home__wrap" style={{ paddingTop: '1.25rem' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', color: 'var(--pa-muted)', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <Link href="/" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>হোম</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{categoryName}</span>
      </div>

      {/* Category Header */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
            {categoryName}
          </h1>
          <p style={{ color: 'var(--pa-muted)', fontSize: '14px', margin: 0 }}>
            {categoryName} সম্পর্কিত সকল সর্বশেষ সংবাদ, বিশ্লেষণ ও প্রতিবেদন
          </p>
        </div>
        <span style={{ background: 'var(--pa-light)', color: 'var(--primary)', border: '1px solid var(--border-color)', padding: '4px 12px', borderRadius: '20px', fontWeight: 700, fontSize: '13px' }}>
          {articles.length} টি সংবাদ
        </span>
      </div>

      <div className="home__columns">
        {/* Main Feed */}
        <div className="home__main">
          {articles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'var(--bg-card)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
              <p style={{ fontSize: '1rem', color: 'var(--pa-muted)' }}>
                এই বিভাগে বর্তমানে কোনো নতুন সংবাদ পাওয়া যায়নি।
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Featured article */}
              {articles[0] && (
                <NewsCard article={articles[0]} variant="lg" showExcerpt />
              )}

              {/* Grid of other articles */}
              <div className="grid grid--2 grid--md-4">
                {articles.slice(1).map((item) => (
                  <NewsCard key={item.id || item.slug} article={item} variant="sm" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <Sidebar categories={categories} />
      </div>
    </div>
  );
}
