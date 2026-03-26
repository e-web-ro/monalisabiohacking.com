import 'server-only';
import { blogPosts as staticBlogPosts, BlogPost } from './blog-data';
import path from 'path';
import fs from 'fs/promises';
import { kv } from '@vercel/kv';

export async function getBlogPosts(): Promise<Record<string, BlogPost[]>> {
    try {
        // Try KV first
        const kvBlogData = await kv.get('blog_posts');
        if (kvBlogData) {
            return kvBlogData as Record<string, BlogPost[]>;
        }
        
        // Fallback to local file if KV is empty
        const filePath = path.join(process.cwd(), 'src/lib/blog-posts.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading blog posts:', error);
        return staticBlogPosts;
    }
}
