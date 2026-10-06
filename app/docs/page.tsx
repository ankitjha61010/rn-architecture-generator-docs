import { redirect } from 'next/navigation';
import { docHref } from '@/lib/site';

// /docs → the first page (static export writes a redirect page).
export default function DocsIndex() {
  redirect(docHref('introduction'));
}
