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
          ['**App icon & splash**', 'Your square image → every Android / iOS icon; your portrait image → full-screen native splash – see [App Icon & Splash](branding)'],
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

export function Branding() {
  return (
    <>
      <P>
        Give the wizard two images and the generated app ships with **your app icon** and a **native splash screen** on Android and iOS – full screen or
        as a centred logo – no Android Studio, Xcode or icon website needed. Both are optional; leave the questions empty to keep React Native&apos;s defaults.
        Changing them later is one command – see [Change them later](#change-them-later).
      </P>

      <H2>1. Prepare the images</H2>
      <Table
        head={['Image', 'Requirements', 'Tips']}
        rows={[
          ['**App icon**', 'Square PNG / JPG / WebP, at least 512×512 – **1024×1024** recommended', 'Fill the whole square (no own rounded corners or padding) – Android and iOS cut the shape themselves. Transparency becomes the icon\'s background colour on iOS (the App Store rejects transparent icons).'],
          ['**Splash image**', 'Portrait PNG / JPG / WebP – **1290×2796** (or 1242×2688 / 1080×2400) recommended', 'Full-screen artwork. Keep the logo and text in the middle ~80 % – screen shapes differ, so the edges can be stretched (Android) or cropped (iOS) a little.'],
          ['**…or a logo**', 'Any PNG / WebP (transparent is fine), at least 4× the size you show it at', 'Shown at a fixed size (dp) in the middle of the splash colour – see [Logo instead of full screen](#logo-instead-of-full-screen).'],
        ]}
      />

      <H2>2. Give them to the generator</H2>
      <P>In the wizard, right after the project location:</P>
      <Code
        lang="text"
        title="wizard"
        code={`? App icon – path to a square PNG/JPG (1024×1024 recommended, leave empty for the default icon): ./brand/icon.png
? Splash screen – path to a full-screen portrait image (e.g. 1290×2796, leave empty for none): ./brand/splash.png
? Splash background colour (around the image on other screen shapes + Android 12 start screen): #0B1020
? How should the splash image be shown? Full screen`}
      />
      <P>The background colour is suggested from the image (its dominant colour) – press Enter to accept it. Without questions (CI):</P>
      <Code
        code={`npx rn-architecture-generator --type frontend --yes --name MyApp \\
  --app-icon ./brand/icon.png \\
  --splash-image ./brand/splash.png --splash-background "#0B1020"`}
      />
      <Callout type="tip">The images are checked before anything is generated: a non-square or too small icon, or a file that isn&apos;t an image, is rejected with a clear message; small or landscape splash images only print a warning.</Callout>

      <H2 id="logo-instead-of-full-screen">Logo instead of full screen</H2>
      <P>Pass a width and / or height in dp (or pick *Centred logo* in the wizard) and the image is drawn at that size, centred on the splash background – identically on Android, iOS and in the JS splash. Give one side and the other follows the image; give both and the image is fitted inside the box, never stretched.</P>
      <Code
        code={`npx rn-architecture-generator --type frontend --yes --name MyApp \\
  --splash-image ./brand/logo.png --splash-background "#0B1020" \\
  --splash-logo-width 200            # and / or --splash-logo-height 100`}
      />
      <P>Without a size the image fills the screen, as before.</P>

      <H2>3. What gets generated</H2>
      <H3>App icon</H3>
      <Table
        head={['Platform', 'Files']}
        rows={[
          ['Android', '`mipmap-{mdpi…xxxhdpi}/ic_launcher.png` (48–192 px), `ic_launcher_round.png` (circle), **adaptive icon** for Android 8+ (`mipmap-anydpi-v26/ic_launcher.xml` + `ic_launcher_foreground.png` + background colour)'],
          ['iOS', '`Images.xcassets/AppIcon.appiconset` – every iPhone size (40–180 px) + the **1024×1024 App Store** icon, flattened without transparency'],
        ]}
      />
      <H3>Splash screen</H3>
      <Table
        head={['Platform', 'How it is shown']}
        rows={[
          ['Android', 'The image is the app window\'s background (`drawable/splash_screen.xml` on `AppTheme`). **Android 12+** always shows a system start screen first; it is set to your splash colour without an icon (`values-v31/styles.xml`), so it blends straight into the image. The JS `SplashScreen` (and its route) is **transparent** on Android – the native splash stays on screen the whole time and is never drawn a second time.'],
          ['iOS', '`LaunchScreen.storyboard` with a full-screen image view (aspect fill) or a centred logo + `SplashImage` / `SplashBackground` in `Images.xcassets`. iOS removes the launch screen as soon as the app draws, so the JS `SplashScreen` draws the **same image** the same way – the switch is invisible.'],
          ['JS', 'Image, background colour and logo size live in `assets/images/splash.ts`. The splash stays up **5 seconds** (`appConfig.splashDelayMs`) while the session is restored, then opens Login or Home.'],
        ]}
      />
      <Code
        lang="text"
        title="timeline"
        code={`Android: tap icon ─► [12+: splash colour] ─► native splash (stays visible under the transparent JS splash, 5 s) ─► Login / Home
iOS:     tap icon ─► launch screen ─► JS SplashScreen (same image, 5 s) ─► Login / Home`}
      />

      <H2>4. Test it</H2>
      <List
        items={[
          'Run the app (`npx react-native run-android` / `run-ios`) and **close it completely** before opening it again – a warm start skips the splash.',
          '**iOS caches launch screens:** after changing the splash, delete the app from the simulator / phone (and restart the simulator) – otherwise the old one keeps showing.',
          'Android launchers cache icons too – uninstall the old build if you still see the React Native icon.',
          'The splash is easiest to judge in a **release** build – debug builds show Metro\'s loading banner on top.',
        ]}
      />

      <H2 id="change-them-later">Change them later</H2>
      <P>Go into the project and run `icon` or `splash`. Only the branding is replaced – your code is not touched and no new project is created.</P>
      <Code
        code={`cd MyApp
git status                    # commit and push first – the command checks it

npx rn-architecture-generator icon ./brand/new-icon.png
npx rn-architecture-generator splash ./brand/new-splash.png --background "#0B1020"
npx rn-architecture-generator splash ./brand/logo.png --logo-width 200     # centred logo

git diff                      # review, then commit`}
      />
      <P>From outside the project, add `--directory ./MyApp`; in a full-stack project, run it in the root or in `mobile/`.</P>
      <Callout type="warning">**Commit and push first.** The command stops with an error when the project has uncommitted changes, unpushed commits or no remote branch, and lists what to do. That way every change shows up in `git diff` and can be undone with `git checkout . && git clean -fd`. The new image itself may be an untracked file in the project. `--allow-dirty` skips the check.</Callout>
      <P>The old form (`--type frontend --yes --name MyApp --app-icon …`) still works and also updates the app in place – including when run inside it. In the wizard, pointing it at an existing app asks *Update the app icon / splash screen only* or *Delete it and create a new project*.</P>
      <Table
        head={['Updated', 'Files']}
        rows={[
          ['App icon', '`android/app/src/main/res/mipmap-*`, `ios/<App>/Images.xcassets/AppIcon.appiconset` (every size is replaced)'],
          ['Native splash', '`res/drawable/splash_screen.xml`, `drawable-nodpi/splash_image.png`, `values/splash_colors.xml`, `values-v31/styles.xml`, `ios/<App>/LaunchScreen.storyboard`, `SplashImage` / `SplashBackground`'],
          ['JS splash', '`assets/images/splash.ts` + `splash.png`. Apps made with an older version also get the current `SplashScreen.tsx` (with their own import paths), the transparent Splash route and – if still the old default – `splashDelayMs` 1200 → 5000'],
        ]}
      />
      <Callout type="warning">Native files changed – rebuild the app (`npx react-native run-android` / `run-ios`). On iOS delete the app first: launch screens are cached.</Callout>
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
