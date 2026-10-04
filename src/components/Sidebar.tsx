'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, Tag, Database, Cloud } from 'lucide-react';
import { Category } from '@/lib/types';
import { MOST_READ_ARTICLES } from '@/lib/mock-data';

interface SidebarProps {
  categories: Category[];
}

export default function Sidebar({ categories }: SidebarProps) {
  return (
    <aside className="portal-sidebar">
      {/* 1. সর্বাধিক পঠিত (MOST READ) */}
      <div className="side-box">
        <h2 className="side-box-title">
          <span>সর্বাধিক পঠিত</span>
          <Flame size={18} color="#ef4444" />
        </h2>

        <div className="ranked-news-list">
          {MOST_READ_ARTICLES.map((item) => (
            <article key={item.rank} className="ranked-news-item">
              <span className="rank-badge">{item.rank}</span>
              <div style={{ flex: 1 }}>
                <Link href={`/news/${item.slug}`} className="rank-title">
                  {item.title}
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.3rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{item.category}</span>
                  <span>•</span>
                  <span>{item.time}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 2. বিভাগ (CATEGORY CHIPS) */}
      <div className="side-box">
        <h2 className="side-box-title">
          <span>বিভাগ</span>
          <Tag size={18} color="var(--primary)" />
        </h2>

        <div className="chips-cloud">
          {categories
            .filter((c) => c.slug !== 'latest')
            .map((cat) => (
              <Link
                key={cat.id || cat.slug}
                href={`/category/${cat.slug}`}
                className="chip-tag"
              >
                {cat.name_bn}
              </Link>
            ))}
        </div>
      </div>

      {/* 3. CLOUD ARCHITECTURE STATUS */}
      <div className="side-box" style={{ background: 'linear-gradient(180deg, var(--bg-card), var(--bg-main))' }}>
        <h2 className="side-box-title" style={{ fontSize: '1rem', borderBottomColor: 'var(--border-subtle)' }}>
          <span>সিস্টেম স্ট্যাটাস</span>
          <Cloud size={16} color="#38bdf8" />
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-sub)' }}>
              <Database size={14} color="#10b981" />
              <span>Supabase DB</span>
            </span>
            <span style={{ color: '#10b981', fontWeight: 600 }}>সক্রিয়</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-sub)' }}>
              <Cloud size={14} color="#38bdf8" />
              <span>Cloudflare R2</span>
            </span>
            <span style={{ color: '#38bdf8', fontWeight: 600 }}>কানেক্টেড</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
