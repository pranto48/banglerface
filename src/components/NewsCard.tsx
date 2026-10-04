'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Article } from '@/lib/types';

interface NewsCardProps {
  article: Article;
  variant?: 'sm' | 'md' | 'lg' | 'item' | 'horizontal';
  rank?: number;
  showExcerpt?: boolean;
  showThumb?: boolean;
}

export default function NewsCard({
  article,
  variant = 'sm',
  rank,
  showExcerpt = false,
  showThumb = true,
}: NewsCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const timeFormatted = getTimeAgo(article.published_at);
  const defaultFallbackImage = 'https://banglarface.com/uploads/settings/logo_1786447333_6a7b05e546bbe.png';

  // If variant is item, horizontal, or has a rank number (used in lists and sidebars)
  if (variant === 'item' || variant === 'horizontal' || rank !== undefined) {
    return (
      <article className="news-item">
        <Link href={`/news/${article.slug}`} className="news-item__link">
          {rank !== undefined && (
            <span className="news-item__rank" aria-hidden="true">
              {toBanglaNumber(rank)}
            </span>
          )}

          <div className="news-item__body">
            <h3 className="news-item__title">{article.title}</h3>

            <time className="news-item__meta" dateTime={article.published_at}>
              {article.category && (
                <span className="news-item__category">{article.category.name_bn}</span>
              )}
              {timeFormatted}
            </time>
          </div>

          {showThumb && (
            <div className="news-item__thumb">
              <img
                src={article.featured_image || defaultFallbackImage}
                alt={article.title}
                loading="lazy"
                decoding="async"
                onLoad={() => setImgLoaded(true)}
                style={{
                  opacity: imgLoaded ? 1 : 0.8,
                  transition: 'opacity 0.2s ease',
                }}
              />
            </div>
          )}
        </Link>
      </article>
    );
  }

  // Standard news-card with sm / md / lg modifier
  const cardModifier = variant === 'lg' ? 'news-card--lg' : variant === 'md' ? 'news-card--md' : 'news-card--sm';

  return (
    <article className={`news-card ${cardModifier}`}>
      <Link href={`/news/${article.slug}`} className="news-card__link">
        <div className="news-card__media">
          <img
            src={article.featured_image || defaultFallbackImage}
            alt={article.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            style={{
              opacity: imgLoaded ? 1 : 0.8,
              transition: 'opacity 0.2s ease',
            }}
          />

          {article.category && (
            <span className="news-card__badge">{article.category.name_bn}</span>
          )}
        </div>

        <div className="news-card__body">
          <h3 className="news-card__title">{article.title}</h3>

          {showExcerpt && article.excerpt && (
            <p className="news-card__excerpt">{article.excerpt}</p>
          )}

          <time className="news-card__meta" dateTime={article.published_at}>
            {timeFormatted}
          </time>
        </div>
      </Link>
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
  return num.toString().replace(/\d/g, (d) => banglaDigits[parseInt(d, 10)] || d);
}
