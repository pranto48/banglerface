import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '3rem 1rem' }}>
      <div style={{ fontSize: '5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1, marginBottom: '1rem' }}>
        ৪০৪
      </div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
        দুঃখিত! পৃষ্ঠাটি পাওয়া যায়নি
      </h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: '480px', marginBottom: '2rem', fontSize: '1rem' }}>
        আপনি যে সংবাদ বা পৃষ্ঠাটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ভুল লিংক প্রবেশ করেছেন।
      </p>
      <Link href="/" className="btn-login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        <Home size={18} />
        <span>মূল পাতায় ফিরে যান</span>
      </Link>
    </div>
  );
}
