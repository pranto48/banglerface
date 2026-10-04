import React from 'react';
import AdminStudioClient from './AdminStudioClient';
import { getCategories, getArticles } from '@/lib/api';

export default async function AdminPage() {
  const [categories, articles] = await Promise.all([
    getCategories(),
    getArticles(),
  ]);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <AdminStudioClient categories={categories} initialArticles={articles} />
    </div>
  );
}
