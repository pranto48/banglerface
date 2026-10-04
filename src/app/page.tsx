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
  const internationalNews = articles.filter((a) => a.category?.slug === 'international');
  const entertainmentNews = articles.filter((a) => a.category?.slug === 'entertainment');
  const educationNews = articles.filter((a) => a.category?.slug === 'education');
  const editorialNews = articles.filter((a) => a.category?.slug === 'editorial');
  const politicsNews = articles.filter((a) => a.category?.slug === 'politics');
  const specialReportNews = articles.filter((a) => a.category?.slug === 'special-report');
  const sportsNews = articles.filter((a) => a.category?.slug === 'sports');

  // Side articles for hero lead section (excluding lead itself)
  const sideLeadArticles = articles
    .filter((a) => a.id !== leadArticle?.id)
    .slice(0, 5);

  return (
    <main className="home">
      <div className="home__wrap">
        {/* 1. TICKER */}
        <Ticker items={breakingItems} />

        {/* 2. LEAD / HERO SECTION */}
        <LeadSection leadArticle={leadArticle} sideArticles={sideLeadArticles} />

        {/* 3. COLUMNS WRAPPER (MAIN FEEDS + SIDEBAR) */}
        <div className="home__columns">
          <div className="home__main">
            {/* 1. বাংলাদেশ (BANGLADESH) */}
            <section className="home__section">
              <div className="section-heading">
                <h2 className="section-heading__title">বাংলাদেশ</h2>
                <Link href="/category/bangladesh" className="section-heading__more">
                  সব দেখুন
                  <ChevronRight size={15} />
                </Link>
              </div>

              <div className="split">
                {(bangladeshNews[0] ? [bangladeshNews[0]] : articles.slice(0, 1)).map((item) => (
                  <NewsCard key={item.id} article={item} variant="lg" showExcerpt />
                ))}

                <div>
                  {(bangladeshNews.length > 1 ? bangladeshNews.slice(1, 5) : articles.slice(1, 5)).map((item) => (
                    <NewsCard key={item.id} article={item} variant="item" showThumb />
                  ))}
                </div>
              </div>
            </section>

            {/* 2. অর্থনীতি (THE ECONOMY) */}
            <section className="home__section">
              <div className="section-heading">
                <h2 className="section-heading__title">অর্থনীতি</h2>
                <Link href="/category/the-economy" className="section-heading__more">
                  সব দেখুন
                  <ChevronRight size={15} />
                </Link>
              </div>

              <div className="grid grid--2 grid--md-4">
                {(economyNews.length >= 4 ? economyNews.slice(0, 4) : articles.slice(0, 4)).map((item) => (
                  <NewsCard key={item.id} article={item} variant="sm" />
                ))}
              </div>
            </section>

            {/* 3. সারাদেশে (THE WHOLE COUNTRY - SCROLLER) */}
            <section className="home__section">
              <div className="section-heading">
                <h2 className="section-heading__title">সারাদেশ</h2>
                <Link href="/category/the-whole-country" className="section-heading__more">
                  সব দেখুন
                  <ChevronRight size={15} />
                </Link>
              </div>

              <div className="scroller">
                {(countrywideNews.length > 0 ? countrywideNews : articles.slice(2, 7)).slice(0, 6).map((item) => (
                  <NewsCard key={item.id} article={item} variant="sm" />
                ))}
              </div>
            </section>

            {/* 4. আন্তর্জাতিক (INTERNATIONAL) */}
            <section className="home__section">
              <div className="section-heading">
                <h2 className="section-heading__title">আন্তর্জাতিক</h2>
                <Link href="/category/international" className="section-heading__more">
                  সব দেখুন
                  <ChevronRight size={15} />
                </Link>
              </div>

              <div className="grid grid--md-2">
                {(internationalNews[0] ? [internationalNews[0]] : articles.slice(3, 4)).map((item) => (
                  <NewsCard key={item.id} article={item} variant="md" showExcerpt />
                ))}

                <div>
                  {(internationalNews.length > 1 ? internationalNews.slice(1, 5) : articles.slice(0, 4)).map((item) => (
                    <NewsCard key={item.id} article={item} variant="item" showThumb={false} />
                  ))}
                </div>
              </div>
            </section>

            {/* 5. বিনোদন (ENTERTAINMENT) */}
            <section className="home__section">
              <div className="section-heading">
                <h2 className="section-heading__title">বিনোদন</h2>
                <Link href="/category/entertainment" className="section-heading__more">
                  সব দেখুন
                  <ChevronRight size={15} />
                </Link>
              </div>

              <div className="split">
                {(entertainmentNews[0] ? [entertainmentNews[0]] : articles.slice(1, 2)).map((item) => (
                  <NewsCard key={item.id} article={item} variant="lg" showExcerpt />
                ))}

                <div>
                  {(entertainmentNews.length > 1 ? entertainmentNews.slice(1, 5) : articles.slice(2, 6)).map((item) => (
                    <NewsCard key={item.id} article={item} variant="item" showThumb />
                  ))}
                </div>
              </div>
            </section>

            {/* 6. শিক্ষা (EDUCATION) */}
            <section className="home__section">
              <div className="section-heading">
                <h2 className="section-heading__title">শিক্ষা</h2>
                <Link href="/category/education" className="section-heading__more">
                  সব দেখুন
                  <ChevronRight size={15} />
                </Link>
              </div>

              <div className="grid grid--2 grid--md-4">
                {(educationNews.length >= 4 ? educationNews.slice(0, 4) : articles.slice(1, 5)).map((item) => (
                  <NewsCard key={item.id} article={item} variant="sm" />
                ))}
              </div>
            </section>

            {/* 7. সম্পাদকীয় (EDITORIAL - SCROLLER) */}
            <section className="home__section">
              <div className="section-heading">
                <h2 className="section-heading__title">সম্পাদকীয়</h2>
                <Link href="/category/editorial" className="section-heading__more">
                  সব দেখুন
                  <ChevronRight size={15} />
                </Link>
              </div>

              <div className="scroller">
                {(editorialNews.length > 0 ? editorialNews : articles.slice(3, 7)).slice(0, 5).map((item) => (
                  <NewsCard key={item.id} article={item} variant="sm" />
                ))}
              </div>
            </section>

            {/* 8. রাজনীতি (POLITICS) */}
            <section className="home__section">
              <div className="section-heading">
                <h2 className="section-heading__title">রাজনীতি</h2>
                <Link href="/category/politics" className="section-heading__more">
                  সব দেখুন
                  <ChevronRight size={15} />
                </Link>
              </div>

              <div className="grid grid--md-2">
                {(politicsNews[0] ? [politicsNews[0]] : articles.slice(4, 5)).map((item) => (
                  <NewsCard key={item.id} article={item} variant="md" showExcerpt />
                ))}

                <div>
                  {(politicsNews.length > 1 ? politicsNews.slice(1, 5) : articles.slice(2, 6)).map((item) => (
                    <NewsCard key={item.id} article={item} variant="item" showThumb={false} />
                  ))}
                </div>
              </div>
            </section>

            {/* 9. বিশেষ প্রতিবেদন (SPECIAL REPORT) */}
            <section className="home__section">
              <div className="section-heading">
                <h2 className="section-heading__title">বিশেষ প্রতিবেদন</h2>
                <Link href="/category/special-report" className="section-heading__more">
                  সব দেখুন
                  <ChevronRight size={15} />
                </Link>
              </div>

              <div className="split">
                {(specialReportNews[0] ? [specialReportNews[0]] : articles.slice(0, 1)).map((item) => (
                  <NewsCard key={item.id} article={item} variant="lg" showExcerpt />
                ))}

                <div>
                  {(specialReportNews.length > 1 ? specialReportNews.slice(1, 5) : articles.slice(3, 7)).map((item) => (
                    <NewsCard key={item.id} article={item} variant="item" showThumb />
                  ))}
                </div>
              </div>
            </section>

            {/* 10. খেলা (SPORTS) */}
            <section className="home__section">
              <div className="section-heading">
                <h2 className="section-heading__title">খেলা</h2>
                <Link href="/category/sports" className="section-heading__more">
                  সব দেখুন
                  <ChevronRight size={15} />
                </Link>
              </div>

              <div className="grid grid--2 grid--md-4">
                {(sportsNews.length >= 4 ? sportsNews.slice(0, 4) : articles.slice(0, 4)).map((item) => (
                  <NewsCard key={item.id} article={item} variant="sm" />
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <Sidebar categories={categories} />
        </div>
      </div>
    </main>
  );
}
