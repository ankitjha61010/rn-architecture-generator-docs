import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { content } from '@/content';
import { allPages, docHref, findPage, sectionOf, site } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return allPages.map(page => ({ slug: page.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = findPage((await params).slug);
  return page ? { title: page.title, description: page.description } : {};
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const page = findPage(slug);
  const Body = content[slug];
  if (!page || !Body) notFound();

  const index = allPages.findIndex(p => p.slug === slug);
  const previous = allPages[index - 1];
  const next = allPages[index + 1];

  return (
    <article className="doc">
      <p className="doc-section">{sectionOf(slug)?.title}</p>
      <h1>{page.title}</h1>
      <p className="doc-lead">{page.description}</p>
      <div className="doc-body">
        <Body />
      </div>

      <nav className="pager" aria-label="Pagination">
        {previous ? (
          <Link href={docHref(previous.slug)} className="pager-link">
            <small>
              <Icon name="arrowLeft" size={14} /> Previous
            </small>
            <strong>{previous.title}</strong>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={docHref(next.slug)} className="pager-link pager-next">
            <small>
              Next <Icon name="arrowRight" size={14} />
            </small>
            <strong>{next.title}</strong>
          </Link>
        ) : null}
      </nav>
      <a className="edit-link" href={`${site.github}/tree/main/website/content`} target="_blank" rel="noreferrer">
        <Icon name="github" size={15} /> Edit this page on GitHub
      </a>
    </article>
  );
}
