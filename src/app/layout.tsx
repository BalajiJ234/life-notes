import type { Metadata } from 'next'
import './globals.css'
import { ReduxProvider } from '@/store/ReduxProvider'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Life Notes - Notes & Todos',
  description: 'Capture your thoughts and manage your tasks - Part of Life-Sync ecosystem',
  manifest: '/manifest.json',
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <ReduxProvider>
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  )
}
