'use client';

import React from 'react';
import Link from 'next/link';
import { Globe } from 'lucide-react';

interface TickerProps {
  items: string[];
}

export default function Ticker({ items }: TickerProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="ticker" aria-label="সর্বশেষ সংবাদ">
      <span className="ticker__label">
        <span className="ticker__dot" aria-hidden="true" />
        সর্বশেষ
      </span>

      <div className="ticker__track">
        <div className="ticker__strip">
          <div className="ticker__half">
            {items.map((item, idx) => (
              <span key={`first-${idx}`} className="ticker__item">
                <span>{item}</span>
                <Globe size={13} style={{ opacity: 0.65, marginLeft: '4px' }} />
              </span>
            ))}
          </div>
          <div className="ticker__half" aria-hidden="true">
            {items.map((item, idx) => (
              <span key={`second-${idx}`} className="ticker__item">
                <span>{item}</span>
                <Globe size={13} style={{ opacity: 0.65, marginLeft: '4px' }} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
