'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Article } from '@/lib/types';

interface NewsCardProps {
  article: Article;
  variant?: 'small' | 'medium' | 'horizontal';
  showExcerpt?: boolean;
}

export default function NewsCard({
  article,
  variant = 'small',
  showExcerpt = false,
}: NewsCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const timeFormatted = getTimeAgo(article.published_at);

  if (variant === 'horizontal') {
    return (
      <article className="news-item-horizontal">
        <div className="news-item-body">
          <Link href={`/news/${article.slug}`} className="news-item-title">
            {article.title}
          </Link>
          <div className="meta-time">
            <Clock size={12} />
            <span>{timeFormatted}</span>
            {article.category && (
              <span style={{ color: 'var(--primary)', fontWeight: 700, marginLeft: '0.35rem' }}>
                • {article.category.name_bn}
              </span>
            )}
          </div>
        </div>

        <Link href={`/news/${article.slug}`} className="news-item-thumb" aria-label={article.title}>
          <div className={`img-wrapper ${!imgLoaded ? 'img-skeleton' : ''}`} style={{ width: '100%', height: '100%' }}>
            <img
              src={article.featured_image || 'https://banglarface.com/logo.png'}
              alt={article.title}
              loading="lazy"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: imgLoaded ? 1 : 0,
                transition: 'opacity 0.25s ease',
              }}
            />
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="news-card-sm">
      <Link href={`/news/${article.slug}`} className="news-card-media" aria-label={article.title}>
        <div className={`img-wrapper ${!imgLoaded ? 'img-skeleton' : ''}`} style={{ width: '100%', height: '100%' }}>
          <img
            src={article.featured_image || 'https://banglarface.com/logo.png'}
            alt={article.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: imgLoaded ? 1 : 0,
              transition: 'opacity 0.25s ease',
            }}
          />
        </div>
        {article.category && (
          <span className="badge-category">{article.category.name_bn}</span>
        )}
      </Link>

      <div className="news-card-body">
        <div>
          <Link href={`/news/${article.slug}`} className="news-card-title">
            {article.title}
          </Link>
          {showExcerpt && article.excerpt && (
            <p style={{ color: 'var(--text-sub)', fontSize: '0.88rem', marginBottom: '0.65rem', lineHeight: 1.55 }}>
              {article.excerpt}
            </p>
          )}
        </div>

        <div className="meta-time">
          <Clock size={12} />
          <span>{timeFormatted}</span>
        </div>
      </div>
    </article>
  );
}

function getTimeAgo(dateString: string): string {
  try {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${toBanglaNumber(diffDays)} দিন আগে`;
    }
    if (diffHours > 0) {
      return `${toBanglaNumber(diffHours)} ঘণ্টা আগে`;
    }
    return 'কিছুক্ষণ আগে';
  } catch {
    return 'আজ';
  }
}

function toBanglaNumber(num: number): string {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => banglaDigits[parseInt(d, 10)]);
}
