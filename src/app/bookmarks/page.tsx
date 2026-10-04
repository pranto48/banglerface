'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark as BookmarkIcon, Trash2, ArrowRight } from 'lucide-react';
import { Article } from '@/lib/types';
import NewsCard from '@/components/NewsCard';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('banglarface_bookmarks');
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch {
      // ignore
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const clearAllBookmarks = () => {
    if (confirm('আপনি কি সব সংরক্ষিত সংবাদ মুছে ফেলতে চান?')) {
      localStorage.removeItem('banglarface_bookmarks');
      setBookmarks([]);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', minHeight: '65vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '2px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div className="btn-icon" style={{ background: 'var(--primary)', color: 'white', border: 'none' }}>
            <BookmarkIcon size={20} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
              সংরক্ষিত সংবাদ (Bookmarks)
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              পরে পড়ার জন্য আপনার সংরক্ষিত সংবাদের তালিকা
            </p>
          </div>
        </div>

        {bookmarks.length > 0 && (
          <button
            type="button"
            onClick={clearAllBookmarks}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444', fontSize: '0.9rem', fontWeight: 600, padding: '0.5rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}
          >
            <Trash2 size={16} />
            <span>সব মুছুন</span>
          </button>
        )}
      </div>

      {!isLoaded ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>লোড হচ্ছে...</div>
      ) : bookmarks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4.5rem 1rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-subtle)', maxWidth: '600px', margin: '0 auto' }}>
          <BookmarkIcon size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            কোনো সংবাদ সংরক্ষিত নেই
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            যেকোনো সংবাদের বিস্তারিত পেজে গিয়ে বুকমার্ক আইকনে ক্লিক করে সংবাদটি এখানে সংরক্ষণ করতে পারেন।
          </p>
          <Link
            href="/"
            className="btn-login"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}
          >
            <span>সর্বশেষ সংবাদ পড়ুন</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {bookmarks.map((article) => (
            <NewsCard key={article.id || article.slug} article={article} showExcerpt />
          ))}
        </div>
      )}
    </div>
  );
}
