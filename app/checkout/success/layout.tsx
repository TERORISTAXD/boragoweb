import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Success',
  description: 'Your order has been successfully completed – thank you for choosing BoragoWeb.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CheckoutSuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
