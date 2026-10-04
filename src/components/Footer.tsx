import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-section">
        {/* Logo & Site Name */}
        <div className="footer-block text-center">
          <Link href="/" className="d-inline-block mb-2">
            <img
              src="https://banglarface.com/uploads/settings/logo_1786447333_6a7b05e546bbe.png"
              alt="বাংলার ফেস"
              className="footer-logo"
            />
          </Link>

          <p className="footer-tagline">
            নির্ভরযোগ্য খবর বিশ্বস্ত মাধ্যম
          </p>

          <div style={{ marginTop: '10px', fontSize: '13.5px', color: 'var(--pa-muted)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div>
              <strong>Editor:</strong> Md. Rakib Sheikh &nbsp;|&nbsp;{' '}
              <strong>Publisher:</strong> Monjurul Islam
            </div>
            <div>Elmhurst - New York</div>
          </div>
        </div>

        {/* Social Links */}
        <div className="footer-block text-center">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <a
              href="https://www.facebook.com/profile.php?id=61592992778675"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-footer social-facebook"
              title="Facebook"
              aria-label="Facebook"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@banglarface"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-footer social-youtube"
              title="YouTube"
              aria-label="YouTube"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Partner Links */}
        <div className="footer-block footer-block-plain text-center">
          <p className="footer-heading">আমাদের পার্টনার সাইট</p>
          <p className="footer-partners">
            <a
              href="https://writerfair.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--pa-muted)', textDecoration: 'none' }}
            >
              Writerfair
            </a>{' '}
            <span style={{ margin: '0 8px' }}>•</span>{' '}
            <a
              href="https://bodhubor.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--pa-muted)', textDecoration: 'none' }}
            >
              bodhubor
            </a>
          </p>
        </div>



        {/* Copyright */}
        <div className="text-center">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} <strong>বাংলার ফেস</strong> - সর্বস্বত্ব সংরক্ষিত
          </p>
        </div>
      </div>
    </footer>
  );
}
