'use client';

import React, { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="newsletter-input-post"
        placeholder="আপনার ইমেইল ঠিকানা দিন"
        required
        disabled={isSubmitted}
      />
      <button type="submit" className="newsletter-btn-post" disabled={isSubmitted}>
        {isSubmitted ? '✓ ধন্যবাদ!' : 'সাবস্ক্রাইব করুন'}
      </button>
      {isSubmitted && (
        <p style={{ marginTop: '8px', fontSize: '13px', fontWeight: 600, color: '#fff' }}>
          ✓ ধন্যবাদ! আপনি সফলভাবে নিউজলেটারে যুক্ত হয়েছেন।
        </p>
      )}
    </form>
  );
}
