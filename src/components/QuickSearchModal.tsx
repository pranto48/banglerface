'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ChevronRight, Clock, Flame } from 'lucide-react';
import { Article } from '@/lib/types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);

      // Fetch articles for quick search if not loaded
      if (articles.length === 0) {
        setIsLoading(true);
        fetch('/api/articles')
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data)) setArticles(data);
          })
          .catch(() => {})
          .finally(() => setIsLoading(false));
      }
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? articles.filter((a) => {
        const q = query.toLowerCase().trim();
        return (
          a.title.toLowerCase().includes(q) ||
          a.excerpt?.toLowerCase().includes(q) ||
          a.category?.name_bn.toLowerCase().includes(q)
        );
      }).slice(0, 6)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const popularTags = ['বাংলাদেশ', 'রাজনীতি', 'অর্থনীতি', 'শিক্ষা', 'আন্তর্জাতিক', 'খেলা', 'বিনোদন'];

  return (
    <div className="search-modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSearchSubmit} className="search-modal-input-wrap">
          <Search size={22} className="search-modal-icon" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="সংবাদ অনুসন্ধান করুন..."
            className="search-modal-input"
            aria-label="সংবাদ অনুসন্ধান"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="search-modal-clear"
              title="মুছুন"
            >
              <X size={18} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="search-modal-close"
            title="বন্ধ করুন (Esc)"
          >
            Esc
          </button>
        </form>

        {/* Popular Tags */}
        {!query && (
          <div className="search-modal-popular">
            <div className="search-modal-section-title">
              <Flame size={15} color="var(--primary)" />
              <span>জনপ্রিয় বিভাগসমূহ:</span>
            </div>
            <div className="search-modal-tags">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  className="search-modal-tag"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Search Results */}
        {query && (
          <div className="search-modal-results">
            {isLoading ? (
              <div className="search-modal-status">লোড হচ্ছে...</div>
            ) : filtered.length === 0 ? (
              <div className="search-modal-empty">
                <p>&ldquo;{query}&rdquo; এর সাথে কোনো সংবাদ মেলেনি</p>
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="search-modal-full-link"
                >
                  বিস্তারিত সার্চ পেজে খুঁজুন &rarr;
                </Link>
              </div>
            ) : (
              <div className="search-modal-list">
                {filtered.map((item) => (
                  <Link
                    key={item.id || item.slug}
                    href={`/news/${item.slug}`}
                    onClick={onClose}
                    className="search-modal-item"
                  >
                    {item.featured_image && (
                      <div className="search-modal-item-thumb">
                        <img src={item.featured_image} alt="" />
                      </div>
                    )}
                    <div className="search-modal-item-info">
                      <span className="search-modal-item-title">{item.title}</span>
                      <div className="search-modal-item-meta">
                        {item.category && (
                          <span className="search-modal-item-category">
                            {item.category.name_bn}
                          </span>
                        )}
                        <span className="search-modal-item-time">
                          <Clock size={11} />
                          {getTimeAgoBangla(item.published_at)}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="search-modal-item-arrow" />
                  </Link>
                ))}

                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="search-modal-view-all"
                >
                  সকল ফলাফল দেখুন ({filtered.length}+) &rarr;
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function getTimeAgoBangla(dateString: string): string {
  try {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} দিন আগে`;
    if (diffHours > 0) return `${diffHours} ঘণ্টা আগে`;
    return 'কিছুক্ষণ আগে';
  } catch {
    return 'আজ';
  }
}
