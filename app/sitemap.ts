import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://boragoweb.eu'

    // Core public routes to index
    const routes = [
        '',
        '/about',
        '/portfolio',
        '/web-design', // Core SEO landing page
        '/terms',
    ]

    // Map each route to the sitemap format
    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
    }))
}
