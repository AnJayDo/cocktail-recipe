import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import GraphQlProvider from './components/GraphQlProvider'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cocktail Recipes - Jay An',
  description: 'Cocktail Recipes for everyone. Build by Jay An with 💔 a broken heart.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <GraphQlProvider>
          {children}
        </GraphQlProvider>
        <Footer />
      </body>
    </html>
  )
}
