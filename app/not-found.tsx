import Link from 'next/link';
import { docHref } from '@/lib/site';

export default function NotFound() {
  return (
    <article className="doc">
      <p className="doc-section">404</p>
      <h1>Page not found</h1>
      <p className="doc-lead">This page doesn&apos;t exist (any more). Try the search, or start from the introduction.</p>
      <p>
        <Link href={docHref('introduction')} className="btn btn-primary">
          Go to the docs
        </Link>
      </p>
    </article>
  );
}
