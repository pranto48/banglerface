'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search as SearchIcon, X, SlidersHorizontal } from 'lucide-react';
import { Article, Category } from '@/lib/types';
import NewsCard from '@/components/NewsCard';

interface SearchClientProps {
  categories: Category[];
  initialArticles: Article[];
}

export default function SearchClient({ categories, initialArticles }: SearchClientProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredArticles = useMemo(() => {
    return initialArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        article.category?.slug === selectedCategory;

      if (!matchesCategory) return false;

      if (!query.trim()) return true;

      const q = query.toLowerCase().trim();
      const matchTitle = article.title.toLowerCase().includes(q);
      const matchExcerpt = article.excerpt?.toLowerCase().includes(q);
      const matchTag = article.tags?.some((t) => t.toLowerCase().includes(q));

      return matchTitle || matchExcerpt || matchTag;
    });
  }, [initialArticles, query, selectedCategory]);

  return (
    <div>
      {/* Search Header Banner */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '2rem', marginBottom: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)', textAlign: 'center' }}>
          সংবাদ সন্ধান করুন
        </h1>

        {/* Search Input Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', maxWidth: '720px', margin: '0 auto', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '0.5rem 1rem' }}>
          <SearchIcon size={20} color="var(--primary)" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="কী খুঁজতে চান? শিরোনাম বা বিষয়ের নাম লিখুন..."
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontSize: '1.05rem',
              color: 'var(--text-main)',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={{ color: 'var(--text-muted)' }}
              title="মুছে ফেলুন"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            <SlidersHorizontal size={14} />
            <span>ফিল্টার:</span>
          </span>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              background: 'var(--bg-main)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '0.45rem 0.85rem',
              fontSize: '0.9rem',
              outline: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <option value="all">সকল বিভাগ</option>
            {categories
              .filter((c) => c.slug !== 'latest')
              .map((c) => (
                <option key={c.id || c.slug} value={c.slug}>
                  {c.name_bn}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
          ফলাফল ({filteredArticles.length} টি সংবাদ)
        </h2>
        {query && (
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            অনুসন্ধান: &ldquo;{query}&rdquo;
          </span>
        )}
      </div>

      {/* Results Grid */}
      {filteredArticles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-card)', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            আপনার অনুসন্ধানের সাথে মেলে এমন কোনো সংবাদ পাওয়া যায়নি।
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            ভিন্ন কোনো শব্দ বা কম ফিল্টার দিয়ে পুনরায় চেষ্টা করুন।
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {filteredArticles.map((article) => (
            <NewsCard key={article.id || article.slug} article={article} showExcerpt />
          ))}
        </div>
      )}
    </div>
  );
}
