'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { docHref, sections, site } from '@/lib/site';
import { Icon } from './Icon';

export function Sidebar() {
  const pathname = usePathname() ?? '/';

  return (
    <div className="sidebar-inner">
      {sections.map(section => (
        <div key={section.title} className="side-section">
          <p className="side-title">{section.title}</p>
          <ul>
            {section.pages.map(page => {
              const href = docHref(page.slug);
              const active = pathname === href || pathname === href.slice(0, -1);
              return (
                <li key={page.slug}>
                  <Link href={href} className={active ? 'side-link active' : 'side-link'} aria-current={active ? 'page' : undefined}>
                    <Icon name={page.icon} size={16} />
                    <span>{page.label ?? page.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <div className="help-card">
        <p className="help-title">
          <Icon name="help" size={16} /> Need help?
        </p>
        <p>Check the examples, open an issue on GitHub or write to us.</p>
        <a href={`mailto:${site.email}`} className="help-mail">
          <Icon name="mail" size={15} /> {site.email}
        </a>
        <a href={`${site.github}/issues`} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
          <Icon name="github" size={15} /> View on GitHub
        </a>
      </div>
    </div>
  );
}
