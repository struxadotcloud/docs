import { Funnel_Display, Geist, Geist_Mono } from 'next/font/google';
import { Provider } from '@/components/provider';
import type { Metadata } from 'next';
import './global.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const funnelDisplay = Funnel_Display({
  variable: '--font-funnel-display',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  fallback: [],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  fallback: [],
});

export const metadata: Metadata = {
  title: {
    template: '%s — Struxa Docs',
    default: 'Struxa Documentation',
  },
  description:
    'Self-hosted game server management platform. Documentation for the Struxa panel, Wings node agent, and installer.',
  icons: {
    icon: 'https://struxa.cloud/images/brand/favicon.png',
    shortcut: 'https://struxa.cloud/images/brand/favicon.png',
    apple: 'https://struxa.cloud/images/brand/favicon.png',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${funnelDisplay.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="flex flex-col min-h-screen antialiased">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
