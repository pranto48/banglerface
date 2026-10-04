'use client';

import React from 'react';
import Link from 'next/link';

interface TickerProps {
  items: string[];
}

export default function Ticker({ items }: TickerProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="ticker-section" aria-label="সর্বশেষ সংবাদ">
      <div className="ticker-badge">
        <span className="pulsing-dot" aria-hidden="true" />
        <span>সর্বশেষ</span>
      </div>

      <div className="ticker-track">
        <div className="ticker-text">
          {items.concat(items).map((item, idx) => (
            <span key={idx} className="ticker-headline">
              <span>{item}</span>
              <span style={{ color: 'var(--primary)', opacity: 0.7 }}>•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
