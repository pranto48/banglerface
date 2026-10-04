import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles, getCategories } from '@/lib/api';
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

  // Trending / Most viewed articles
  const trendingArticles = allArticles
    .filter((a) => a.id !== article.id)
    .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
    .slice(0, 5);

  // Related articles in same category
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && (a.category?.slug === article.category?.slug || !article.category))
    .slice(0, 4);

  return (
    <div className="container">
      <div className="article-wrapper">
        {/* Main Article Column */}
        <article className="article-main">
          {/* 1. Breadcrumb */}
          <nav className="breadcrumb-nav" aria-label="ব্রেডক্রাম্ব">
            <Link href="/">🏠 হোম</Link>
            <span>/</span>
            {article.category ? (
              <Link href={`/category/${article.category.slug}`}>
                {article.category.name_bn}
              </Link>
            ) : (
              <span>সংবাদ</span>
            )}
          </nav>

          {/* 2. Category Badge */}
          {article.category && (
            <span className="category-badge-post">
              {article.category.name_bn}
            </span>
          )}

          {/* 3. Title */}
          <h1 className="article-title-post">
            {article.title}
          </h1>

          {/* 4. Article Meta */}
          <div className="article-meta-post">
            <div className="meta-author">
              <div className="author-avatar" aria-hidden="true">
                📝
              </div>
              <div className="author-details">
                <div className="author-name">{article.author_name || 'অনলাইন ডেস্ক'}</div>
                <div className="author-time">
                  {formatDateBangla(article.published_at)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              <div className="meta-stat">
                👁️ <strong>{article.view_count || 12}</strong>
              </div>
              {/* Interactive buttons (audio reader, bookmark) */}
              <ArticleInteractions article={article} />
            </div>
          </div>

          {/* 5. Featured Image (Strictly Constrained) */}
          {article.featured_image && (
            <>
              <div className="featured-image-box">
                <img
                  src={article.featured_image}
                  alt={article.title}
                  className="featured-image-post"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="image-caption-post">
                📷 ছবি: সংগৃহীত
              </div>
            </>
          )}

          {/* 6. AI Summary Box */}
          {article.excerpt && (
            <div style={{ background: 'var(--primary-subtle)', border: '1px solid var(--border-hover)', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: 800, fontSize: '0.92rem', marginBottom: '0.35rem' }}>
                <span>⚡ সংক্ষেপ (AI Summary)</span>
              </div>
              <p style={{ color: 'var(--text-sub)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {article.excerpt}
              </p>
            </div>
          )}

          {/* 7. Article Content */}
          <div
            className="article-content-post"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* 8. Share Section */}
          <div className="share-section-post">
            <span className="share-label-post">📤 শেয়ার:</span>
            <div className="share-buttons-post">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://banglarface.vercel.app/news/${article.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn-round share-btn-fb"
                title="Facebook এ শেয়ার করুন"
              >
                f
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://banglarface.vercel.app/news/${article.slug}`)}&text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn-round share-btn-tw"
                title="Twitter/X এ শেয়ার করুন"
              >
                𝕏
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${article.title} - https://banglarface.vercel.app/news/${article.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn-round share-btn-wa"
                title="WhatsApp এ শেয়ার করুন"
              >
                💬
              </a>
            </div>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-sub)', fontSize: '0.85rem' }}>ট্যাগ:</span>
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
        </article>

        {/* 9. BanglarFace Exact Sidebar */}
        <aside className="article-sidebar-post">
          {/* Trending Articles: 🔥 সবচেয়ে দেখা */}
          <div className="sidebar-card-post">
            <h3 className="sidebar-title-post">
              <span>🔥 সবচেয়ে দেখা</span>
            </h3>

            {trendingArticles.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="sidebar-item-post"
              >
                {item.featured_image && (
                  <img
                    src={item.featured_image}
                    alt={item.title}
                    className="sidebar-item-image-post"
                    loading="lazy"
                  />
                )}
                <div className="sidebar-item-title-post">
                  {item.title}
                </div>
                <div className="sidebar-item-views-post">
                  👁️ {item.view_count || 150} ভিউ
                </div>
              </Link>
            ))}
          </div>

          {/* Related Articles: 📰 আরও খবর */}
          {relatedArticles.length > 0 && (
            <div className="sidebar-card-post">
              <h3 className="sidebar-title-post">
                <span>📰 আরও খবর</span>
              </h3>

              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/news/${rel.slug}`}
                  className="sidebar-item-post"
                >
                  {rel.featured_image && (
                    <img
                      src={rel.featured_image}
                      alt={rel.title}
                      className="sidebar-item-image-post"
                      loading="lazy"
                    />
                  )}
                  <div className="sidebar-item-title-post">
                    {rel.title}
                  </div>
                  <div className="sidebar-item-time-post">
                    {getTimeAgo(rel.published_at)}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Newsletter: ✉️ নিউজলেটার */}
          <div className="newsletter-card-post">
            <h4>✉️ নিউজলেটার</h4>
            <p>সর্বশেষ খবর পান প্রতিদিন সরাসরি আপনার ইনবক্সে</p>
            <form action="#">
              <input
                type="email"
                className="newsletter-input-post"
                placeholder="আপনার ইমেইল"
                required
              />
              <button type="submit" className="newsletter-btn-post">
                সাবস্ক্রাইব করুন
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}

function formatDateBangla(dateString: string): string {
  try {
    const d = new Date(dateString);
    const day = d.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  } catch {
    return '04 Oct 2026, 11:39';
  }
}

function getTimeAgo(dateString: string): string {
  try {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} দিন আগে`;
    }
    if (diffHours > 0) {
      return `${diffHours} ঘণ্টা আগে`;
    }
    return 'কিছুক্ষণ আগে';
  } catch {
    return 'আজ';
  }
}
