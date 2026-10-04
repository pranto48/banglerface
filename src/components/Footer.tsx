import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="portal-footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo */}
          <div className="footer-logo">
            <Link href="/">বাংলার ফেস</Link>
          </div>

          <p className="footer-tagline">
            নির্ভরযোগ্য খবর বিশ্বস্ত মাধ্যম
          </p>

          {/* Editors & Publisher details */}
          <div className="footer-credits">
            <p>
              <strong>সম্পাদক:</strong> মো. রাকিব শেখ &nbsp;|&nbsp;{' '}
              <strong>প্রকাশক:</strong> মনজুরুল ইসলাম
            </p>
            <p>এলমহার্স্ট — নিউ ইয়র্ক (Elmhurst - New York)</p>
          </div>

          {/* Social Links */}
          <div className="footer-socials">
            <a
              href="https://www.facebook.com/profile.php?id=61592992778675"
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle"
              aria-label="Facebook"
              title="Facebook"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@banglarface"
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle"
              aria-label="YouTube"
              title="YouTube"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>

          {/* Partner Links */}
          <div style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <span style={{ fontWeight: 600 }}>আমাদের পার্টনার সাইট:</span>{' '}
            <a href="https://writerfair.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
              Writerfair
            </a>{' '}
            •{' '}
            <a href="https://bodhubor.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
              bodhubor
            </a>
          </div>

          {/* Futuristic Stack Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', padding: '0.4rem 0.85rem', background: 'var(--bg-main)', borderRadius: '20px', border: '1px solid var(--border-subtle)', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            <span>Powered by <strong>Next.js 15</strong></span>
            <span>•</span>
            <span><strong>Supabase</strong> PostgreSQL</span>
            <span>•</span>
            <span><strong>Cloudflare R2</strong></span>
            <span>•</span>
            <span>Hosted on <strong>Vercel</strong></span>
          </div>

          {/* Copyright */}
          <div className="footer-copyright">
            <p>
              &copy; {new Date().getFullYear()} <strong>বাংলার ফেস</strong> — সর্বস্বত্ব সংরক্ষিত
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
