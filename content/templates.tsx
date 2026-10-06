import { Callout, CardGrid, Code, H2, H3, List, P, Table } from '@/components/Doc';

export function ReactNativeApp() {
  return (
    <>
      <P>
        The mobile template is a React Native **0.87.1** app (0.86.3 also supported) with React **19.2** and TypeScript, created with the official
        `@react-native-community/cli init` and then extended. Everything below is generated only when you select it.
      </P>

      <H2>Features</H2>
      <Table
        head={['Area', "What's included"]}
        rows={[
          ['**Architectures**', 'Atomic Design · Feature-Based · Layered · Clean · MVC · MVVM · Redux · Modular – see [Mobile Architectures](architectures)'],
          ['**State / storage**', 'Redux Toolkit · Zustand · Context API · none — MMKV or AsyncStorage'],
          ['**Navigation**', 'Splash → Auth / Main, bottom tabs, optional side drawer, typed routes'],
          ['**Auth**', 'Email + password (sign up, sign in, forgot / reset / change password), mobile number + OTP, **Google**, **Facebook**, **Apple**, logout, delete account, session restore, automatic token refresh'],
          ['**Profile & settings**', 'Profile with avatar upload, edit profile, settings (language, light / dark theme), optional Google Places location'],
          ['**Chat**', 'One-to-one and **group** chat, photos / videos / documents / voice messages, photo editor, on-device **video trimmer**, reply, edit, delete, typing, online / last seen, read ticks, unread counts, search, block users'],
          ['**Media viewer**', 'Zoomable images, native video player, in-app PDF viewer – no web views'],
          ['**Calling**', '**Audio and video**, one-to-one and **group**, via **Agora** · iOS **CallKit + PushKit** · Android native full-screen incoming call · call history · draggable minimised call'],
          ['**Notifications**', 'Firebase Cloud Messaging + Notifee, inbox with unread badge, deep links, optional Firebase Analytics'],
          ['**Payments**', 'In-app purchases (**react-native-iap** or **Adapty**) and/or **Stripe**, **Razorpay**, **PayPal**'],
          ['**More**', 'i18n (English, Hindi + Arabic with RTL), light / dark theme, AES API encryption, OTA updates, Terms & Privacy links, permissions, flash messages, custom fonts & vector icons'],
        ]}
      />

      <H2>Screens</H2>
      <CardGrid
        cards={[
          { icon: 'lock', title: 'Auth', body: 'Login, Register, Forgot / Reset Password, Mobile login, OTP verify.' },
          { icon: 'home', title: 'Main', body: 'Home, Profile, Edit Profile, Change Password, Settings, Notifications, WebView.' },
          { icon: 'wifi', title: 'Chat', body: 'Chat list, chat room, new chat, create group, group / chat details, blocked users.' },
          { icon: 'phone', title: 'Calls', body: 'Outgoing, incoming, audio & video call screens, call history.' },
        ]}
      />

      <H2>Shared components</H2>
      <P>
        `AppText`, `AppButton`, `AppInput`, `AppLoader`, `AppScreen`, `AppHeader`, `AppIcon`, `AppWebView`, `PhoneInput`, `CountryPicker`,
        `MediaPickerModal`, `MediaEditorModal` – themed, translated and RTL aware.
      </P>
      <List
        items={[
          '`AppScreen` handles safe areas, scrolling and the **keyboard**: it keeps the focused input above the keyboard on iOS and Android (edge to edge) – no `KeyboardAvoidingView` needed in your screens.',
          '`AppIcon` (Material Design Icons) mirrors directional icons – arrows, chevrons, send, reply, logout – automatically in RTL.',
          '`AppText` / `AppInput` take translation keys: `<AppText intlType="auth" value="login" />`.',
        ]}
      />

      <H2>Internationalisation & RTL</H2>
      <P>
        {'Translations live in `i18n/locales/<lang>/*.json` (English, Hindi, and Arabic with `--rtl`). Switching between LTR and RTL is **live** – no app restart: the direction is kept in JS, and the root view and `NavigationContainer` follow it. Write styles with `start` / `end` instead of `left` / `right`.'}
      </P>

      <H2>Environment</H2>
      <Table
        head={['Key', 'Meaning']}
        rows={[
          ['`API_BASE_URL`', 'Backend URL, e.g. `http://localhost:3000/api/v1`. On a real device use your LAN IP; on the Android emulator `localhost` is rewritten to `10.0.2.2`.'],
          ['`SOCKET_URL`', 'Defaults to the origin of `API_BASE_URL`'],
          ['`IMAGE_BASE_URL`', 'Prefix for uploaded files (`/uploads/…`); empty = origin of `API_BASE_URL`'],
          ['`API_ENCRYPTION_KEY` / `IV`', 'Only with API encryption – must match the backend'],
        ]}
      />
      <Callout type="warning">After changing `.env`, restart Metro with `npm start -- --reset-cache` – values are bundled at build time.</Callout>

      <H2>Native setup done for you</H2>
      <P>
        AndroidManifest permissions and services, Gradle plugins (Google Services), Info.plist usage descriptions and URL schemes, Podfile permission
        handlers, AppDelegate, entitlements (push, Sign in with Apple) and the Xcode project – patched only for the features you selected.
      </P>
    </>
  );
}

