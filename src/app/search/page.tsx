import React, { Suspense } from 'react';
import SearchClient from './SearchClient';
import { getCategories, getArticles } from '@/lib/api';

export default async function SearchPage() {
  const [categories, articles] = await Promise.all([
    getCategories(),
    getArticles(),
  ]);

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '3rem' }}>খোঁজা হচ্ছে...</div>}>
        <SearchClient categories={categories} initialArticles={articles} />
      </Suspense>
    </div>
  );
}
