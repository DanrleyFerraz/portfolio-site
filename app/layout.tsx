import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Danrley Ferraz - Engenheiro de Software',
  description: 'Danrley Ferraz - Portfólio',
  generator: 'Danrley',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
