import blogData from './blog-posts.json';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
  author: string;
  authorImage: string;
  category: string;
}

export const blogPosts: Record<string, BlogPost[]> = blogData as any;
