import { Hero } from '@/components/Hero'
import { HomePageClient } from '@/components/HomePageClient'
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { PageBackground } from '@/components/PageBackground'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "BoragoWeb – Web Design & Development Agency",
  description: "Professional, fast, and SEO-optimized websites made by BoragoWeb – combining design, performance, and creativity.",
  keywords: ["web design", "website development", "SEO", "Next.js", "BoragoWeb", "Bulgaria", "Europe"],
  openGraph: {
    title: "BoragoWeb – Creative Web Agency",
    description: "Next.js websites, custom design, and online branding solutions for businesses in Bulgaria and Europe.",
    url: "https://boragoweb.eu",
    siteName: "BoragoWeb",
    images: [
      {
        url: "https://boragoweb.eu/preview.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_EU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BoragoWeb – Web Design & Development",
    description: "High-performance websites built with Next.js.",
    images: ["https://boragoweb.eu/preview.png"],
  },
}

export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  const supabase = await createSupabaseServerComponentClient()

  // Fetch featured projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <div className="relative isolate overflow-hidden">
      <PageBackground variant="default" />
      
      <Hero />
      
      <HomePageClient projects={projects} />
    </div>
  )
}
