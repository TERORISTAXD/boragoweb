import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { PageBackground } from '@/components/PageBackground'
import { BlogClient } from '@/components/BlogClient'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Calendar } from 'lucide-react'

export const metadata = {
  title: 'Blog',
  description: 'Insights, tutorials, and updates from the BoragoWeb team – web design tips and development guides.',
  keywords: ['web design blog', 'development tutorials', 'BoragoWeb insights', 'web development tips'],
  openGraph: {
    title: 'Blog – BoragoWeb Insights',
    description: 'Insights, tutorials, and updates from the BoragoWeb team – web design tips and development guides.',
    url: 'https://boragoweb.eu/blog',
    siteName: 'BoragoWeb',
    images: [
      {
        url: 'https://boragoweb.eu/preview.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_EU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog – BoragoWeb Insights',
    description: 'Insights, tutorials, and updates from the BoragoWeb team.',
    images: ['https://boragoweb.eu/preview.png'],
  },
}

export const revalidate = 3600

export default async function BlogPage() {
  const supabase = await createSupabaseServerComponentClient()

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('draft', false)
    .order('published_at', { ascending: false })

  return (
    <div className="min-h-screen relative">
      <PageBackground variant="blog" />
      
      <BlogClient noPosts={!posts || posts.length === 0}>
        {posts && posts.length > 0 && (
          <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.id} className="card-hover p-6">
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-2xl font-semibold mb-3 hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                  </Link>

                  {post.excerpt && (
                    <p className="text-foreground-muted mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-muted">
                    {post.published_at && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.published_at)}
                      </div>
                    )}

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2">
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-full bg-background-secondary text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
          </div>
        )}
      </BlogClient>
    </div>
  )
}
