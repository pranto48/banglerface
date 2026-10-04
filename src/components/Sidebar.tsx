'use client';

import React from 'react';
import Link from 'next/link';
import { Database, Cloud } from 'lucide-react';
import { Category } from '@/lib/types';
import { MOST_READ_ARTICLES } from '@/lib/mock-data';

interface SidebarProps {
  categories: Category[];
}

export default function Sidebar({ categories }: SidebarProps) {
  return (
    <aside className="home__sidebar">
      {/* 1. সর্বাধিক পঠিত (MOST READ) */}
      <div className="side-box">
        <h2 className="side-box__title">সর্বাধিক পঠিত</h2>

        {MOST_READ_ARTICLES.map((item) => (
          <article key={item.rank} className="news-item">
            <Link href={`/news/${item.slug}`} className="news-item__link">
              <span className="news-item__rank" aria-hidden="true">
                {toBanglaNumber(item.rank)}
              </span>

              <div className="news-item__body">
                <h3 className="news-item__title">{item.title}</h3>

                <time className="news-item__meta">
                  <span className="news-item__category">{item.category}</span>
                  {item.time}
                </time>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* 2. বিভাগ (CATEGORY CHIPS) */}
      <div className="side-box">
        <h2 className="side-box__title">বিভাগ</h2>

        <div className="chips">
          {categories
            .filter((c) => c.slug !== 'latest')
            .map((cat) => (
              <Link
                key={cat.id || cat.slug}
                href={`/category/${cat.slug}`}
                className="chip"
              >
                {cat.name_bn}
              </Link>
            ))}
        </div>
      </div>

      {/* 3. CLOUD ARCHITECTURE STATUS */}
      <div className="side-box" style={{ background: 'var(--bg-card)' }}>
        <h2 className="side-box__title" style={{ fontSize: '15px' }}>
          সিস্টেম স্ট্যাটাস
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '13px', paddingTop: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--pa-muted)' }}>
              <Database size={14} color="#10b981" />
              <span>Supabase DB</span>
            </span>
            <span style={{ color: '#10b981', fontWeight: 700, fontSize: '12px' }}>সক্রিয়</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--pa-muted)' }}>
              <Cloud size={14} color="#38bdf8" />
              <span>Cloudflare R2</span>
            </span>
            <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: '12px' }}>কানেক্টেড</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function toBanglaNumber(num: number): string {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => banglaDigits[parseInt(d, 10)] || d);
}
