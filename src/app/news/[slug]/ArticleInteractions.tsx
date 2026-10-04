'use client';

import React, { useState, useEffect } from 'react';
import { Share2, Bookmark, Volume2, Check } from 'lucide-react';
import { Article } from '@/lib/types';

interface ArticleInteractionsProps {
  article: Article;
}

export default function ArticleInteractions({ article }: ArticleInteractionsProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isReading, setIsReading] = useState(false);

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
      setTimeout(() => setIsCopied(false), 2000);
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

    const textToRead = `${article.title}. ${article.excerpt}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'bn-BD';
    utterance.rate = 0.95;

    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);

    window.speechSynthesis.speak(utterance);
    setIsReading(true);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
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

      {/* Bookmark */}
      <button
        type="button"
        onClick={toggleBookmark}
        className="btn-icon"
        style={{ color: isBookmarked ? 'var(--primary)' : 'currentColor' }}
        title={isBookmarked ? 'বুকমার্ক সরান' : 'বুকমার্ক করুন'}
      >
        <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
      </button>

      {/* Share */}
      <button
        type="button"
        onClick={handleShare}
        className="btn-icon"
        title="লিংক কপি বা শেয়ার করুন"
      >
        {isCopied ? <Check size={18} color="#10b981" /> : <Share2 size={18} />}
      </button>
    </div>
  );
}
