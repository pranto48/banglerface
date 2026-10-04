import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Ticker from '@/components/Ticker';
import LeadSection from '@/components/LeadSection';
import NewsCard from '@/components/NewsCard';
import Sidebar from '@/components/Sidebar';
import { getArticles, getCategories, getBreakingNews, getLeadArticle } from '@/lib/api';

export default async function HomePage() {
  const [categories, articles, breakingItems, leadArticle] = await Promise.all([
    getCategories(),
    getArticles(),
    getBreakingNews(),
    getLeadArticle(),
  ]);

  // Group articles by categories
  const bangladeshNews = articles.filter((a) => a.category?.slug === 'bangladesh');
  const economyNews = articles.filter((a) => a.category?.slug === 'the-economy');
  const countrywideNews = articles.filter((a) => a.category?.slug === 'the-whole-country');
  const politicsNews = articles.filter((a) => a.category?.slug === 'politics');
  const editorialNews = articles.filter((a) => a.category?.slug === 'editorial');
  const specialReportNews = articles.filter((a) => a.category?.slug === 'special-report');
  const sportsNews = articles.filter((a) => a.category?.slug === 'sports');

  // Side articles for hero lead section (excluding lead itself)
  const sideLeadArticles = articles
    .filter((a) => a.id !== leadArticle?.id)
    .slice(0, 5);

  return (
    <div className="container" style={{ paddingTop: '0.35rem' }}>
      {/* 1. BREAKING NEWS TICKER */}
      <Ticker items={breakingItems} />

      {/* 2. LEAD / HERO SECTION */}
      <LeadSection leadArticle={leadArticle} sideArticles={sideLeadArticles} />

      {/* 3. MAIN CONTENT COLUMNS + SIDEBAR */}
      <div className="portal-layout">
        {/* Main Content Feeds */}
        <div className="feed-sections" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* SECTION: বাংলাদেশ (BANGLADESH) */}
          <section style={{ contentVisibility: 'auto', containIntrinsicSize: '300px' }}>
            <div className="section-header">
              <h2 className="section-title">বাংলাদেশ</h2>
              <Link href="/category/bangladesh" className="section-more-link">
                <span>সব দেখুন</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {bangladeshNews.slice(0, 1).map((item) => (
                <div key={item.id}>
                  <NewsCard article={item} showExcerpt />
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {(bangladeshNews.length > 1 ? bangladeshNews.slice(1, 4) : articles.slice(2, 5)).map((item) => (
                  <NewsCard key={item.id} article={item} variant="horizontal" />
                ))}
              </div>
            </div>
          </section>

          {/* SECTION: অর্থনীতি (ECONOMY) */}
          <section style={{ contentVisibility: 'auto', containIntrinsicSize: '300px' }}>
            <div className="section-header">
              <h2 className="section-title">অর্থনীতি</h2>
              <Link href="/category/the-economy" className="section-more-link">
                <span>সব দেখুন</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid-4">
              {(economyNews.length > 0 ? economyNews : articles.slice(0, 4)).map((item) => (
                <NewsCard key={item.id} article={item} />
              ))}
            </div>
          </section>

          {/* SECTION: সারাদেশে (COUNTRYWIDE SCROLLER) */}
          <section style={{ contentVisibility: 'auto', containIntrinsicSize: '260px' }}>
            <div className="section-header">
              <h2 className="section-title">সারাদেশ</h2>
              <Link href="/category/the-whole-country" className="section-more-link">
                <span>সব দেখুন</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="scroller-wrapper">
              {(countrywideNews.length > 0 ? countrywideNews.concat(articles) : articles)
                .slice(0, 6)
                .map((item, idx) => (
                  <div key={idx} className="scroller-item">
                    <NewsCard article={item} />
                  </div>
                ))}
            </div>
          </section>

          {/* SECTION: রাজনীতি ও সম্পাদকীয় (POLITICS & EDITORIAL) */}
          <section style={{ contentVisibility: 'auto', containIntrinsicSize: '300px' }}>
            <div className="section-header">
              <h2 className="section-title">সম্পাদকীয় ও মতামত</h2>
              <Link href="/category/editorial" className="section-more-link">
                <span>সব দেখুন</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {(editorialNews.length > 0 ? editorialNews : articles.slice(3, 5)).map((item) => (
                <NewsCard key={item.id} article={item} showExcerpt />
              ))}
            </div>
          </section>

          {/* SECTION: বিশেষ প্রতিবেদন (SPECIAL REPORT) */}
          <section style={{ contentVisibility: 'auto', containIntrinsicSize: '300px' }}>
            <div className="section-header">
              <h2 className="section-title">বিশেষ প্রতিবেদন</h2>
              <Link href="/category/special-report" className="section-more-link">
                <span>সব দেখুন</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {specialReportNews.slice(0, 1).map((item) => (
                <NewsCard key={item.id} article={item} showExcerpt />
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {(specialReportNews.length > 1 ? specialReportNews.slice(1, 4) : articles.slice(4, 7)).map((item) => (
                  <NewsCard key={item.id} article={item} variant="horizontal" />
                ))}
              </div>
            </div>
          </section>

          {/* SECTION: খেলাধুলা (SPORTS) */}
          <section style={{ contentVisibility: 'auto', containIntrinsicSize: '300px' }}>
            <div className="section-header">
              <h2 className="section-title">খেলা</h2>
              <Link href="/category/sports" className="section-more-link">
                <span>সব দেখুন</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid-4">
              {(sportsNews.length > 0 ? sportsNews : articles.slice(1, 5)).map((item) => (
                <NewsCard key={item.id} article={item} />
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <Sidebar categories={categories} />
      </div>
    </div>
  );
}
