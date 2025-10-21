import { createSupabaseServerComponentClient, createSupabaseBuildClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const revalidate = 3600

// Generate static slugs at build time (no cookies)
export async function generateStaticParams() {
  const supabase = createSupabaseBuildClient()
  const { data: projects } = await supabase.from('projects').select('slug')

  return (projects || []).map((project: { slug: string }) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createSupabaseServerComponentClient()
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: project.title,
    description: project.summary || `${project.title} – A portfolio project by BoragoWeb showcasing web design and development expertise.`,
    keywords: ['portfolio project', 'web design', 'BoragoWeb', project.title, ...(project.tags || [])],
    openGraph: {
      title: `${project.title} – BoragoWeb Portfolio`,
      description: project.summary || project.title,
      url: `https://boragoweb.eu/portfolio/${project.slug}`,
      siteName: 'BoragoWeb',
      images: project.cover_image ? [
        {
          url: project.cover_image,
          width: 1200,
          height: 630,
        }
      ] : [
        {
          url: 'https://boragoweb.eu/preview.png',
          width: 1200,
          height: 630,
        }
      ],
      locale: 'en_EU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} – BoragoWeb Portfolio`,
      description: project.summary || project.title,
      images: project.cover_image ? [project.cover_image] : ['https://boragoweb.eu/preview.png'],
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createSupabaseServerComponentClient()
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!project) {
    notFound()
  }

  const gallery = project.gallery as string[] | null

  return (
    <div className="min-h-screen">
      {/* Back button */}
      <div className="container-custom pt-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-foreground-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
      </div>

      {/* Hero Image */}
      {project.cover_image && (
        <section className="container-custom py-8">
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image
              src={project.cover_image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="section">
        <div className="container-custom max-w-4xl">
          {/* Title and meta */}
          <div className="mb-8">
            {project.featured && (
              <span className="inline-block bg-accent text-background px-3 py-1 rounded-full text-sm font-semibold mb-4">
                Featured Project
              </span>
            )}
            <h1 className="heading-1 mb-4">{project.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-foreground-muted">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(project.created_at)}
              </div>
            </div>
          </div>

          {/* Summary */}
          {project.summary && (
            <div className="text-xl text-foreground-muted mb-8 leading-relaxed">
              {project.summary}
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex items-center gap-2 mb-8 flex-wrap">
              <Tag className="w-4 h-4 text-foreground-muted" />
              {project.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/portfolio?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 rounded-full bg-background-elevated border border-border hover:border-accent transition-colors text-sm"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Body content */}
          {project.body && (
            <div className="prose prose-invert max-w-none mb-12">
              <div dangerouslySetInnerHTML={{ __html: project.body }} />
            </div>
          )}

          {/* Gallery */}
          {gallery && gallery.length > 0 && (
            <div className="space-y-8">
              <h2 className="heading-3">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gallery.map((image, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
