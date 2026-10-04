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
    <div className="container" style={{ paddingTop: '1.5rem' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
        <Link href="/" style={{ color: 'var(--text-sub)' }}>হোম</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{categoryName}</span>
      </div>

      {/* Category Header */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            {categoryName}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            {categoryName} সম্পর্কিত সকল সর্বশেষ সংবাদ, বিশ্লেষণ ও প্রতিবেদন
          </p>
        </div>
        <span style={{ background: 'var(--border-hover)', color: 'var(--primary)', padding: '0.4rem 0.85rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.9rem' }}>
          {articles.length} টি সংবাদ
        </span>
      </div>

      <div className="portal-layout">
        {/* Main Feed */}
        <div>
          {articles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                এই বিভাগে বর্তমানে কোনো নতুন সংবাদ পাওয়া যায়নি।
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Featured article */}
              {articles[0] && (
                <NewsCard article={articles[0]} showExcerpt />
              )}

              {/* Grid of other articles */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                {articles.slice(1).map((item) => (
                  <NewsCard key={item.id || item.slug} article={item} />
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
