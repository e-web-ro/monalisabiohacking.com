import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/metadata'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: siteConfig.name,
        short_name: "MonalisaBio",
        description: siteConfig.description,
        start_url: '/',
        display: 'standalone',
        background_color: '#050505',
        theme_color: '#10b981',
        icons: [
            {
                src: '/favicon.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/favicon.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
