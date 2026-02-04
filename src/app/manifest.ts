import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/metadata'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: siteConfig.name,
        short_name: "MonalisaBio",
        description: siteConfig.description,
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#10b981', // emerald-500 matching primary
        icons: [
            {
                src: '/favicon.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/favicon.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
