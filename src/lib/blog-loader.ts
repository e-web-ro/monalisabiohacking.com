import 'server-only';
import { blogPosts as staticBlogPosts, BlogPost } from './blog-data';
import path from 'path';
import fs from 'fs/promises';

export async function getBlogPosts(): Promise<Record<string, BlogPost[]>> {
    try {
        const filePath = path.join(process.cwd(), 'src/lib/blog-posts.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading blog posts:', error);
        return staticBlogPosts;
    }
}
