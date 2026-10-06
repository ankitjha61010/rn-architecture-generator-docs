import Link from 'next/link';
import type { ReactNode } from 'react';
import { docHref } from '@/lib/site';
import { CodeBlock } from './CodeBlock';
import { Icon, type IconName } from './Icon';

/**
 * Inline formatting for content strings: `code`, **bold**, *italic* and [label](slug, /path or https://…).
 * Keeps the page files short and readable.
 */
export function md(text: string): ReactNode {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*\s][^*]*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith('mailto:')) return <a key={index} href={href}>{label}</a>;
      if (href.startsWith('http')) {
        return (
          <a key={index} href={href} target="_blank" rel="noreferrer">
            {label}
          </a>
        );
      }
      const target = href.startsWith('/') ? href : docHref(href);
      return (
        <Link key={index} href={target}>
          {label}
        </Link>
      );
    }
    return part;
  });
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[`*]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export function H2({ children, id }: { children: string; id?: string }) {
  const anchor = id ?? slugify(children);
  return (
    <h2 id={anchor} className="doc-h2">
      <a href={`#${anchor}`}>{md(children)}</a>
    </h2>
  );
}

export function H3({ children, id }: { children: string; id?: string }) {
  const anchor = id ?? slugify(children);
  return (
    <h3 id={anchor} className="doc-h3">
      <a href={`#${anchor}`}>{md(children)}</a>
    </h3>
  );
}

export function P({ children }: { children: string }) {
  return <p>{md(children)}</p>;
}

export function List({ items, ordered }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag className="doc-list">
      {items.map(item => (
        <li key={item}>{md(item)}</li>
      ))}
    </Tag>
  );
}

export function Code({ code, lang, title }: { code: string; lang?: string; title?: string }) {
  return <CodeBlock code={code} lang={lang} title={title} />;
}

export function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {head.map(cell => (
              <th key={cell}>{md(cell)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{md(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const calloutIcons: Record<'info' | 'tip' | 'warning', IconName> = { info: 'info', tip: 'bolt', warning: 'warning' };

export function Callout({ type = 'info', title, children }: { type?: 'info' | 'tip' | 'warning'; title?: string; children: string }) {
  return (
    <div className={`callout callout-${type}`}>
      <Icon name={calloutIcons[type]} size={18} />
      <div>
        {title ? <strong className="callout-title">{title}</strong> : null}
        <p>{md(children)}</p>
      </div>
    </div>
  );
}

export function Steps({ steps }: { steps: Array<{ title: string; body?: string; code?: string }> }) {
  return (
    <ol className="steps">
      {steps.map((step, index) => (
        <li key={step.title}>
          <span className="step-num">{index + 1}</span>
          <div className="step-body">
            <strong>{md(step.title)}</strong>
            {step.body ? <p>{md(step.body)}</p> : null}
            {step.code ? <CodeBlock code={step.code} /> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Tree({ tree, title }: { tree: string; title?: string }) {
  return <CodeBlock code={tree} lang="text" title={title ?? 'folder structure'} />;
}

export function CardGrid({ cards }: { cards: Array<{ icon: IconName; title: string; body: string; href?: string }> }) {
  return (
    <div className="card-grid">
      {cards.map(card => {
        const inner = (
          <>
            <span className="card-icon">
              <Icon name={card.icon} size={18} />
            </span>
            <strong>{card.title}</strong>
            <span>{md(card.body)}</span>
          </>
        );
        return card.href ? (
          <Link key={card.title} href={card.href.startsWith('/') ? card.href : docHref(card.href)} className="doc-card">
            {inner}
          </Link>
        ) : (
          <div key={card.title} className="doc-card">
            {inner}
          </div>
        );
      })}
    </div>
  );
}
