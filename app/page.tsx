import { Hero } from '@/components/Hero'
import { HomePageClient } from '@/components/HomePageClient'
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { PageBackground } from '@/components/PageBackground'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Borago Web – Web Services and Digital Solutions for Your Business",
  description: "Borago Web offers professional web services, website design, and effective digital solutions for your business. Grow your online presence today.",
  keywords: ["web design", "web services", "digital solutions", "Next.js", "Borago Web", "Bulgaria", "Europe"],
  openGraph: {
    title: "Borago Web – Digital Solutions Agency",
    description: "Next.js websites, custom web services, and digital solutions for your business in Bulgaria and Europe.",
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
