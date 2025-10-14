import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { ProjectCard } from '@/components/ProjectCard'
import { PageBackground } from '@/components/PageBackground'
import { Suspense } from 'react'
import { PortfolioClient } from '@/components/PortfolioClient'

export const metadata = {
  title: 'Portfolio - Borago',
  description: 'Explore our creative projects and case studies',
}

export const revalidate = 3600

async function ProjectsGrid({ tag }: { tag?: string }) {
  const supabase = await createSupabaseServerComponentClient()

  let query = supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (tag) {
    query = query.contains('tags', [tag])
  }

  const { data: projects } = await query

  if (!projects || projects.length === 0) {
    return <PortfolioClient noProjects={true} />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          title={project.title}
          slug={project.slug}
          summary={project.summary}
          coverImage={project.cover_image}
          tags={project.tags}
          featured={project.featured}
        />
      ))}
    </div>
  )
}

function ProjectsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="card animate-pulse">
          <div className="aspect-video bg-background-secondary" />
          <div className="p-6 space-y-3">
            <div className="h-6 bg-background-secondary rounded" />
            <div className="h-4 bg-background-secondary rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: { tag?: string }
}) {
  const tag = searchParams.tag

  return (
    <div className="min-h-screen relative">
      <PageBackground variant="portfolio" />
      
      <PortfolioClient tag={tag}>
        <Suspense fallback={<ProjectsLoading />}>
          <ProjectsGrid tag={tag} />
        </Suspense>
      </PortfolioClient>
    </div>
  )
}
