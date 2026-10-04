'use client';

import React, { useState, useEffect } from 'react';
import { Share2, Bookmark, Volume2, Check, Printer } from 'lucide-react';
import { Article } from '@/lib/types';

interface ArticleInteractionsProps {
  article: Article;
}

export default function ArticleInteractions({ article }: ArticleInteractionsProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [fontSize, setFontSize] = useState(18);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('banglarface_bookmarks');
      if (stored) {
        const list: Article[] = JSON.parse(stored);
        setIsBookmarked(list.some((a) => a.id === article.id || a.slug === article.slug));
      }
    } catch {
      // safe fallback
    }
  }, [article]);

  const toggleBookmark = () => {
    try {
      const stored = localStorage.getItem('banglarface_bookmarks');
      let list: Article[] = stored ? JSON.parse(stored) : [];

      if (isBookmarked) {
        list = list.filter((a) => a.slug !== article.slug);
        setIsBookmarked(false);
      } else {
        list.push(article);
        setIsBookmarked(true);
      }
      localStorage.setItem('banglarface_bookmarks', JSON.stringify(list));
    } catch {
      setIsBookmarked(!isBookmarked);
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
        return;
      } catch {
        // user cancelled or fallback
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleTextToSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('আপনার ব্রাউজারে অডিও রিডার সমর্থিত নয়।');
      return;
    }

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const textToRead = `${article.title}. ${article.excerpt || ''}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'bn-BD';
    utterance.rate = 0.95;

    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);

    window.speechSynthesis.speak(utterance);
    setIsReading(true);
  };

  const changeFontSize = (delta: number) => {
    const newSize = Math.min(Math.max(fontSize + delta, 15), 24);
    setFontSize(newSize);
    const contentEl = document.querySelector('.article-content-post') as HTMLElement | null;
    if (contentEl) {
      contentEl.style.fontSize = `${newSize}px`;
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', position: 'relative' }}>
      {/* Audio Reader */}
      <button
        type="button"
        onClick={handleTextToSpeech}
        className="btn-icon"
        style={{ width: 'auto', padding: '0 0.75rem', gap: '0.35rem', fontSize: '0.85rem' }}
        title={isReading ? 'পড়া বন্ধ করুন' : 'নিউজ শুনুন'}
      >
        <Volume2 size={16} color={isReading ? 'var(--primary)' : 'currentColor'} />
        <span>{isReading ? 'বন্ধ করুন' : 'শুনুন'}</span>
      </button>

      {/* Font Size Adjusters */}
      <div className="font-size-control-group">
        <button
          type="button"
          onClick={() => changeFontSize(-1)}
          className="btn-font-size"
          title="অক্ষর ছোট করুন"
          aria-label="অক্ষর ছোট করুন"
        >
          A-
        </button>
        <button
          type="button"
          onClick={() => changeFontSize(1)}
          className="btn-font-size"
          title="অক্ষর বড় করুন"
          aria-label="অক্ষর বড় করুন"
        >
          A+
        </button>
      </div>

      {/* Bookmark */}
      <button
        type="button"
        onClick={toggleBookmark}
        className="btn-icon"
        style={{ color: isBookmarked ? 'var(--primary)' : 'currentColor' }}
        title={isBookmarked ? 'বুকমার্ক সরান' : 'বুকমার্ক করুন'}
        aria-label="বুকমার্ক"
      >
        <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
      </button>

      {/* Share / Copy */}
      <button
        type="button"
        onClick={handleShare}
        className="btn-icon"
        title="লিংক কপি বা শেয়ার করুন"
        aria-label="লিংক কপি বা শেয়ার"
      >
        {isCopied ? <Check size={18} color="#10b981" /> : <Share2 size={18} />}
      </button>

      {/* Print */}
      <button
        type="button"
        onClick={() => typeof window !== 'undefined' && window.print()}
        className="btn-icon print-hide"
        title="প্রিন্ট করুন"
        aria-label="প্রিন্ট"
      >
        <Printer size={18} />
      </button>

      {/* Floating Toast Notification */}
      {isCopied && (
        <div className="share-toast">
          ✓ লিংক কপি হয়েছে!
        </div>
      )}
    </div>
  );
}
