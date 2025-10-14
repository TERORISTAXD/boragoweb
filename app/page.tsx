import { Hero } from '@/components/Hero'
import { HomePageClient } from '@/components/HomePageClient'
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { PageBackground } from '@/components/PageBackground'

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
