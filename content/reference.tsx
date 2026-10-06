import { Callout, Code, H2, List, P, Table, md } from '@/components/Doc';
import { latest, releases, versionAnchor } from '@/lib/versions';

export function CliReference() {
  return (
    <>
      <P>Without flags the CLI runs the interactive wizard. Flags pre-answer questions; `--yes` uses defaults for everything not passed (then `--name` is required). Every on/off option also has a `--no-…` form, e.g. `--no-notifications`.</P>
      <Code code="npx rn-architecture-generator --help" />

      <H2>General</H2>
      <Table
        head={['Flag', 'Values / meaning']}
        rows={[
          ['`--type <type>`', '`frontend` · `backend` · `fullstack`'],
          ['`-n, --name <name>`', 'app name (letters / digits, starts with a letter), e.g. `FastRoute`'],
          ['`-p, --package <id>`', 'Android package / iOS bundle id, e.g. `com.example.fastroute`'],
          ['`-d, --directory <path>`', 'parent folder the project folder is created in (default `./`)'],
          ['`--rn-version <v>`', '`0.87.1` (default) · `0.87` · `0.86.3` · `0.86`'],
          ['`--dry-run`', 'show what would be generated, write nothing'],
          ['`-y, --yes`', 'non-interactive, defaults for everything not passed'],
          ['`-f, --force`', 'replace the target folder if it exists'],
          ['`--no-install` · `--no-pods` · `--no-git`', 'skip `npm install` · `pod install` (macOS) · git init'],
          ['`-v, --version`', 'print the version'],
        ]}
      />

      <H2>App</H2>
      <Table
        head={['Flag', 'Values / meaning']}
        rows={[
          ['`-a, --architecture`', '`atomic` · `feature-based` · `layered` · `clean` · `mvc` · `mvvm` · `redux` · `modular`'],
          ['`-s, --state`', '`redux` · `zustand` · `context` · `none`'],
          ['`--storage`', '`mmkv` · `async-storage`'],
          ['`--encryption` / `--no-encryption`', 'AES-256 request / response bodies (crypto-js)'],
          ['`--rtl` · `--theme-context` · `--vector-icons` · `--drawer`', 'RTL + Arabic · light / dark theme · Material Design icons · side drawer'],
          ['`--auth-email` · `--auth-mobile`', 'email auth (default on) · mobile OTP auth'],
          ['`--social-auth`', '`none` · `all` · comma list of `google,facebook,apple`'],
          ['`--google-web-client-id` · `--google-ios-client-id`', 'Google Sign-In client ids'],
          ['`--facebook-app-id` · `--facebook-client-token` · `--facebook-app-secret`', 'Facebook Login (secret: backend only)'],
          ['`--apple-service-id`', 'Sign in with Apple Services ID (optional)'],
          ['`--socket` · `--chat` · `--group-chat`', 'Socket.io client · chat · group chat'],
          ['`--audio-call` · `--video-call`', 'Agora calling (one-to-one + group)'],
          ['`--notifications` · `--analytics`', 'FCM + Notifee push (default on) · Firebase Analytics'],
          ['`--firebase-android <path>` · `--firebase-ios <path>`', 'install `google-services.json` / `GoogleService-Info.plist`'],
          ['`--terms` · `--delete-account`', 'legal links (default on) · Profile → Delete account (default on)'],
          ['`--google-location`', 'current location + Google Places search'],
          ['`--ota`', 'Over-The-Air updates'],
          ['`--iap`', '`none` · `iap` · `adapty`'],
          ['`--payment-gateway`', '`none` · `stripe` · `razorpay` · `paypal`'],
          ['`--admin-panel` · `--admin-tech-stack`', 'generate the admin panel · `react` · `next`'],
        ]}
      />

      <H2>Backend</H2>
      <Table
        head={['Flag', 'Values / meaning']}
        rows={[
          ['`--backend-framework`', '`nestjs` · `express`'],
          ['`--backend-architecture`', '`feature-based` · `layered` · `clean` · `mvc` · `modular` · `enterprise`'],
          ['`--backend-database`', '`postgresql` · `mysql` · `mongodb`'],
          ['`--backend-orm`', '`prisma` · `typeorm` (SQL) · `mongoose` (MongoDB)'],
          ['`--backend-auth`', '`none` · `jwt` · `access-refresh` · `refresh-rotation`'],
          ['`--auth-methods`', 'comma list of `email,mobile,google,facebook,apple` (`otp` = `mobile`)'],
          ['`--password-hashing`', '`bcrypt` · `argon2` · `configurable`'],
          ['`--modules`', 'comma list of `chat,notifications,audio-call,video-call`, or `none`'],
          ['`--deployment`', '`monolith` · `microservices`'],
          ['`--redis` · `--docker` · `--swagger`', 'Redis · Dockerfile + docker-compose · Swagger UI (default on)'],
          ['`--security`', '`all` · `none` · comma list of `helmet,cors,rate-limit,auth-rate-limit,body-limit,sanitize,account-lockout`'],
          ['`--firebase-service-account <path>`', 'copied into the backend for push / call notifications'],
          ['`--agora-app-id` · `--agora-app-certificate`', 'Agora keys for call tokens'],
        ]}
      />
      <Callout type="tip">Not sure? Run with `--dry-run` first – it prints the files, folders and dependencies without writing anything.</Callout>
    </>
  );
}

