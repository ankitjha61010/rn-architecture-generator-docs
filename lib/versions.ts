/**
 * Released versions, newest first. The first entry is "latest" – it drives the version shown in the header.
 * Releasing: bump package.json, add an entry here (and in CHANGELOG.md), redeploy the site.
 */
export interface Release {
  version: string;
  /** Publish date on npm (YYYY-MM-DD). */
  date: string;
  summary: string;
  groups: Array<{ title: string; items: string[] }>;
}

export const releases: Release[] = [
  {
    version: '1.0.2',
    date: '2026-10-07',
    summary: '← Back in every wizard question, update the icon / splash of an existing project, splash logo size, `rename` command, `--list`; Android shows only the native splash.',
    groups: [
      {
        title: 'CLI',
        items: [
          '**← Back in every question** (frontend, backend, full-stack): pick *← Back* (or type `<` in a text question) to change the previous answer.',
          '**Update the icon / splash of an existing project:** run the generator on it with `--app-icon` / `--splash-image` (or pick *Update the app icon / splash screen only* in the wizard) – only the branding files are replaced. See [App Icon & Splash](branding).',
          '**Splash logo size:** `--splash-logo-width` / `--splash-logo-height` show the splash image as a centred logo instead of full screen.',
          '**`rename` command:** rename a generated project everywhere – folder, Android, iOS, code and texts. See [Rename a Project](rename).',
          '**`--list`:** every command and what it does. See [All Commands](commands).',
        ],
      },
      {
        title: 'Mobile app',
        items: [
          '**Android: only the native splash is seen** – the JS splash is transparent there, so the logo no longer appears a second time.',
          'The splash stays up **5 seconds** (`appConfig.splashDelayMs`, was 1.2 s); image, colour and logo size live in `assets/images/splash.ts`.',
        ],
      },
    ],
  },
  {
    version: '1.0.1',
    date: '2026-10-06',
    summary: 'App icon & full-screen native splash from your images; fixes for Docker ports, notifications, RTL icons and the keyboard; persistent OTA releases.',
    groups: [
      {
        title: 'Backend',
        items: [
          '**Docker on free ports:** `npm run docker:up` starts the database / Redis on the next free host port when the default one is taken (another project, a local Postgres…) and updates `DATABASE_URL` / `REDIS_URL` in `.env`. Compose ports come from `DB_PORT`, `REDIS_PORT`, `API_PORT` (microservices: `GATEWAY_PORT`).',
          '**OTA releases are stored in the database** for Prisma, TypeORM and Mongoose (own migrations / models) – no longer in memory.',
          'Chat: richer message validation (DTOs / schemas), file storage fixes, more unit and e2e tests.',
        ],
      },
      {
        title: 'Mobile app',
        items: [
          '**App icon:** give a square image (`--app-icon` or the wizard) → every Android icon (legacy, round, adaptive, all densities) and the full iOS AppIcon set, incl. the 1024 App Store icon. See [App Icon & Splash](branding).',
          '**Native splash screen:** give a portrait image (`--splash-image`) → full screen from the first frame on Android (incl. Android 12+) and iOS, continued by the JS splash with the same image.',
          '**Notifications:** the *Enable notifications* button asks again after a refusal – or, when the system no longer shows the dialog, explains it and opens the app Settings.',
          '**RTL:** directional icons (arrows, chevrons, send, reply, logout…) are mirrored automatically by `AppIcon`.',
          '**Keyboard:** `AppScreen` keeps the focused input above the keyboard on iOS and Android (edge to edge) – login, register, forgot / reset password, OTP, change password, edit profile…',
          'Chat: spreadsheet (.xlsx) preview, message sheets, keyboard-aware input bar, socket reconnect fixes.',
          'Calling: Android "Phone" and "Display over other apps" permissions asked at runtime (Android 11+), minimised call bar and video call fixes, iOS Simulator fallback.',
          '`IMAGE_BASE_URL` for uploaded files (CDN / file server).',
        ],
      },
      {
        title: 'Admin panel',
        items: ['Reworked **OTA Releases** page (publish from `release.json`, rollout, rollback) and user management fixes – React and Next.js.'],
      },
      {
        title: 'Docs',
        items: ['New documentation website with search, dark mode and this changelog.'],
      },
    ],
  },
  {
    version: '1.0.0',
    date: '2026-10-04',
    summary: 'First public release.',
    groups: [
      {
        title: 'Highlights',
        items: [
          'Interactive wizard: **Frontend**, **Backend** or **Frontend + Backend**.',
          'React Native 0.87 app in 8 architectures – auth (email, OTP, Google, Facebook, Apple), chat & groups, Agora audio / video calling, FCM notifications, payments (IAP, Adapty, Stripe, Razorpay, PayPal), i18n / RTL, theme, OTA.',
          'NestJS / Express backend in 6 architectures – PostgreSQL / MySQL / MongoDB with Prisma, TypeORM or Mongoose, monolith or microservices, Swagger, security middleware, tests, Docker.',
          'Admin panel in React + Vite or Next.js.',
        ],
      },
    ],
  },
];

/** Changes on the main branch that are not on npm yet – shown on the Changelog page as "Upcoming". Move into a release when publishing. */
export const upcoming: Release['groups'] = [];

export const latest = releases[0];

export const versionAnchor = (version: string) => `v${version.replace(/\./g, '-')}`;
