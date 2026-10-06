import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { site } from '@/lib/site';
import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.docs),
  title: { default: `${site.name} – Docs`, template: `%s · ${site.name}` },
  description: site.description,
  icons: { icon: '/favicon.svg' },
  openGraph: { title: site.name, description: site.description, type: 'website' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1020' },
  ],
};

// Runs before paint: saved theme, else the system preference – no light flash in dark mode.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Header />
        <div className="shell">
          <aside className="sidebar" aria-label="Documentation">
            <Sidebar />
          </aside>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
