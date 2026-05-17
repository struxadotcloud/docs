import { Cal_Sans, Geist_Mono } from 'next/font/google';
import { Provider } from '@/components/provider';
import type { Metadata } from 'next';
import './global.css';

const calSans = Cal_Sans({
  variable: '--font-cal-sans',
  subsets: ['latin'],
  weight: '400',
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
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${calSans.variable} ${geistMono.variable}`}
    >
      <body className="flex flex-col min-h-screen antialiased">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
