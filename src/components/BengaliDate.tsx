'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function BengaliDate() {
  const [dateStr, setDateStr] = useState<string>('');
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const weekdays = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
      const monthsBn = [
        'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
        'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
      ];

      const weekday = weekdays[now.getDay()];
      const day = toBanglaNumber(now.getDate());
      const month = monthsBn[now.getMonth()];
      const year = toBanglaNumber(now.getFullYear());

      // Format time
      let hours = now.getHours();
      const minutes = toBanglaNumber(now.getMinutes().toString().padStart(2, '0'));
      const ampm = hours >= 12 ? 'অপরাহ্ন' : 'পূর্বাহ্ন';
      hours = hours % 12 || 12;
      const hoursBn = toBanglaNumber(hours);

      setDateStr(`${weekday}, ${day} ${month} ${year}`);
      setTimeStr(`${hoursBn}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!dateStr) {
    return (
      <div className="header-date-bar-placeholder">
        <span>ঢাকা • রবিবার, ৪ অক্টোবর ২০২৬</span>
      </div>
    );
  }

  return (
    <div className="header-date-bar">
      <div className="header-date-inner">
        <div className="header-date-item">
          <MapPin size={13} className="header-date-icon" />
          <span>ঢাকা, বাংলাদেশ</span>
        </div>
        <span className="header-date-divider">•</span>
        <div className="header-date-item">
          <Calendar size={13} className="header-date-icon" />
          <span>{dateStr}</span>
        </div>
        <span className="header-date-divider">•</span>
        <div className="header-date-item header-date-time">
          <Clock size={13} className="header-date-icon" />
          <span>{timeStr}</span>
        </div>
        <span className="header-date-edition">বাংলাদেশ সংস্করণ</span>
      </div>
    </div>
  );
}

function toBanglaNumber(num: number | string): string {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => banglaDigits[parseInt(d, 10)] || d);
}