export function Troubleshooting() {
  return (
    <>
      <Table
        head={['Problem', 'Fix']}
        rows={[
          ['`Node … is not supported`', 'Install Node ≥ 22.13'],
          ['`npx` / network errors during init', 'Check your connection / proxy – the React Native CLI is downloaded on every run'],
          ['`… already exists and is not empty`', 'Pick another `--name` / `--directory`, answer *Yes* to the overwrite question, or pass `--force`'],
          ['`npm install` or `pod install` failed', 'The project is kept – run the command yourself in the project folder'],
          ['Docker: `port is already allocated`', 'Start with `npm run docker:up` – it moves to a free port and updates `.env` ([Docker & Ports](docker))'],
          ['App can\'t reach the backend', '`API_BASE_URL` must be reachable from the device (LAN IP, same Wi-Fi); add the admin URL to the backend `CORS_ORIGINS`'],
          ['`.env` change has no effect', 'Restart Metro with `npm start -- --reset-cache`'],
          ['`ENCRYPTION_KEY_MISMATCH`', 'Stale bundle – `--reset-cache` and rebuild; key / IV must match in every project'],
          ['Push notifications don\'t arrive', 'Follow the app\'s `firebase/README.md`; iOS needs the APNs key in Firebase and a real device'],
          ['Notifications were refused', 'Tap *Enable notifications* again – the app asks again or offers the Settings screen'],
          ['iOS doesn\'t ring when the app is killed', 'Set the `APNS_*` values in the backend `.env`, test on a real device'],
          ['OTA update modal never shows', 'Install a **release** build – debug builds always load JavaScript from Metro'],
          ['`Database not reachable, retrying…`', 'Check `DATABASE_URL` and that the database runs (`npm run docker:up`)'],
        ]}
      />
      <P>Still stuck? Open an issue on [GitHub](https://github.com/ankitjha61010/React_native_project_genrator/issues) with the command you ran and the output, or email [abhishek61010@gmail.com](mailto:abhishek61010@gmail.com).</P>
    </>
  );
}

export function Examples() {
  return (
    <>
      <P>Copy-paste commands for typical projects. All of them run without questions (`--yes`) – drop `--yes` to answer the rest interactively.</P>

      <H2>Mobile app with chat, calling and push</H2>
      <Code
        code={`npx rn-architecture-generator --type frontend --yes \\
  --name FastRoute --package com.example.fastroute --directory ~/projects \\
  --architecture feature-based --state zustand \\
  --chat --group-chat --audio-call --video-call --notifications \\
  --firebase-android ./google-services.json --firebase-ios ./GoogleService-Info.plist`}
      />

      <H2>Backend only – NestJS microservices</H2>
      <Code
        code={`npx rn-architecture-generator --type backend --yes --name my-api \\
  --backend-framework nestjs --backend-architecture clean \\
  --backend-database postgresql --backend-orm prisma \\
  --backend-auth refresh-rotation --password-hashing argon2 \\
  --auth-methods email,mobile,google --modules chat,notifications \\
  --deployment microservices --security all --swagger --docker`}
      />

      <H2>Full stack – app + Express / MongoDB + Next.js admin</H2>
      <Code
        code={`npx rn-architecture-generator --type fullstack --yes \\
  --name FastRoute --package com.example.fastroute \\
  --chat --audio-call --video-call --notifications \\
  --admin-panel --admin-tech-stack next \\
  --backend-framework express --backend-database mongodb --backend-orm mongoose --docker \\
  --agora-app-id <AGORA_APP_ID> --agora-app-certificate <AGORA_APP_CERTIFICATE>`}
      />
      <P>Then, from the project root:</P>
      <Code
        code={`cd FastRoute
npm run db        # database + Redis in Docker (free ports)
npm run backend   # API: http://localhost:3000/api/v1 · Swagger: /api/docs
npm run admin     # admin panel: http://localhost:5173
npm run android   # or: npm run ios`}
      />

      <H2>E-commerce app with payments</H2>
      <Code
        code={`npx rn-architecture-generator --type fullstack --yes \\
  --name ShopApp --package com.example.shop \\
  --architecture clean --state redux \\
  --payment-gateway stripe --iap iap --admin-panel \\
  --backend-framework nestjs --backend-database postgresql --backend-orm prisma`}
      />

      <H2>Minimal starter</H2>
      <Code
        code={`npx rn-architecture-generator --type frontend --yes --name Starter \\
  --no-notifications --no-terms --no-delete-account`}
      />

      <H2>Preview first</H2>
      <List items={['Add `--dry-run` to any command to see the plan without writing files.', 'Add `--no-install --no-pods` for a fast generation when you only want to look at the code.']} />
    </>
  );
}

export function Contributing() {
  return (
    <>
      <Code
        code={`git clone https://github.com/ankitjha61010/React_native_project_genrator.git
cd React_native_project_genrator
npm install
npm run build          # compiles src/ → dist/ (the CLI runs dist/)
npm test               # unit tests (Vitest)
npm run typecheck
node bin/cli.js --dry-run`}
      />
      <H2>How templates work</H2>
      <List
        items={[
          'Templates: `templates/common` (app), `templates/state`, `templates/backend/{root,shared,express,nestjs}`, `templates/admin/{react,next}`.',
          'App files are listed in `src/config/manifest.ts`, backend files in `src/backend/manifest.ts`.',
          'Templates use `{{#if FLAG}}` blocks and `{{IMPORT:id}}` paths, so every file works in every architecture.',
          'Package versions are pinned per React Native profile in `src/config/reactNativeVersions.ts`.',
        ]}
      />
      <H2>This documentation</H2>
      <P>The site lives in `website/` (Next.js, static export). Pages are in `website/content/`, navigation in `website/lib/site.ts`.</P>
      <Code
        code={`cd website
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in website/out`}
      />
    </>
  );
}

export function Changelog() {
  return (
    <>
      <P>{`The latest version is **${latest.version}**. Every release is on [npm](https://www.npmjs.com/package/rn-architecture-generator?activeTab=versions).`}</P>
      <H2>Install a specific version</H2>
      <Code
        code={`npx rn-architecture-generator@latest       # newest (${latest.version})
npx rn-architecture-generator@1.0.0        # an older release

npm install -g rn-architecture-generator@${latest.version}
yarn global add rn-architecture-generator@${latest.version}

rn-architecture-generator --version        # check what you have`}
      />
      <Table
        head={['Version', 'Released', 'Summary']}
        rows={releases.map(release => [`[v${release.version}](/docs/changelog/#${versionAnchor(release.version)})`, release.date.replace(/-/g, '\u2011'), release.summary])}
      />
      {releases.map(release => (
        <section key={release.version} className="release">
          <h2 id={versionAnchor(release.version)} className="doc-h2">
            <a href={`#${versionAnchor(release.version)}`}>v{release.version}</a>
            {release === latest ? <span className="tag tag-green">latest</span> : null}
            <small className="release-date">{release.date}</small>
          </h2>
          <p>{md(release.summary)}</p>
          {release.groups.map(group => (
            <div key={group.title}>
              <h3 className="doc-h3">{group.title}</h3>
              <List items={group.items} />
            </div>
          ))}
        </section>
      ))}
      <Callout type="tip">Already generated a project with an older version? The generator creates new projects – existing ones don&apos;t change. Generate again (or compare with a fresh project) to pick up the fixes.</Callout>
    </>
  );
}
