import './globals.css';
import type {Metadata, Viewport} from 'next';
import {Analytics} from '@vercel/analytics/react';
import {Inter} from 'next/font/google';
import GoogleTagManager from '@/components/scripts/GoogleTagManager';
import {ThemeProvider} from '@/contexts/ThemeContext';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Prophet Predict',
  icons: {
    icon: [
      {url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
      {url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
    ],
    apple: {url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png'},
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    {media: '(prefers-color-scheme: light)', color: '#ffffff'},
    {media: '(prefers-color-scheme: dark)', color: '#0f172a'},
  ],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <Analytics />
          <GoogleTagManager />
        </ThemeProvider>
      </body>
    </html>
  );
}
