import { CardGrid, Callout, Code, H2, H3, List, P, Steps, Table } from '@/components/Doc';
import { InstallTabs } from '@/components/InstallTabs';

export function Introduction() {
  return (
    <>
      <P>
        `rn-architecture-generator` is an **interactive command-line tool**. It asks you a series of questions and writes a complete, ready-to-run
        project to disk: a React Native app, a matching Node.js backend and a web admin panel – already wired together.
      </P>
      <Code code="npx rn-architecture-generator" />

      <H2>What you can generate</H2>
      <P>The first question of the wizard decides what you get:</P>
      <Table
        head={['Mode', 'What you get']}
        rows={[
          ['**Frontend**', 'A React Native **0.87** (TypeScript) app for Android & iOS – 8 architectures, navigation, state management, auth, chat, audio/video calling, push notifications, payments, i18n / RTL… Optional web **Admin Panel**.'],
          ['**Backend**', 'A **NestJS** or **Express** API – 6 architectures, **PostgreSQL / MySQL / MongoDB** (Prisma, TypeORM, Mongoose), auth, chat, calling, notifications, payments, Swagger and tests – as a **monolith** or **microservices**.'],
          ['**Frontend + Backend**', 'All of it in one folder (`mobile/`, `backend/`, `admin/`). The backend implements exactly the API the app calls – same payloads, same encryption key.'],
        ]}
      />
      <Callout type="tip" title="Only what you pick">
        Every feature is optional. Features you don't select leave no code, no screens and no packages behind – and every generated project gets its own README describing only the features you chose.
      </Callout>

      <H2>What problem it solves</H2>
      <P>Starting a production React Native app usually means days of setup before the first real feature:</P>
      <List
        items={[
          'choosing and agreeing on a folder structure,',
          'adding navigation, state management, storage and an API client,',
          'wiring Firebase push notifications and patching native Android / iOS files,',
          'building authentication, chat, calling and payments from scratch – and a backend for all of it.',
        ]}
      />
      <P>
        The generator does all of this in one run. Native files – AndroidManifest, Gradle, Info.plist, Podfile, AppDelegate, entitlements and the Xcode
        project – are patched for every selected feature.
      </P>

      <H2>How the pieces fit together</H2>
      <List
        items={[
          '**REST** at `API_BASE_URL` (e.g. `http://localhost:3000/api/v1`) handles requests and actions. Every response uses one envelope: `{ success, message, data, meta }` – the app unwraps it automatically.',
          '**Socket.IO** (same host and port as the API) delivers live events: new messages, typing, presence, incoming calls and new notifications.',
          '**Admin panel** signs in with the same API and only allows users with the `ADMIN` role.',
          '**API encryption** (optional): the same AES-256 key and IV in the app, the backend and the admin panel – fullstack mode generates matching ones.',
        ]}
      />

      <H2>How the generator works</H2>
      <List
        ordered
        items={[
          'Checks the Node version, the React Native profile and that `npm` / `npx` are available.',
          'Renders **every** template in memory first – templates use `{{#if FLAG}}` blocks and `{{IMPORT:id}}` paths, so each feature works in every architecture.',
          'Runs `@react-native-community/cli init`, then writes the architecture files, fonts and exact dependency versions.',
          'Patches native files feature by feature (Firebase, notifications, chat, calling, OTA, location, social login).',
          'If anything up to here fails, the project folder is deleted ("rolled back").',
          'Runs `npm install`, `pod install` and `git init` – a failure here is only a warning and the project is kept.',
        ]}
      />

      <H2>Where to go next</H2>
      <CardGrid
        cards={[
          { icon: 'code', title: 'Installation', body: 'Requirements and npx / npm / yarn install.', href: 'installation' },
          { icon: 'rocket', title: 'Quick Start', body: 'Your first project in a few minutes.', href: 'quick-start' },
          { icon: 'layers', title: 'Architectures', body: 'The 8 mobile folder structures.', href: 'architectures' },
          { icon: 'terminal', title: 'CLI Reference', body: 'Every flag for CI and scripts.', href: 'cli-reference' },
        ]}
      />
    </>
  );
}

