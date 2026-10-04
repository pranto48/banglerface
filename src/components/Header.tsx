'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, Moon, Sun, Menu, X, Globe, Bookmark, PlusCircle, Home, LayoutGrid } from 'lucide-react';
import { Category } from '@/lib/types';

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('banglarface_theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('banglarface_theme', nextTheme);
  };

  return (
    <>
      {/* 1. TOP BAR */}
      <header className="top-bar">
        <div className="container">
          <div className="top-bar-inner">
            {/* Brand Logo & Tagline */}
            <NextLink href="/" className="brand-wrapper">
              <div className="brand-logo-badge">
                <span>বা</span>
              </div>
              <div className="brand-text-col">
                <span className="brand-title">বাংলার ফেস</span>
                <span className="brand-tagline">নির্ভরযোগ্য খবর বিশ্বস্ত মাধ্যম</span>
              </div>
            </NextLink>

            {/* Header Right Actions */}
            <div className="header-actions">
              {/* Quick Search */}
              <NextLink href="/search" className="btn-icon" aria-label="খুঁজুন" title="খুঁজুন">
                <Search size={18} />
              </NextLink>

              {/* Bookmarks */}
              <NextLink href="/bookmarks" className="btn-icon" aria-label="বুকমার্ক" title="সংরক্ষিত সংবাদ">
                <Bookmark size={18} />
              </NextLink>

              {/* Dark/Light Mode Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="btn-icon"
                aria-label="থিম পরিবর্তন"
                title={theme === 'dark' ? 'লাইট মোড চালু করুন' : 'ডার্ক মোড চালু করুন'}
              >
                {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} />}
              </button>

              {/* CMS Admin Link */}
              <NextLink href="/admin" className="btn-icon" aria-label="সংবাদ প্রকাশ" title="সংবাদ প্রকাশ করুন">
                <PlusCircle size={18} color="#ef4444" />
              </NextLink>

              {/* Login / Auth */}
              <NextLink href="/admin" className="btn-login" title="লগইন / ড্যাশবোর্ড">
                <User size={16} />
                <span>লগইন</span>
              </NextLink>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="btn-icon mobile-menu-btn"
                aria-label="মেনু খুলুন"
                title="মেনু"
              >
                <Menu size={19} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. CATEGORY NAVIGATION BAR */}
      <nav className="category-nav" aria-label="প্রধান মেনু">
        <div className="container">
          <div className="category-nav-inner">
            <ul className="nav-links">
              <li>
                <NextLink
                  href="/"
                  className={`nav-link-item ${pathname === '/' ? 'active' : ''}`}
                >
                  সর্বশেষ
                </NextLink>
              </li>
              {categories
                .filter((c) => c.slug !== 'latest')
                .map((cat) => {
                  const href = `/category/${cat.slug}`;
                  const isActive = pathname === href;
                  return (
                    <li key={cat.id || cat.slug}>
                      <NextLink href={href} className={`nav-link-item ${isActive ? 'active' : ''}`}>
                        {cat.name_bn}
                      </NextLink>
                    </li>
                  );
                })}
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', paddingLeft: '0.75rem' }}>
              <NextLink
                href="/lang/en"
                className="btn-icon"
                style={{ width: '32px', height: '32px' }}
                title="English Version"
                aria-label="English"
              >
                <Globe size={15} />
              </NextLink>
            </div>
          </div>
        </div>
      </nav>

      {/* 3. MOBILE FULLSCREEN DRAWER */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className="brand-logo-badge" style={{ width: '32px', height: '32px', fontSize: '1.1rem' }}>
                  বা
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  বাংলার ফেস
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-icon"
                aria-label="মেনু বন্ধ করুন"
              >
                <X size={19} />
              </button>
            </div>

            <NextLink
              href="/search"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.7rem 0.85rem',
                background: 'var(--bg-main)',
                borderRadius: '10px',
                marginBottom: '1rem',
                color: 'var(--text-sub)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.92rem',
              }}
            >
              <Search size={17} color="var(--primary)" />
              <span>সংবাদ খুঁজুন...</span>
            </NextLink>

            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              ক্যাটাগরিসমূহ
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', overflowY: 'auto' }}>
              <NextLink
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  padding: '0.65rem 0.75rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.98rem',
                  color: pathname === '/' ? 'var(--primary)' : 'var(--text-main)',
                  background: pathname === '/' ? 'var(--primary-subtle)' : 'transparent',
                }}
              >
                সর্বশেষ
              </NextLink>
              {categories
                .filter((c) => c.slug !== 'latest')
                .map((cat) => (
                  <NextLink
                    key={cat.id || cat.slug}
                    href={`/category/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      padding: '0.65rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '0.98rem',
                      fontWeight: pathname === `/category/${cat.slug}` ? 700 : 500,
                      color: pathname === `/category/${cat.slug}` ? 'var(--primary)' : 'var(--text-main)',
                      background: pathname === `/category/${cat.slug}` ? 'var(--primary-subtle)' : 'transparent',
                    }}
                  >
                    {cat.name_bn}
                  </NextLink>
                ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <NextLink
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-login"
                style={{ justifyContent: 'center', padding: '0.75rem' }}
              >
                <PlusCircle size={18} />
                <span>সংবাদ পোস্ট করুন (CMS)</span>
              </NextLink>
            </div>
          </div>
        </div>
      )}

      {/* 4. MOBILE BOTTOM BAR (Thumb-friendly navigation on phones) */}
      <nav className="mobile-bottom-bar" aria-label="মোবাইল নেভিগেশন">
        <NextLink href="/" className={`bottom-bar-item ${pathname === '/' ? 'active' : ''}`}>
          <Home size={19} />
          <span>মূলপাতা</span>
        </NextLink>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="bottom-bar-item"
        >
          <LayoutGrid size={19} />
          <span>বিভাগ</span>
        </button>

        <NextLink href="/search" className={`bottom-bar-item ${pathname === '/search' ? 'active' : ''}`}>
          <Search size={19} />
          <span>অনুসন্ধান</span>
        </NextLink>

        <NextLink href="/bookmarks" className={`bottom-bar-item ${pathname === '/bookmarks' ? 'active' : ''}`}>
          <Bookmark size={19} />
          <span>বুকমার্ক</span>
        </NextLink>

        <button
          type="button"
          onClick={toggleTheme}
          className="bottom-bar-item"
          aria-label="থিম"
        >
          {theme === 'dark' ? <Sun size={19} color="#f59e0b" /> : <Moon size={19} />}
          <span>থিম</span>
        </button>
      </nav>
    </>
  );
}
