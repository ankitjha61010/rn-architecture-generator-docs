'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site, topNav } from '@/lib/site';
import { Icon, LogoMark } from './Icon';
import { Search } from './Search';
import { Sidebar } from './Sidebar';
import { VersionMenu } from './VersionMenu';

function currentSlug(pathname: string): string | null {
  const match = pathname.match(/^\/docs\/([^/]+)/);
  return match ? match[1] : null;
}

export function Header() {
  const pathname = usePathname() ?? '/';
  const slug = currentSlug(pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu on navigation.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const isActive = (item: (typeof topNav)[number]) => (item.match ? slug !== null && item.match.includes(slug) : pathname === '/');

  return (
    <header className="header">
      <div className="header-inner">
        <button type="button" className="icon-btn menu-btn" onClick={() => setMenuOpen(true)} aria-label="Open navigation">
          <Icon name="menu" />
        </button>
        <div className="brand-wrap">
          <Link href="/" className="brand">
            <LogoMark />
            <span className="brand-name">{site.shortName}</span>
          </Link>
          <VersionMenu />
        </div>
        <nav className="top-nav" aria-label="Main">
          {topNav.map(item => (
            <Link key={item.label} href={item.href} className={isActive(item) ? 'active' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Search />
          <ThemeToggle />
          <a className="icon-btn hide-sm" href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub repository">
            <Icon name="github" />
          </a>
        </div>
      </div>

      {menuOpen ? (
        <div className="drawer" role="dialog" aria-modal="true" aria-label="Navigation">
          <button type="button" className="drawer-backdrop" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />
          <div className="drawer-panel">
            <div className="drawer-head">
              <Link href="/" className="brand">
                <LogoMark />
                <span className="brand-name">{site.shortName}</span>
              </Link>
              <button type="button" className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close navigation">
                <Icon name="close" />
              </button>
            </div>
            <nav className="drawer-top" aria-label="Main">
              {topNav.map(item => (
                <Link key={item.label} href={item.href} className={isActive(item) ? 'active' : undefined}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <Sidebar />
          </div>
        </div>
      ) : null}
    </header>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage blocked – the choice lasts for this page only.
    }
    setTheme(next);
  };

  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}>
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
    </button>
  );
}