export function Installation() {
  return (
    <>
      <H2>Install</H2>
      <P>Run it once with `npx` (always the latest version), or install it globally with npm or yarn:</P>
      <InstallTabs />
      <Code
        code={`# Run without installing (recommended)
npx rn-architecture-generator

# Or install globally …
npm install -g rn-architecture-generator
# … or with yarn
yarn global add rn-architecture-generator

# … then run it from anywhere
rn-architecture-generator`}
      />
      <P>You can also add it to a project as a dev dependency and call it through a script:</P>
      <Code
        code={`npm install --save-dev rn-architecture-generator
# or
yarn add --dev rn-architecture-generator

npx rn-architecture-generator --dry-run`}
      />
      <Callout type="warning" title="npm is required">
        Installing the CLI with yarn is fine, but the generator itself uses **npm / npx** to create the projects (React Native CLI, `npm install`). Make sure `npm` is on your `PATH` – yarn and pnpm are not used inside generated projects.
      </Callout>

      <H2>Pick a version</H2>
      <P>{'`npx rn-architecture-generator` always runs the newest release. To use or pin a specific one, add `@<version>` – every release and what changed is in the [Changelog](changelog).'}</P>
      <Code
        code={`npx rn-architecture-generator@1.0.2
npm install -g rn-architecture-generator@1.0.2
yarn global add rn-architecture-generator@1.0.2`}
      />

      <H2>Requirements</H2>
      <H3>For running the generator</H3>
      <Table
        head={['Requirement', 'Details']}
        rows={[
          ['**Node.js**', '**≥ 22.13.0** – checked before generating'],
          ['**npm / npx**', 'Must be on your `PATH`'],
          ['**OS**', 'macOS, Linux or Windows. iOS builds need macOS.'],
          ['**Internet**', 'The React Native CLI (`@react-native-community/cli@20.2.0`) and all packages are downloaded'],
          ['Git', 'Optional – initial commit (skipped if git is missing)'],
          ['CocoaPods / Bundler', 'Optional, macOS only – `pod install`'],
          ['Terminal', 'Interactive mode needs a TTY. In CI use `--yes` and flags.'],
        ]}
      />
      <H3>For running the generated projects</H3>
      <Table
        head={['Project', 'You need']}
        rows={[
          ['Mobile app – Android', 'JDK 17, Android Studio (Android SDK), Watchman on macOS'],
          ['Mobile app – iOS', 'macOS, Xcode, CocoaPods'],
          ['Backend', 'Node ≥ 22.13 and a PostgreSQL / MySQL / MongoDB server – or Docker (`--docker`). Redis is optional for a monolith and required for microservices.'],
          ['Admin panel', 'Node ≥ 22.13'],
        ]}
      />

      <H2>Run from a clone</H2>
      <P>The CLI runs the compiled code in `dist/`, which is git-ignored – build once after cloning:</P>
      <Code
        code={`git clone https://github.com/ankitjha61010/React_native_project_genrator.git
cd React_native_project_genrator
npm install
npm run build        # compile src/ → dist/
npm run generate     # same as: node bin/cli.js`}
      />

      <H2>Check the installation</H2>
      <Code
        code={`rn-architecture-generator --version
rn-architecture-generator --help      # every flag
rn-architecture-generator --dry-run   # preview – writes nothing`}
      />
    </>
  );
}

export function QuickStart() {
  return (
    <>
      <P>The fastest way to see what the generator does: preview a project, then generate it for real.</P>
      <Steps
        steps={[
          { title: 'Preview (writes nothing)', body: 'Walk through the wizard and see the files, folders and dependencies that would be created.', code: 'npx rn-architecture-generator --dry-run' },
          {
            title: 'Generate',
            body: 'Answer **What do you want to generate?** – *Frontend*, *Backend* or *Frontend + Backend* – then the questions for the features you want. An architecture shows a folder preview before you confirm it.',
            code: 'npx rn-architecture-generator',
          },
          {
            title: 'Run the app',
            body: 'Set `API_BASE_URL` in the app `.env` first (on a real device use your computer\'s LAN IP).',
            code: `cd MyApp
npx react-native run-android
npx react-native run-ios        # macOS`,
          },
          {
            title: 'Run the backend',
            body: 'See the backend README for your database / ORM. With Docker the database starts on a free port.',
            code: `cd my-api
npm run docker:up        # only with --docker
npm run db:deploy        # SQL: apply migrations
npm run db:seed          # creates the admin user
npm run dev              # http://localhost:3000/api/v1 · Swagger: /api/docs`,
          },
        ]}
      />

      <H2>Full stack in one folder</H2>
      <P>With *Frontend + Backend* everything lands in one folder with root scripts:</P>
      <Code
        code={`MyApp/
├── mobile/        React Native app (API URL preset to http://localhost:3000/api/v1)
├── backend/       API server (monolith, or gateway + services/ for microservices)
├── admin/         Admin panel (only if you chose it)
├── package.json   backend · mobile · android · ios · admin · db · test
└── README.md`}
        lang="text"
        title="project"
      />
      <Code
        code={`npm run db        # database containers (with --docker)
npm run backend   # start the API
npm run mobile    # start Metro
npm run android   # run the app on Android
npm run ios       # run the app on iOS
npm run admin     # admin panel – http://localhost:5173`}
      />

      <H2>What the wizard asks</H2>
      <Table
        head={['Mode', 'Questions (in order)']}
        rows={[
          ['**Frontend**', 'app name → package name (also the iOS bundle id) → location → app icon image → splash image (+ background colour, full screen or logo size) → architecture → state management → storage → API encryption → RTL → theme → vector icons → email auth → mobile OTP → Google / Facebook / Apple login → chat → group chat → audio calls → video calls → Socket.io → push notifications → Firebase files → analytics → terms → delete account → Google Location → drawer → OTA → in-app purchases → payment gateway → admin panel → install / pods / git'],
          ['**Backend**', 'name → location → framework → architecture → authentication & sign-in methods → password hashing → database → ORM → modules → deployment → Redis → Docker → security → encryption → Swagger → Firebase service account & Agora keys → summary (*Yes* · *Go back and modify* · *Cancel*)'],
          ['**Frontend + Backend**', 'The app questions, then only the backend questions the app doesn\'t already answer'],
        ]}
      />
      <Callout type="tip" title="Picked a wrong answer?">
        {'Every question has **← Back** at the bottom of the list (in text questions type `<`). The previous question comes back with your answer pre-selected – everything before it is kept.'}
      </Callout>
      <P>Pointing the wizard at a folder that already holds a generated app offers *Update the app icon / splash screen only*. To change a generated app later, run `icon`, `splash` or `rename` inside it – see [Change them later](/docs/branding/#change-them-later) and [Rename a Project](rename).</P>
      <Callout title="Rules applied automatically">
        Chat or calling turns on Socket.io and vector icons · group chat needs chat · the Redux architecture uses Redux Toolkit · microservices need authentication and always use Redis.
      </Callout>
      <P>Prefer no questions at all? See [Full Stack Example](examples) and the [CLI Reference](cli-reference).</P>
    </>
  );
}
