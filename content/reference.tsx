import { Callout, Code, H2, List, P, Table, md } from '@/components/Doc';
import { latest, releases, upcoming, versionAnchor } from '@/lib/versions';

export function CliReference() {
  return (
    <>
      <P>Without flags the CLI runs the interactive wizard. Flags pre-answer questions; `--yes` uses defaults for everything not passed (then `--name` is required). Every on/off option also has a `--no-…` form, e.g. `--no-notifications`.</P>
      <Code
        code={`npx rn-architecture-generator --help          # every flag
npx rn-architecture-generator --list          # every command and what it does
npx rn-architecture-generator icon --help     # icon / splash / rename options`}
      />
      <P>Commands at a glance: [All Commands](commands). Changing a generated project: `icon`, `splash` ([App Icon & Splash](/docs/branding/#change-them-later)) and `rename` ([Rename a Project](rename)).</P>

      <H2>General</H2>
      <Table
        head={['Flag', 'Values / meaning']}
        rows={[
          ['`--type <type>`', '`frontend` · `backend` · `fullstack`'],
          ['`-n, --name <name>`', 'app name (letters / digits, starts with a letter), e.g. `FastRoute`'],
          ['`-p, --package <id>`', 'Android package / iOS bundle id, e.g. `com.example.fastroute`'],
          ['`-d, --directory <path>`', 'parent folder the project folder is created in (default `./`)'],
          ['`--app-icon <path>`', 'square PNG / JPG / WebP (1024×1024 recommended) → every Android & iOS app icon of the **new** project – [App Icon & Splash](branding). For an existing app use the `icon` command'],
          ['`--splash-image <path>`', 'full-screen portrait image (e.g. 1290×2796) → native splash on Android & iOS'],
          ['`--splash-background <hex>`', 'colour around the splash image + Android 12+ start screen (default: the image\'s dominant colour)'],
          ['`--splash-logo-width <dp>` · `--splash-logo-height <dp>`', 'show the splash image as a centred logo of this size (one side → the other follows the image) – default: full screen'],
          ['`--rn-version <v>`', '`0.87.1` (default) · `0.87` · `0.86.3` · `0.86`'],
          ['`--dry-run`', 'show what would be generated, write nothing'],
          ['`-y, --yes`', 'non-interactive, defaults for everything not passed'],
          ['`-f, --force`', 'replace the target folder if it exists'],
          ['`--allow-dirty`', 'update the icon / splash of an existing app even with uncommitted git changes (not recommended)'],
          ['`--no-install` · `--no-pods` · `--no-git`', 'skip `npm install` · `pod install` (macOS) · git init'],
          ['`--list`', 'every command and what it does'],
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
      <H2>icon · splash</H2>
      <P>Change an existing app in place – run inside it (or pass `--directory`). The project must be committed first (pushing is not required).</P>
      <Table
        head={['Argument / flag', 'Values / meaning']}
        rows={[
          ['`icon <image>`', 'square PNG / JPG / WebP (1024×1024 recommended) → every Android & iOS app icon'],
          ['`splash <image>`', 'full-screen portrait image (e.g. 1290×2796), or a logo with `--logo-width`'],
          ['`-b, --background <hex>`', '`splash` only: colour around the image + Android 12+ start screen (default: the image\'s dominant colour)'],
          ['`-w, --logo-width <dp>` · `-h, --logo-height <dp>`', '`splash` only: show the image as a centred logo of this size – default: full screen'],
          ['`-d, --directory <path>`', 'the project, or a full-stack folder with `mobile/` (default `.`)'],
          ['`--allow-dirty`', 'skip the git check (uncommitted changes) – not recommended'],
        ]}
      />

      <H2>rename</H2>
      <Table
        head={['Argument / flag', 'Values / meaning']}
        rows={[
          ['`rename <new-name>`', 'the new app name (letters / digits, starts with a letter) – asked when left out'],
          ['`-d, --directory <path>`', 'the project to rename, or a full-stack folder with `mobile/` (default `.`)'],
          ['`--display-name <name>`', 'name under the app icon (default: the new name split into words – `HeApp` → *He App*)'],
          ['`-p, --package <id>`', 'also change the Android package / iOS bundle id (default: keep it)'],
          ['`--dry-run` · `-y, --yes`', 'show the plan only · no questions, no confirmation'],
          ['`--allow-dirty`', 'skip the git check (uncommitted changes) – not recommended'],
        ]}
      />
      <Callout type="tip">Not sure? Run with `--dry-run` first – it prints the files, folders and dependencies without writing anything.</Callout>
    </>
  );
}

export function Commands() {
  return (
    <>
      <P>Everything the CLI can do, grouped by job. The same list is in your terminal with `npx rn-architecture-generator --list`; every flag is in the [CLI Reference](cli-reference).</P>
      <Code code="npx rn-architecture-generator --list" />

      <H2>Create a project</H2>
      <Table
        head={['Command', 'What it does']}
        rows={[
          ['`npx rn-architecture-generator`', 'Interactive wizard – frontend, backend or both. Every question has **← Back** (type `<` in text questions) to change the previous answer'],
          ['`… --type frontend --name MyApp --yes`', 'React Native app without questions – defaults for everything not passed'],
          ['`… --type backend --name my-api --yes`', 'NestJS / Express API without questions'],
          ['`… --type fullstack --name MyApp --yes`', 'App + backend (+ admin panel) in one folder, already connected'],
          ['`… --dry-run`', 'Show what would be generated – files, dependencies – and write nothing'],
        ]}
      />

      <H2>Change an existing project</H2>
      <P>Run these **inside the project** (`cd MyApp`) – or from anywhere with `--directory ./MyApp`. The project is changed in place; a new project is never created.</P>
      <Table
        head={['Command', 'What it does']}
        rows={[
          ['`… icon ./icon.png`', 'Replace the app icon (Android + iOS) – nothing else is touched. [App Icon & Splash](/docs/branding/#change-them-later)'],
          ['`… splash ./splash.png`', 'Replace the splash screen (native + JS); `--background "#0B1020"`, `--logo-width 200` for a centred logo'],
          ['`… rename HeApp`', 'Rename the project: folder, Android, iOS, code and texts – package id kept. [Rename a Project](rename)'],
          ['`… rename HeApp --package com.example.heapp`', 'Rename and also change the Android package / iOS bundle id'],
        ]}
      />
      <Callout type="warning">**Commit first.** These commands stop with an error when the project has uncommitted changes or is not in a git repository (pushing is not required) – so every change they make shows up in `git diff` and can be undone with `git checkout . && git clean -fd`. `--allow-dirty` skips the check.</Callout>

      <H2>Help</H2>
      <Table
        head={['Command', 'What it does']}
        rows={[
          ['`… --list`', 'Every command and what it does'],
          ['`… --help` · `… icon --help` · `… splash --help` · `… rename --help`', 'Every option of the generator · of each command'],
          ['`… --version`', 'The installed version'],
        ]}
      />
      <P>`…` stands for `npx rn-architecture-generator`.</P>
    </>
  );
}

export function RenameProject() {
  return (
    <>
      <P>Created `myapp` and now it should be called `heapp`? One command renames the generated project everywhere – folder, Android, iOS, code and texts.</P>
      <Code
        code={`cd myapp
git status                                   # must be clean (everything committed)
npx rn-architecture-generator rename heapp

# with a display name and a new package / bundle id, from outside the project
npx rn-architecture-generator rename HeApp --directory ./myapp --display-name "He App" --package com.example.heapp`}
      />
      <Callout type="warning">The project must be committed first – otherwise `rename` stops with the files that are not committed. Pushing is not required. Review the rename with `git diff`. `--allow-dirty` skips the check.</Callout>
      <P>Interactive, it shows the plan (old → new) and asks before changing anything; `--yes` skips the questions, `--dry-run` only shows the plan.</P>

      <H2>What is renamed</H2>
      <Table
        head={['Where', 'What']}
        rows={[
          ['Project', 'the folder (`myapp/` → `heapp/`), `app.json` (name + display name), `package.json`, README'],
          ['Android', '`strings.xml` app name, `MainActivity` component name, Kotlin / Java code; with `--package` also `namespace`, `applicationId`, `settings.gradle` and the source folders (`java/com/myapp` → `java/com/example/heapp`)'],
          ['iOS', '`ios/myapp/` → `ios/heapp/`, `.xcodeproj`, `.xcworkspace`, the scheme, `Podfile` target, `AppDelegate` module name, `Info.plist` display name and permission texts; with `--package` the bundle id'],
          ['App code', 'app name in `appConfig`, i18n `appName` (every language), other texts'],
          ['Full-stack', '`mobile/`, `backend/` (package name, API title, logger…) and `admin/` together; a frontend-only project\'s `<name>-admin` folder too'],
        ]}
      />

      <H2>What is kept on purpose</H2>
      <Table
        head={['Kept', 'Why']}
        rows={[
          ['Package / bundle id', 'The stores and Firebase know the app by it – only changed with `--package` (then it is a new app for them)'],
          ['`.env` files', 'They hold database URLs and JWT issuers – renaming would disconnect data or sign everybody out. Files that still mention the old name are listed'],
          ['Storage keys', 'Installed apps keep their signed-in session'],
          ['Lock files, `Pods/`', '`npm install` / `pod install` update them; old build output (`ios/build`, `android/app/build`, `.cxx`) is deleted'],
        ]}
      />

      <H2>After renaming</H2>
      <Code
        code={`cd heapp            # (full-stack: heapp/mobile)
npm install
cd ios && bundle exec pod install && cd ..
npm start -- --reset-cache
npx react-native run-android   # or run-ios`}
      />
      <Callout type="warning">With `--package`, add the new id to your Firebase project (and Apple Developer, Google / Facebook login) and replace `google-services.json` / `GoogleService-Info.plist` – the Android build fails until the Firebase file matches the package.</Callout>
      <Callout type="tip">Launchers cache app names – uninstall the old build if the name under the icon doesn&apos;t change.</Callout>
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
          ['`… already exists and is not empty`', 'Pick another `--name` / `--directory`, answer *Yes* to the overwrite question, or pass `--force`. To change only the icon / splash of that app, run `icon` / `splash` inside it'],
          ['`… is already a React Native project – a new project would be created inside it`', 'You ran the generator inside an app. To change it, use `icon <image>` / `splash <image>` / `rename <name>`; to create a new app, `cd ..` or pass `--directory`'],
          ['`uncommitted changes` / `not a git repository`', '`icon`, `splash` and `rename` only change a committed project: `git add -A && git commit -m "…"`, then run again (`--allow-dirty` skips the check)'],
          ['Picked a wrong answer in the wizard', 'Choose **← Back** (or type `<` in a text question) – the previous question comes back with your answer pre-selected'],
          ['Android shows the logo again after the splash', 'Fixed in newer versions – update an existing app with `splash <image>` ([Change them later](/docs/branding/#change-them-later)); its JS splash becomes transparent so only the native splash is seen'],
          ['Old name still shows under the icon after `rename`', 'Uninstall the old build – launchers cache the name; run `pod install` and `npm start -- --reset-cache`'],
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
      {upcoming.length ? (
        <section className="release">
          <h2 id="upcoming" className="doc-h2">
            <a href="#upcoming">Upcoming</a>
            <small className="release-date">not on npm yet</small>
          </h2>
          {upcoming.map(group => (
            <div key={group.title}>
              <h3 className="doc-h3">{group.title}</h3>
              <List items={group.items} />
            </div>
          ))}
        </section>
      ) : null}
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
      <Callout type="tip">Already generated a project with an older version? Existing projects don&apos;t change by themselves – generate again (or compare with a fresh project) to pick up fixes. The app icon / splash can be updated in place: [Change them later](branding).</Callout>
    </>
  );
}
