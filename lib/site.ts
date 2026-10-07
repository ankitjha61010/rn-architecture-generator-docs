import type { IconName } from '@/components/Icon';
import { latest } from './versions';

export const site = {
  name: 'RN Architecture Generator',
  shortName: 'RNAG',
  packageName: 'rn-architecture-generator',
  version: latest.version,
  description:
    'One command generates a production-ready React Native app, a matching NestJS / Express backend and a web admin panel – already wired together.',
  github: 'https://github.com/ankitjha61010/React_native_project_genrator',
  npm: 'https://www.npmjs.com/package/rn-architecture-generator',
  docs: 'https://rnag.netlify.app',
  email: 'abhishek61010@gmail.com',
};

export interface DocPage {
  slug: string;
  title: string;
  /** Shorter label for the sidebar (defaults to the title). */
  label?: string;
  description: string;
  icon: IconName;
  /** Extra words for the search box. */
  keywords?: string;
}

export interface DocSection {
  title: string;
  pages: DocPage[];
}

export const sections: DocSection[] = [
  {
    title: 'Getting Started',
    pages: [
      { slug: 'introduction', title: 'Introduction', icon: 'home', description: 'What the generator is, what it builds and how the pieces fit together.', keywords: 'overview about what why' },
      { slug: 'installation', title: 'Installation', icon: 'code', description: 'Requirements and the ways to install / run the CLI – npx, npm or yarn.', keywords: 'install npm yarn npx global node requirements' },
      { slug: 'quick-start', title: 'Quick Start', icon: 'rocket', description: 'Generate your first app, backend or full stack project in a few minutes.', keywords: 'first run wizard dry-run' },
    ],
  },
  {
    title: 'Project Templates',
    pages: [
      { slug: 'react-native-app', title: 'React Native App', icon: 'phone', description: 'Everything the mobile app template contains: navigation, auth, chat, calling, i18n, RTL, theme…', keywords: 'mobile frontend android ios screens' },
      { slug: 'backend', title: 'Backend (NestJS / Express)', label: 'Backend (NestJS/Express)', icon: 'server', description: 'The generated API: frameworks, architectures, modules, routes, security and tests.', keywords: 'api nestjs express server routes' },
      { slug: 'branding', title: 'App Icon & Splash Screen', label: 'App Icon & Splash', icon: 'phone', description: 'Give your images – get every Android / iOS app icon and a native splash screen (full screen or a centred logo); change them later in one command.', keywords: 'icon launcher adaptive appicon splash launch screen storyboard image logo brand update change size width height' },
      { slug: 'admin-panel', title: 'Admin Panel (React + Next.js)', label: 'Admin Panel (React + Next.js)', icon: 'grid', description: 'The web admin panel: dashboard, users, broadcasts, legal pages, payments and OTA releases.', keywords: 'admin dashboard vite tailwind next' },
    ],
  },
  {
    title: 'Architecture',
    pages: [
      { slug: 'architectures', title: 'Mobile Architectures', icon: 'layers', description: 'The 8 React Native folder structures with their real folder trees.', keywords: 'atomic feature-based layered clean mvc mvvm redux modular folders structure' },
      { slug: 'monolith', title: 'Monolithic Setup', icon: 'database', description: 'One backend project – 6 architectures, one database, optional Redis and Docker.', keywords: 'monolith single backend architectures enterprise' },
      { slug: 'microservices', title: 'Microservices Setup', icon: 'cloud', description: 'API gateway + identity, chat and notifications services with Redis events.', keywords: 'microservices gateway identity services redis' },
    ],
  },
  {
    title: 'Advanced',
    pages: [
      { slug: 'authentication', title: 'Authentication (JWT)', icon: 'lock', description: 'Email, mobile OTP, Google, Facebook and Apple sign-in, JWT strategies, roles and permissions.', keywords: 'auth jwt refresh rotation login otp google facebook apple social' },
      { slug: 'database', title: 'Database Support', icon: 'database', description: 'PostgreSQL, MySQL or MongoDB with Prisma, TypeORM or Mongoose – migrations and seeding.', keywords: 'postgres mysql mongodb prisma typeorm mongoose migrations seed' },
      { slug: 'payments', title: 'Payments (Stripe / Razorpay)', label: 'Payments (Stripe/Razorpay)', icon: 'card', description: 'In-app purchases (react-native-iap, Adapty) and Stripe, Razorpay or PayPal checkout.', keywords: 'stripe razorpay paypal iap adapty purchase subscription' },
      { slug: 'realtime', title: 'Real-time (Socket.io)', icon: 'wifi', description: 'Socket.IO events, one-to-one and group chat, media messages and Agora audio / video calling.', keywords: 'socket chat calling agora callkit voip group' },
      { slug: 'notifications', title: 'Notifications (FCM)', icon: 'bell', description: 'Firebase Cloud Messaging + Notifee, the notification inbox, deep links and permissions.', keywords: 'push fcm firebase notifee apns permission' },
      { slug: 'swagger', title: 'Swagger / API Docs', icon: 'file', description: 'Swagger UI, the response envelope, API encryption and the realtime tester page.', keywords: 'openapi swagger docs encryption tester' },
      { slug: 'docker', title: 'Docker & Ports', icon: 'box', description: 'docker-compose for the database and Redis – started on free ports with npm run docker:up.', keywords: 'docker compose port in use redis' },
      { slug: 'ota', title: 'OTA Updates', icon: 'refresh', description: 'Signed Over-The-Air JavaScript bundle updates with rollback, published from the admin panel.', keywords: 'ota over the air update bundle hermes' },
      { slug: 'configuration', title: 'Configuration & Keys', icon: 'key', description: 'What to fill in after generating: .env values, Firebase, Agora, social login, APNs…', keywords: 'env keys firebase agora apns google maps twilio smtp config' },
    ],
  },
  {
    title: 'Reference',
    pages: [
      { slug: 'cli-reference', title: 'CLI Reference', icon: 'terminal', description: 'Every command-line flag for the app, the backend and general options.', keywords: 'flags options cli arguments help' },
      { slug: 'commands', title: 'All Commands', icon: 'terminal', description: 'Every command and what it does – create, update the icon / splash, rename, help (also: --list).', keywords: 'commands list --list overview what does help usage' },
      { slug: 'rename', title: 'Rename a Project', icon: 'refresh', description: 'Rename a generated app later – folder, Android, iOS, code and texts in one command.', keywords: 'rename name change project folder package bundle id display name xcodeproj' },
      { slug: 'troubleshooting', title: 'Troubleshooting', icon: 'help', description: 'Common problems and their fixes.', keywords: 'error problem fix issue' },
      { slug: 'changelog', title: 'Changelog', icon: 'refresh', description: 'What changed in every version – and how to install a specific one.', keywords: 'version release changelog 1.0.3 1.0.2 1.0.1 1.0.0 history upgrade' },
    ],
  },
  {
    title: 'Examples',
    pages: [
      { slug: 'examples', title: 'Full Stack Example', icon: 'code', description: 'Copy-paste commands for typical projects – CI friendly.', keywords: 'example fullstack command ci' },
      { slug: 'contributing', title: 'Contributing', icon: 'github', description: 'Develop the generator itself: build, tests and how templates work.', keywords: 'contribute develop templates manifest' },
    ],
  },
];

export const allPages: DocPage[] = sections.flatMap(section => section.pages);

export function findPage(slug: string): DocPage | undefined {
  return allPages.find(page => page.slug === slug);
}

export function sectionOf(slug: string): DocSection | undefined {
  return sections.find(section => section.pages.some(page => page.slug === slug));
}

export const docHref = (slug: string) => `/docs/${slug}/`;

export const topNav = [
  { label: 'Home', href: '/' },
  { label: 'Getting Started', href: docHref('introduction'), match: ['introduction', 'installation', 'quick-start'] },
  { label: 'Templates', href: docHref('react-native-app'), match: ['react-native-app', 'branding', 'backend', 'admin-panel', 'architectures', 'monolith', 'microservices'] },
  { label: 'Guides', href: docHref('authentication'), match: ['authentication', 'database', 'payments', 'realtime', 'notifications', 'swagger', 'docker', 'ota', 'configuration'] },
  { label: 'CLI Reference', href: docHref('cli-reference'), match: ['cli-reference', 'commands', 'rename', 'troubleshooting', 'changelog'] },
  { label: 'Examples', href: docHref('examples'), match: ['examples', 'contributing'] },
];
