'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Article } from '@/lib/types';
import NewsCard from './NewsCard';

interface LeadSectionProps {
  leadArticle: Article;
  sideArticles: Article[];
}

export default function LeadSection({ leadArticle, sideArticles }: LeadSectionProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  if (!leadArticle) return null;

  return (
    <section className="hero-lead-grid" aria-label="প্রধান সংবাদ">
      {/* 1. MAIN HERO STORY */}
      <article className="lead-card-main">
        <Link href={`/news/${leadArticle.slug}`} className="lead-media-wrapper" aria-label={leadArticle.title}>
          <div className={`img-wrapper ${!imgLoaded ? 'img-skeleton' : ''}`} style={{ width: '100%', height: '100%' }}>
            <img
              src={leadArticle.featured_image || 'https://banglarface.com/logo.png'}
              alt={leadArticle.title}
              fetchPriority="high"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: imgLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            />
          </div>
          {leadArticle.category && (
            <span className="badge-category">{leadArticle.category.name_bn}</span>
          )}
        </Link>

        <div className="lead-content">
          <Link href={`/news/${leadArticle.slug}`} className="lead-title">
            {leadArticle.title}
          </Link>
          <p className="lead-excerpt">{leadArticle.excerpt}</p>

          <div className="meta-time">
            <Clock size={13} />
            <span>৪ ঘণ্টা আগে</span>
            <span style={{ color: 'var(--primary)', fontWeight: 700, marginLeft: '0.4rem' }}>
              • {leadArticle.author_name}
            </span>
          </div>
        </div>
      </article>

      {/* 2. SIDE STORIES LIST (Left text, right thumbnail) */}
      <div className="lead-side-list">
        {sideArticles.map((article) => (
          <NewsCard
            key={article.id || article.slug}
            article={article}
            variant="horizontal"
          />
        ))}
      </div>
    </section>
  );
}
