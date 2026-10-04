export interface Category {
  id: string;
  name_bn: string;
  name_en: string;
  slug: string;
  description?: string;
  order_index: number;
  created_at?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category_id?: string;
  category?: Category;
  is_lead: boolean;
  is_breaking: boolean;
  view_count: number;
  author_name: string;
  author_id?: string;
  status: 'draft' | 'published' | 'archived';
  tags?: string[];
  published_at: string;
  created_at?: string;
  updated_at?: string;
}

export interface Comment {
  id: string;
  article_id: string;
  author_name: string;
  content: string;
  status: 'pending' | 'approved' | 'spam';
  created_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  article_id: string;
  article?: Article;
  created_at: string;
}

export interface R2UploadResponse {
  success: boolean;
  url?: string;
  key?: string;
  error?: string;
}
