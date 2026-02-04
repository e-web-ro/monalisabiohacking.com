import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-data'
import { siteConfig } from '@/lib/metadata'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url
    const languages = ['ro', 'en', 'de']

    // Static routes
    const routes = [
        '',
        '/about',
        '/contact',
        '/servicii',
        '/shop',
        '/blog',
    ]

    const staticUrls = languages.flatMap(lang =>
        routes.map(route => ({
            url: `${baseUrl}/${lang}${route}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: route === '' ? 1 : 0.8,
        }))
    )

    // Blog posts
    const postUrls = languages.flatMap(lang => {
        const posts = blogPosts[lang] || []
        return posts.map((post: any) => ({
            url: `${baseUrl}/${lang}/blog/${post.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }))
    })

    return [...staticUrls, ...postUrls]
}