export function Backend() {
  return (
    <>
      <P>
        {'The backend template is a **NestJS** or **Express** API in TypeScript, with a versioned REST API (`/api/v1`), Socket.IO on the same port, and one response envelope `{ success, message, data, meta }`. Generate it alone (*Backend*) or together with the app (*Frontend + Backend*).'}
      </P>

      <H2>Choices</H2>
      <Table
        head={['Option', 'Values']}
        rows={[
          ['Framework', '`nestjs` · `express`'],
          ['Architecture', '`feature-based` · `layered` · `clean` · `mvc` · `modular` · `enterprise` – see [Monolithic Setup](monolith)'],
          ['Database / ORM', 'PostgreSQL · MySQL (Prisma or TypeORM) · MongoDB (Mongoose) – see [Database Support](database)'],
          ['Authentication', 'none · JWT · access + refresh · refresh **rotation** – see [Authentication](authentication)'],
          ['Modules', 'chat, group chat, audio / video calling, push notifications, terms, delete account, payments'],
          ['Deployment', '**monolith** or **microservices** – see [Microservices Setup](microservices)'],
          ['Extras', 'Redis · Docker · Swagger · security middleware · API encryption'],
        ]}
      />

      <H2>Routes</H2>
      <Table
        head={['Group', 'Main routes']}
        rows={[
          ['Health', '`GET /health`'],
          ['Auth', '`POST /auth/register`, `login`, `otp/send`, `otp/verify`, `social`, `refresh`, `logout`, `logout-all`, `change-password`, `forgot-password`, `reset-password`, `verify-email`; `GET /auth/me`'],
          ['Users', '`PATCH /users/me`, `POST|DELETE /users/me/avatar`, `DELETE /users/me`, `GET /users/search`; admin: `GET /users`, `GET|PATCH|DELETE /users/:id`'],
          ['Chat', 'Conversations and messages, read, clear, block / unblock, groups (`/chat/groups…`), uploads (`/chat/upload`, `/chat/upload-voice`)'],
          ['Calls', '`POST /calls`, `/calls/group`, accept / reject / end / cancel / join / leave / agora-token, history, `POST /calls/voip-token`'],
          ['Devices', '`GET /devices`, `PATCH /devices/:deviceId` (FCM token)'],
          ['Notifications', 'List, unread count, read, read-all, delete; admin broadcasts'],
          ['Legal', '`GET /legal` (public), `PUT /legal` (admin); terms, privacy and delete-account pages'],
          ['OTA', '`GET /ota/check`, `POST /ota/download-event`, admin releases and rollback'],
          ['Payments', 'Products, checkout, confirm, history, IAP verify, Adapty sync, webhooks, admin stats / refunds'],
        ]}
      />

      <H2>Included in every backend</H2>
      <List
        items={[
          'Security: Helmet, CORS allow-list, rate limiting (stricter on auth routes), body limit, input sanitisation, account lockout – each optional.',
          'Prisma / TypeORM migrations and a seed script that creates the admin user.',
          'Swagger UI at `/api/docs`, pino logging, graceful shutdown.',
          'Unit + e2e tests (Vitest + supertest) that run **without a database** (in-memory repositories).',
          'A realtime **tester page** at `/tester` to try chat and calls in two browser tabs – no app needed.',
          'API messages in one `messages` file per module – no texts inline in code.',
          'Uploads on local disk (`UPLOAD_DIR`), served at `/uploads`.',
        ]}
      />

      <H2>Scripts</H2>
      <Code
        code={`npm run dev           # watch mode
npm run build && npm start
npm run db:migrate    # SQL: create a migration (dev)
npm run db:deploy     # SQL: apply migrations
npm run db:seed       # admin user (SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD)
npm test              # unit tests
npm run test:e2e      # e2e tests
npm run docker:up     # with --docker: database (+ Redis) on free ports`}
      />
      <Callout type="warning" title="Change the seeded admin">
        The seed uses `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` (default `admin@example.com` / `ChangeMe123!`). Change them before deploying.
      </Callout>
    </>
  );
}

export function AdminPanel() {
  return (
    <>
      <P>
        The admin panel is a web app for running your product: **React + Vite** or **Next.js (App Router)**, both with Tailwind CSS. It uses the same
        backend API and only lets users with the `ADMIN` role sign in.
      </P>
      <Code code={`npx rn-architecture-generator --admin-panel --admin-tech-stack next   # or react`} />

      <H2>Pages</H2>
      <CardGrid
        cards={[
          { icon: 'grid', title: 'Dashboard', body: 'Users, activity and key numbers at a glance.' },
          { icon: 'users', title: 'User Management', body: 'Search, edit, block and delete users, change avatars.' },
          { icon: 'bell', title: 'Broadcast Notifications', body: 'Send a push + inbox notification to all users or a selection.' },
          { icon: 'file', title: 'Legal & Policies', body: 'Edit Terms, Privacy Policy and delete-account pages (HTML).' },
          { icon: 'card', title: 'Payments', body: 'Products, entitlements, payments and refunds (with payments).' },
          { icon: 'refresh', title: 'OTA Releases', body: 'Publish, roll out and roll back app updates (with OTA).' },
        ]}
      />

      <H2>Where it is generated</H2>
      <Table
        head={['Mode', 'Folder']}
        rows={[
          ['Frontend', '`<directory>/<appname>-admin` next to the app'],
          ['Frontend + Backend', '`<AppName>/admin` – run it with `npm run admin` (http://localhost:5173)'],
        ]}
      />

      <H2>Run it</H2>
      <Code
        code={`cd admin
npm install
npm run dev`}
      />
      <List
        items={[
          'Set the API URL in the admin `.env` and add the admin URL to the backend `CORS_ORIGINS`.',
          'With API encryption the admin `.env` gets the same key and IV as the app and the backend.',
          'Sign in with the seeded admin (`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`).',
        ]}
      />
      <H3>Permissions</H3>
      <P>Admin routes are protected by role + permission checks on the backend (e.g. `users:write`, `legal:write`, `ota:write`, `payments:manage`).</P>
    </>
  );
}
