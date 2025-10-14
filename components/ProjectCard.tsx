'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface ProjectCardProps {
  id: string
  title: string
  slug: string
  summary: string | null
  coverImage: string | null
  tags: string[] | null
  featured?: boolean
}

export function ProjectCard({
  title,
  slug,
  summary,
  coverImage,
  tags,
  featured,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/portfolio/${slug}`} className="group block">
        <div className="card-hover overflow-hidden">
          {/* Image */}
          <div className="relative aspect-video overflow-hidden bg-background-secondary">
            {coverImage ? (
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-foreground-subtle">
                No image
              </div>
            )}
            {featured && (
              <div className="absolute top-4 right-4 bg-accent text-background px-3 py-1 rounded-full text-xs font-semibold">
                Featured
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
              {title}
            </h3>
            {summary && (
              <p className="text-foreground-muted text-sm mb-4 line-clamp-2">
                {summary}
              </p>
            )}
            
            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-background-secondary text-foreground-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="flex items-center text-accent text-sm font-medium group-hover:gap-2 transition-all">
              View Project
              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
