import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Team - Borago Web',
  description: 'Meet the talented people behind Borago Web - Nikola Dimitrov and Stanislav Nikolov',
  openGraph: {
    title: 'Our Team - Borago Web',
    description: 'Meet Nikola Dimitrov (Founder) and Stanislav Nikolov (Co-founder)',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Team - Borago Web',
    description: 'Meet the talented people behind Borago Web',
  },
}

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
