import React from 'react';
import Link from 'next/link';
import { Article } from '@/lib/types';

interface LeadSectionProps {
  leadArticle: Article;
  sideArticles: Article[];
}

export default function LeadSection({ leadArticle, sideArticles }: LeadSectionProps) {
  if (!leadArticle) return null;

  return (
    <section className="home__section lead" aria-label="প্রধান সংবাদ">
      {/* Main Lead Story */}
      <Link href={`/news/${leadArticle.slug}`} className="lead__main">
        <div className="lead__media">
          <img
            src={leadArticle.featured_image || 'https://banglarface.com/uploads/settings/logo_1786447333_6a7b05e546bbe.png'}
            alt={leadArticle.title}
            fetchPriority="high"
          />
          {leadArticle.category && (
            <span className="lead__badge">{leadArticle.category.name_bn}</span>
          )}
        </div>

        <h1 className="lead__title">{leadArticle.title}</h1>
        <p className="lead__excerpt">{leadArticle.excerpt}</p>
        <time className="lead__meta">
          {getTimeAgo(leadArticle.published_at)}
        </time>
      </Link>

      {/* Side Stories (News Items with text left, thumb right) */}
      <div className="lead__side">
        {sideArticles.map((article) => (
          <article key={article.id || article.slug} className="news-item">
            <Link href={`/news/${article.slug}`} className="news-item__link">
              <div className="news-item__body">
                <h3 className="news-item__title">{article.title}</h3>
                <time className="news-item__meta">
                  {article.category && (
                    <span className="news-item__category">
                      {article.category.name_bn}
                    </span>
                  )}
                  {getTimeAgo(article.published_at)}
                </time>
              </div>

              <div className="news-item__thumb">
                <img
                  src={article.featured_image || 'https://banglarface.com/uploads/settings/logo_1786447333_6a7b05e546bbe.png'}
                  alt={article.title}
                  loading="lazy"
                />
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
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
