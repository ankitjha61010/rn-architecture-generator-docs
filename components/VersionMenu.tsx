'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { docHref, site } from '@/lib/site';
import { latest, releases, versionAnchor } from '@/lib/versions';
import { Icon } from './Icon';

/** Header badge: current version + a dropdown with every release (links to the changelog). */
export function VersionMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent ? event.key === 'Escape' : !ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  return (
    <div className="version" ref={ref}>
      <button type="button" className="badge version-btn" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(value => !value)}>
        v{latest.version}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open ? (
        <div className="version-menu" role="menu">
          <p className="version-head">Versions</p>
          {releases.map(release => (
            <Link
              key={release.version}
              role="menuitem"
              href={`${docHref('changelog')}#${versionAnchor(release.version)}`}
              className="version-item"
              onClick={() => setOpen(false)}>
              <span>
                <strong>v{release.version}</strong>
                {release === latest ? <span className="tag tag-green">latest</span> : null}
              </span>
              <small>{release.date}</small>
            </Link>
          ))}
          <div className="version-foot">
            <Link href={docHref('changelog')} onClick={() => setOpen(false)}>
              <Icon name="file" size={14} /> Changelog
            </Link>
            <a href={`${site.npm}?activeTab=versions`} target="_blank" rel="noreferrer">
              <Icon name="package" size={14} /> npm
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
