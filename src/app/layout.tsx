import Head from 'next/head';
import '@/styles/styles.scss';
import type {Metadata} from 'next';
import {Analytics} from '@vercel/analytics/react';
import {Inter} from 'next/font/google';
import GoogleTagManager from '@/components/scripts/GoogleTagManager';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Prophet Predict',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className={inter.className}>
        {children}
        <Analytics />
        <GoogleTagManager />
      </body>
    </html>
  );
}
