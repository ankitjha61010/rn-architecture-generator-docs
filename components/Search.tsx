'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { allPages, docHref, sectionOf } from '@/lib/site';
import { Icon } from './Icon';

/** Docs search: ⌘K / Ctrl+K opens it, matches page titles, descriptions and keywords. */
export function Search() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(value => !value);
      } else if (event.key === '/' && !(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return allPages;
    return allPages
      .map(page => {
        const title = page.title.toLowerCase();
        const haystack = `${title} ${page.description} ${page.keywords ?? ''}`.toLowerCase();
        if (!words.every(word => haystack.includes(word))) return null;
        const score = words.reduce((total, word) => total + (title.includes(word) ? 3 : 1), 0);
        return { page, score };
      })
      .filter((result): result is NonNullable<typeof result> => result !== null)
      .sort((a, b) => b.score - a.score)
      .map(result => result.page);
  }, [query]);

  const go = (slug: string) => {
    setOpen(false);
    router.push(docHref(slug));
  };

  return (
    <>
      <button type="button" className="search-btn" onClick={() => setOpen(true)} aria-label="Search the docs">
        <Icon name="search" size={16} />
        <span className="search-label">Search docs…</span>
        <kbd>{isMac ? '⌘' : 'Ctrl'} K</kbd>
      </button>

      {open ? (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search the docs" onClick={() => setOpen(false)}>
          <div className="search-panel" onClick={event => event.stopPropagation()}>
            <div className="search-input">
              <Icon name="search" size={18} />
              <input
                ref={inputRef}
                value={query}
                placeholder="Search: auth, docker, chat, flags…"
                onChange={event => {
                  setQuery(event.target.value);
                  setSelected(0);
                }}
                onKeyDown={event => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    setSelected(index => Math.min(index + 1, results.length - 1));
                  } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    setSelected(index => Math.max(index - 1, 0));
                  } else if (event.key === 'Enter' && results[selected]) {
                    go(results[selected].slug);
                  } else if (event.key === 'Escape') {
                    setOpen(false);
                  }
                }}
              />
              <kbd>Esc</kbd>
            </div>
            <ul className="search-results">
              {results.length === 0 ? <li className="search-empty">No pages match “{query}”.</li> : null}
              {results.map((page, index) => (
                <li key={page.slug}>
                  <button
                    type="button"
                    className={index === selected ? 'search-item selected' : 'search-item'}
                    onMouseEnter={() => setSelected(index)}
                    onClick={() => go(page.slug)}>
                    <Icon name={page.icon} size={18} />
                    <span>
                      <strong>{page.title}</strong>
                      <small>
                        {sectionOf(page.slug)?.title} · {page.description}
                      </small>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
