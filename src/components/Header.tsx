'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, Moon, Sun, Menu, X, Globe, Bookmark, Home, LayoutGrid } from 'lucide-react';
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
        <div className="top-bar-content">
          {/* Exact BanglarFace Logo */}
          <NextLink href="/" className="top-bar-brand" aria-label="বাংলার ফেস">
            <img
              src="https://banglarface.com/uploads/settings/logo_1786447333_6a7b05e546bbe.png"
              alt="বাংলার ফেস"
              className="logo"
            />
          </NextLink>

          {/* User Menu & Search */}
          <nav className="top-bar-actions" aria-label="ইউজার মেনু">
            <NextLink href="/search" aria-label="খুঁজুন" title="খুঁজুন">
              <Search size={20} />
            </NextLink>

            <button
              type="button"
              onClick={toggleTheme}
              className="btn-theme"
              title={theme === 'dark' ? 'লাইট মোড' : 'ডার্ক মোড'}
              aria-label="থিম"
            >
              {theme === 'dark' ? <Sun size={19} color="#f59e0b" /> : <Moon size={19} />}
            </button>

            <NextLink href="/bookmarks" title="বুকমার্ক" aria-label="বুকমার্ক">
              <Bookmark size={20} />
            </NextLink>

            <NextLink href="/admin" title="লগইন">
              <User size={20} />
              <span>লগইন</span>
            </NextLink>
          </nav>
        </div>
      </header>

      {/* 2. NAV BAR (Horizontal Categories) */}
      <nav className="nav-bar" aria-label="প্রধান মেনু">
        <div className="nav-bar-content">
          <ul className="nav-items">
            <li className="nav-item">
              <NextLink
                href="/"
                className={`nav-link ${pathname === '/' ? 'active' : ''}`}
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
                  <li key={cat.id || cat.slug} className="nav-item">
                    <NextLink href={href} className={`nav-link ${isActive ? 'active' : ''}`}>
                      {cat.name_bn}
                    </NextLink>
                  </li>
                );
              })}
          </ul>

          <div className="nav-controls">
            <NextLink href="/lang/en" className="lang-icon-btn" title="English" aria-label="English">
              <Globe size={18} />
            </NextLink>

            <button
              type="button"
              className="hamburger-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              title="মেনু"
              aria-label="মেনু"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* 3. FULL SCREEN MENU DRAWER */}
        {isMobileMenuOpen && (
          <div className="fullscreen-menu" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="menu-content" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                <img
                  src="https://banglarface.com/uploads/settings/logo_1786447333_6a7b05e546bbe.png"
                  alt="বাংলার ফেস"
                  style={{ height: '34px', width: 'auto' }}
                />
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ color: 'var(--text-main)', padding: '4px' }}
                >
                  <X size={22} />
                </button>
              </div>

              <NextLink
                href="/"
                className="menu-link"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ fontWeight: 700, color: pathname === '/' ? 'var(--primary)' : 'inherit' }}
              >
                সর্বশেষ
              </NextLink>

              <div className="menu-divider">ক্যাটাগরি</div>

              {categories
                .filter((c) => c.slug !== 'latest')
                .map((cat) => (
                  <NextLink
                    key={cat.id || cat.slug}
                    href={`/category/${cat.slug}`}
                    className="menu-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      color: pathname === `/category/${cat.slug}` ? 'var(--primary)' : 'inherit',
                      fontWeight: pathname === `/category/${cat.slug}` ? 700 : 500,
                    }}
                  >
                    {cat.name_bn}
                  </NextLink>
                ))}

              <div className="menu-divider">অন্যান্য</div>

              <NextLink
                href="/search"
                className="menu-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                সার্চ
              </NextLink>

              <NextLink
                href="/admin"
                className="menu-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                পোস্ট পাবলিশার (CMS)
              </NextLink>
            </div>
          </div>
        )}
      </nav>

      {/* 4. MOBILE BOTTOM BAR */}
      <nav className="mobile-bottom-bar" aria-label="মোবাইল বার">
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
          <span>সার্চ</span>
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
