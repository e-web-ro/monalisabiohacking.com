import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/blog-loader'
import { siteConfig } from '@/lib/metadata'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = siteConfig.url
    const languages = ['ro', 'en', 'de']
    const allBlogPosts = await getBlogPosts()

    // Static routes
    const routes = [
        '',
        '/about',
        '/contact',
        '/servicii',
        '/shop',
        '/blog',
        '/programare',
        '/termeni-si-conditii',
        '/politica-de-confidentialitate',
        '/politica-cookies',
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
        const posts = allBlogPosts[lang] || []
        return posts.map((post: any) => ({
            url: `${baseUrl}/${lang}/blog/${post.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }))
    })

    return [...staticUrls, ...postUrls]
}
