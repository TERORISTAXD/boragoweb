import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-accent mb-4">404</h1>
        <h2 className="heading-2 mb-4">Page Not Found</h2>
        <p className="text-foreground-muted mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link href="/" className="btn-primary px-8 py-3 inline-flex items-center gap-2">
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
