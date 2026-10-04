'use client';

import React, { useState } from 'react';
import { Cloud, Database, Upload, CheckCircle, AlertCircle, Sparkles, FileText, Image as ImageIcon } from 'lucide-react';
import { Category, Article } from '@/lib/types';

interface AdminStudioProps {
  categories: Category[];
  initialArticles: Article[];
}

export default function AdminStudioClient({ categories, initialArticles }: AdminStudioProps) {
  const [articlesList, setArticlesList] = useState<Article[]>(initialArticles);
  
  // Form State
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('বাংলার ফেস ডেস্ক');
  const [isLead, setIsLead] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const [tagsInput, setTagsInput] = useState('');
  
  // Media Upload State (Cloudflare R2)
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Submission State (Supabase)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('Cloudflare R2 এ আপলোড হচ্ছে...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFeaturedImageUrl(data.url);
        setUploadStatus(
          data.isConfigured
            ? 'সফলভাবে Cloudflare R2 বাকেটে আপলোড সম্পন্ন হয়েছে!'
            : 'ডেমো মোডে আপলোড সম্পন্ন (R2 ক্রেডেনশিয়াল দিলে সরাসরি বাকেটে জমা হবে)।'
        );
      } else {
        setUploadStatus(`আপলোড ব্যর্থ: ${data.error || 'অজানা ত্রুটি'}`);
      }
    } catch (err: unknown) {
      const error = err as Error;
      setUploadStatus(`আপলোড ব্যর্থ: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setSubmissionMessage({ type: 'error', text: 'অনুগ্রহ করে শিরোনাম এবং মূল সংবাদ বিবরণ পূরণ করুন।' });
      return;
    }

    setIsSubmitting(true);
    setSubmissionMessage(null);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          excerpt: excerpt || title,
          content: `<p>${content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>')}</p>`,
          featured_image: featuredImageUrl || 'https://banglarface.com/uploads/settings/logo_1786447333_6a7b05e546bbe.png',
          category_id: categoryId,
          is_lead: isLead,
          is_breaking: isBreaking,
          author_name: authorName,
          tags,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmissionMessage({
          type: 'success',
          text: 'সংবাদটি সফলভাবে Supabase ডাটাবেজে প্রকাশিত হয়েছে!',
        });
        setArticlesList([data.article, ...articlesList]);

        // Reset form
        setTitle('');
        setExcerpt('');
        setContent('');
        setFeaturedImageUrl('');
        setIsLead(false);
        setIsBreaking(false);
        setTagsInput('');
      } else {
        setSubmissionMessage({
          type: 'error',
          text: data.error || 'প্রকাশনা ব্যর্থ হয়েছে।',
        });
      }
    } catch (err: unknown) {
      const error = err as Error;
      setSubmissionMessage({ type: 'error', text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Studio Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.75rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
            <Sparkles size={16} />
            <span>বাংলার ফেস — ফিউচারিস্টিক সিএমএস স্টুডিও</span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
            নিউজ পাবলিশিং ও মিডিয়া ম্যানেজার
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            সরাসরি <strong>Supabase</strong> ডাটাবেজে ডাটা সংরক্ষণ এবং <strong>Cloudflare R2</strong> এ মিডিয়া আপলোড করুন
          </p>
        </div>

        {/* Integration Status Badges */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', padding: '0.5rem 0.85rem', borderRadius: '10px', fontSize: '0.85rem' }}>
            <Database size={16} color="#10b981" />
            <span>Supabase: <strong>রেডি</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', padding: '0.5rem 0.85rem', borderRadius: '10px', fontSize: '0.85rem' }}>
            <Cloud size={16} color="#38bdf8" />
            <span>Cloudflare R2: <strong>কানেক্টেড</strong></span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Editor Form */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={20} color="var(--primary)" />
            <span>নতুন সংবাদ রচনা করুন</span>
          </h2>

          {submissionMessage && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                fontSize: '0.95rem',
                background: submissionMessage.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: `1px solid ${submissionMessage.type === 'success' ? '#10b981' : '#ef4444'}`,
                color: submissionMessage.type === 'success' ? '#10b981' : '#ef4444',
              }}
            >
              {submissionMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              <span>{submissionMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Title */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                সংবাদের শিরোনাম *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="যেমন: বঙ্গোপসাগরে অর্থনৈতিক সম্ভাবনা নিয়ে সেমিনার..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-main)',
                  fontSize: '1rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            {/* Category & Author */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                  ক্যাটাগরি
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-main)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                >
                  {categories.map((c) => (
                    <option key={c.id || c.slug} value={c.id}>
                      {c.name_bn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                  প্রতিবেদক / লেখক
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-main)',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                সংক্ষিপ্ত সারাংশ (Excerpt)
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="সংবাদের মূল আকর্ষণ বা প্রথম দুই লাইন..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Full Content */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                সম্পূর্ণ সংবাদ বিবরণ *
              </label>
              <textarea
                rows={6}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="বিস্তারিত সংবাদ লিখুন..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-main)',
                  fontSize: '1rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Toggles */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', padding: '0.75rem', background: 'var(--bg-main)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 500 }}>
                <input
                  type="checkbox"
                  checked={isLead}
                  onChange={(e) => setIsLead(e.target.checked)}
                />
                <span>লিড হিরো সংবাদ (Lead Story)</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 500 }}>
                <input
                  type="checkbox"
                  checked={isBreaking}
                  onChange={(e) => setIsBreaking(e.target.checked)}
                />
                <span>ব্রেকিং নিউজ টিকার (Breaking Ticker)</span>
              </label>
            </div>

            {/* Tags */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                ট্যাগসমূহ (কমা দিয়ে আলাদা করুন)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="বাংলাদেশ, বাণিজ্য, অর্থনীতি, প্রযুক্তি"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-login"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '0.85rem',
                fontSize: '1.05rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? 'Supabase এ সেভ হচ্ছে...' : 'সংবাদ প্রকাশ করুন'}
            </button>
          </form>
        </div>

        {/* Cloudflare R2 Media Box & Published List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Cloudflare R2 Upload Box */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cloud size={20} color="#38bdf8" />
              <span>Cloudflare R2 মিডিয়া স্টোরেজ</span>
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              আপনার সংবাদের জন্য ছবি আপলোড করুন। ছবি সরাসরি Cloudflare R2 অবজেক্ট স্টোরেজে হোস্ট হবে।
            </p>

            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem 1.5rem',
                border: '2px dashed var(--border-hover)',
                borderRadius: '12px',
                cursor: 'pointer',
                background: 'var(--bg-main)',
                transition: 'all 0.2s ease',
              }}
            >
              <Upload size={32} color="var(--primary)" style={{ marginBottom: '0.75rem' }} />
              <span style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                {isUploading ? 'আপলোড হচ্ছে...' : 'ছবি নির্বাচন করতে ক্লিক করুন'}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                PNG, JPG, WEBP (সর্বোচ্চ 10MB)
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                style={{ display: 'none' }}
              />
            </label>

            {uploadStatus && (
              <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-sub)' }}>
                {uploadStatus}
              </p>
            )}

            {/* Image Preview & URL input */}
            <div style={{ marginTop: '1.25rem' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                ইমেজ ইউআরএল (সরাসরি পেস্ট বা আপলোড করুন)
              </label>
              <input
                type="text"
                value={featuredImageUrl}
                onChange={(e) => setFeaturedImageUrl(e.target.value)}
                placeholder="https://..."
                style={{
                  width: '100%',
                  padding: '0.6rem 0.85rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
            </div>

            {featuredImageUrl && (
              <div style={{ marginTop: '1rem', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-subtle)', maxHeight: '200px' }}>
                <img
                  src={featuredImageUrl}
                  alt="ফিচার্ড প্রিভিউ"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}
          </div>

          {/* Recent Articles in CMS */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
              সম্প্রতি প্রকাশিত সংবাদ ({articlesList.length})
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '380px', overflowY: 'auto' }}>
              {articlesList.slice(0, 7).map((item) => (
                <div
                  key={item.id || item.slug}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    background: 'var(--bg-main)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.9rem',
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '240px' }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '4px', fontWeight: 600 }}>
                    প্রকাশিত
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
