import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, User, ChevronRight, Eye } from 'lucide-react';
import { getArticleBySlug, getArticles, getCategories } from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import NewsCard from '@/components/NewsCard';
import ArticleInteractions from './ArticleInteractions';

interface NewsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsDetailsPage({ params }: NewsPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const [categories, allArticles] = await Promise.all([
    getCategories(),
    getArticles(),
  ]);

  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && (a.category?.slug === article.category?.slug || !article.category))
    .slice(0, 4);

  return (
    <div className="container" style={{ paddingTop: '1rem' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <Link href="/" style={{ color: 'var(--text-sub)' }}>হোম</Link>
        <ChevronRight size={13} />
        {article.category && (
          <>
            <Link href={`/category/${article.category.slug}`} style={{ color: 'var(--text-sub)' }}>
              {article.category.name_bn}
            </Link>
            <ChevronRight size={13} />
          </>
        )}
        <span style={{ color: 'var(--primary)', fontWeight: 600 }}>বিস্তারিত সংবাদ</span>
      </div>

      <div className="portal-layout">
        {/* Main Article Container */}
        <article style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          {/* Category & Breaking Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
            {article.category && (
              <Link
                href={`/category/${article.category.slug}`}
                style={{
                  background: 'var(--primary)',
                  color: 'white',
                  padding: '0.2rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                }}
              >
                {article.category.name_bn}
              </Link>
            )}
            {article.is_breaking && (
              <span style={{ background: '#f59e0b', color: '#111827', padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-sm)', fontSize: '0.76rem', fontWeight: 800 }}>
                ব্রেকিং নিউজ
              </span>
            )}
          </div>

          {/* Headline Title */}
          <h1 style={{ fontSize: 'clamp(1.4rem, 4.5vw, 2.1rem)', fontWeight: 800, lineHeight: 1.35, color: 'var(--text-main)', marginBottom: '1rem' }}>
            {article.title}
          </h1>

          {/* Meta Info Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.85rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1.25rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-sub)', fontWeight: 600 }}>
                <User size={15} />
                <span>{article.author_name}</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={15} />
                <span>প্রকাশ: ৪ ঘণ্টা আগে</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Eye size={15} />
                <span>{article.view_count || 1240} বার পঠিত</span>
              </span>
            </div>

            {/* Client interactive buttons (Share, Bookmark, Audio) */}
            <ArticleInteractions article={article} />
          </div>

          {/* Featured Image */}
          {article.featured_image && (
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.5rem', background: 'var(--skeleton-base)', border: '1px solid var(--border-subtle)' }}>
              <img
                src={article.featured_image}
                alt={article.title}
                loading="eager"
                decoding="async"
                style={{ width: '100%', maxHeight: '480px', objectFit: 'cover' }}
              />
            </div>
          )}

          {/* AI Quick Summary (Futuristic Feature) */}
          <div style={{ background: 'var(--primary-subtle)', border: '1px solid var(--border-hover)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--primary)', fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.35rem' }}>
              <span>⚡ স্মার্ট এআই সারসংক্ষেপ</span>
            </div>
            <p style={{ color: 'var(--text-sub)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              {article.excerpt}
            </p>
          </div>

          {/* Main Article Body */}
          <div
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: 'var(--text-main)',
              marginBottom: '2rem',
              wordBreak: 'break-word',
            }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', marginBottom: '2rem' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-sub)', fontSize: '0.85rem' }}>বিষয়:</span>
              {article.tags.map((t, idx) => (
                <Link
                  key={idx}
                  href={`/search?q=${encodeURIComponent(t)}`}
                  className="chip-tag"
                >
                  #{t}
                </Link>
              ))}
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div style={{ paddingTop: '1.5rem', borderTop: '2px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>
                সম্পর্কিত আরও সংবাদ
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                {relatedArticles.map((rel) => (
                  <NewsCard key={rel.id} article={rel} />
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <Sidebar categories={categories} />
      </div>
    </div>
  );
}
