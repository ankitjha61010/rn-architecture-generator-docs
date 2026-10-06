import { Callout, Code, H2, H3, List, P, Steps, Table } from '@/components/Doc';

export function Authentication() {
  return (
    <>
      <P>Authentication is generated end to end: app screens, API client token handling, backend routes, password hashing and admin roles.</P>

      <H2>Sign-in methods</H2>
      <Table
        head={['Method', 'App', 'Backend', 'Flags']}
        rows={[
          ['Email + password', 'Login, Register, Forgot / Reset / Change password', '`POST /auth/register`, `login`, `forgot-password`, `reset-password`, `change-password`', '`--auth-email` (default on)'],
          ['Mobile number + OTP', 'Country picker, OTP screen', '`POST /auth/otp/send`, `/auth/otp/verify` – SMS via **Twilio**', '`--auth-mobile`'],
          ['Google', '`@react-native-google-signin/google-signin`', '`POST /auth/social` – verifies the ID token', '`--social-auth google`'],
          ['Facebook', '`react-native-fbsdk-next` (incl. iOS Limited Login)', '`POST /auth/social`', '`--social-auth facebook`'],
          ['Apple', '`@invertase/react-native-apple-authentication` (iOS 13+)', '`POST /auth/social`', '`--social-auth apple`'],
        ]}
      />
      <P>For social login the wizard offers *Configure* (enter the keys now), *Skip* (placeholders `YOUR_…`) or *Don't include*.</P>

      <H2>Token strategies</H2>
      <Table
        head={['`--backend-auth`', 'How it works']}
        rows={[
          ['`jwt`', 'One access token; logout / password change revoke every token (token version)'],
          ['`access-refresh`', 'Short-lived access token + revocable refresh token stored hashed'],
          ['`refresh-rotation`', '**Recommended.** A new refresh token on every refresh; reusing an old one revokes the session'],
          ['`none`', 'No authentication (not allowed for microservices or fullstack)'],
        ]}
      />
      <P>
        In the app, requests that get a `401` share **one** refresh call (`POST /auth/refresh`) and are retried; the splash screen restores the session
        on start. Logout calls the server, clears tokens, disconnects the socket and signs out of the social SDKs.
      </P>

      <H2>Password hashing</H2>
      <Table
        head={['`--password-hashing`', 'Details']}
        rows={[
          ['`bcrypt`', 'Battle-tested, cost factor via `BCRYPT_ROUNDS`'],
          ['`argon2`', 'argon2id – current OWASP recommendation'],
          ['`configurable`', '`PASSWORD_HASH_ALGORITHM` picks bcrypt or Argon2; old hashes keep working and are upgraded at login'],
        ]}
      />

      <H2>Roles, permissions & security</H2>
      <List
        items={[
          'Roles `USER` / `ADMIN` with permissions such as `users:write`, `legal:write`, `ota:write`, `payments:manage`.',
          'Devices are sent with every sign-in (`device` in the body) – logout takes the `deviceId`.',
          'Optional: strict rate limit on auth routes, account lockout after repeated failed logins, email verification.',
        ]}
      />
      <Code
        code={`npx rn-architecture-generator --type backend --name my-api \\
  --backend-auth refresh-rotation --password-hashing argon2 \\
  --auth-methods email,mobile,google --security all`}
      />
      <P>Keys for Google / Facebook / Apple / Twilio: see [Configuration & Keys](configuration).</P>
    </>
  );
}

export function Database() {
  return (
    <>
      <Table
        head={['Database', 'ORM / ODM', 'Flags']}
        rows={[
          ['**PostgreSQL**', 'Prisma or TypeORM', '`--backend-database postgresql --backend-orm prisma`'],
          ['**MySQL**', 'Prisma or TypeORM', '`--backend-database mysql --backend-orm typeorm`'],
          ['**MongoDB**', 'Mongoose', '`--backend-database mongodb --backend-orm mongoose`'],
        ]}
      />

      <H2>Development URLs</H2>
      <Code
        lang="text"
        title=".env"
        code={`DATABASE_URL=postgresql://postgres:postgres@localhost:5432/<db>?schema=public
DATABASE_URL=mysql://root:root@localhost:3306/<db>
DATABASE_URL=mongodb://localhost:27017/<db>`}
      />
      <P>With `--docker`, `docker-compose.yml` starts `postgres:17`, `mysql:8.4` or `mongo:8` with the database already created – see [Docker & Ports](docker).</P>

      <H2>Migrations & seed</H2>
      <Table
        head={['ORM', 'Commands']}
        rows={[
          ['Prisma', '`npm run db:migrate` (dev) · `npm run db:deploy` · `npm run db:seed` · `npm run db:studio` · `npm run db:reset`'],
          ['TypeORM', '`npm run db:deploy` · `npm run db:revert` · `npm run db:migration:generate` · `npm run db:seed`'],
          ['Mongoose', '`npm run db:seed` (no migrations needed)'],
        ]}
      />
      <Code
        code={`npm run db:deploy   # SQL: apply migrations
npm run db:seed     # creates the admin user`}
      />

      <H2>Repository pattern</H2>
      <P>
        Business code depends on repository **interfaces** – each ORM gets its own implementation. That is why the unit and e2e tests run without a
        database: they use in-memory repositories (`test/support/in-memory-repositories.ts`).
      </P>
      <Callout title="Microservices">Each service has its own database (e.g. `my_api_identity`, `my_api_chat`) on the same server; `docker/init-databases.sql` creates them.</Callout>
    </>
  );
}

export function Payments() {
  return (
    <>
      <P>Two independent options – use one, both or none:</P>
      <Table
        head={['Option', 'Values', 'Use it for']}
        rows={[
          ['`--iap`', '`none` · `iap` (react-native-iap) · `adapty`', 'Digital goods and subscriptions sold through the App Store / Google Play'],
          ['`--payment-gateway`', '`none` · `stripe` · `razorpay` · `paypal`', 'Physical goods, services, web payments'],
        ]}
      />

      <H2>How it works</H2>
      <List
        ordered
        items={[
          '**Products** live in the backend catalog (prices in minor units). The app shows them on the **Store** screen.',
          '**Entitlements** are what a user owns: `GET /payments/me` returns access levels like `premium` – `useAccess()` in the app.',
          '**Gateway checkout:** `POST /payments/checkout` creates a provider order → the app opens Stripe PaymentSheet / Razorpay Checkout / PayPal → `POST /payments/:id/confirm` lets the backend ask the provider → `paid` grants the entitlement. The **webhook** does the same if the app never comes back.',
          '**In-app purchases:** the app sends the transaction id / purchase token to `POST /payments/iap/verify`; the backend verifies it with Apple / Google. Adapty syncs access levels via `POST /payments/adapty/sync` and webhooks.',
        ]}
      />

      <H2>Keys (backend .env)</H2>
      <Table
        head={['Provider', 'Keys', 'Webhook URL']}
        rows={[
          ['Stripe', '`STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`', '`<APP_URL>/api/v1/payments/webhooks/stripe`'],
          ['Razorpay', '`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`', '`<APP_URL>/api/v1/payments/webhooks/razorpay`'],
          ['PayPal', '`PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_WEBHOOK_ID`', '`<APP_URL>/api/v1/payments/webhooks/paypal`'],
          ['App Store', '`APPLE_IAP_ISSUER_ID`, `APPLE_IAP_KEY_ID`, `APPLE_IAP_PRIVATE_KEY` (.p8)', '–'],
          ['Google Play', '`GOOGLE_PLAY_SERVICE_ACCOUNT` (JSON)', '–'],
          ['Adapty', '`ADAPTY_SECRET_KEY`, `ADAPTY_WEBHOOK_TOKEN` (+ `ADAPTY_PUBLIC_SDK_KEY` in the app)', '`<APP_URL>/api/v1/payments/webhooks/adapty`'],
        ]}
      />
      <Callout type="tip" title="Not configured yet?">
        Skipped keys are written as `…REPLACE_ME`. Until you replace them the backend answers `503 PAYMENTS_NOT_CONFIGURED` instead of failing in odd ways. Local Stripe webhooks: `stripe listen --forward-to localhost:3000/api/v1/payments/webhooks/stripe`.
      </Callout>
      <P>The app never holds secret keys – it receives the public key from the backend at checkout. Admins manage products, entitlements and refunds in the [Admin Panel](admin-panel). Every generated project includes a detailed `docs/PAYMENTS.md`.</P>
    </>
  );
}

export function Realtime() {
  return (
    <>
      <P>Real-time features use **Socket.IO** on the same host and port as the API. Chat and calling turn the socket client on automatically.</P>

      <H2>Chat</H2>
      <List
        items={[
          '**Sending** uses REST (`POST /chat/conversations/:id/messages`); media is uploaded first (`/chat/upload`, `/chat/upload-voice`). The message shows immediately as "sending".',
          '**Receiving** arrives over the socket (`chat:receive_message`).',
          '**Types:** text, image, video, audio, document and system messages (member added, call log, missed call).',
          '**Features:** reply (swipe), edit, delete, long-press menu, retry failed messages, typing, online / last seen, read ticks, unread counts, clear / delete chats, block users, search.',
          '**Groups** (`--group-chat`): create, rename, set an image, add / remove members, make admins, leave.',
          '**Media:** photo editor (crop, rotate, filters), on-device video trimmer, zoomable images, native video player, in-app PDF viewer.',
        ]}
      />
      <H3>Socket events</H3>
      <Table
        head={['Event', 'Meaning']}
        rows={[
          ['`chat:receive_message`', 'New message in a conversation'],
          ['`presence:user_online` / `presence:user_offline`', 'Online status and last seen'],
          ['`presence:typing` / `presence:stop_typing`', 'Typing indicator'],
          ['`notification:new`', 'New inbox notification (with push notifications)'],
          ['call events', 'Incoming, accepted, rejected, ended – drive the call screens'],
        ]}
      />

      <H2>Audio & video calling</H2>
      <List
        items={[
          '**Agora RTC** (`react-native-agora`) – WebRTC is not used. The app gets the App ID and a token from the backend (`POST /calls/:id/agora-token`); keys live only in the backend `.env`.',
          '**iOS:** CallKit (`react-native-callkeep`) + PushKit VoIP pushes – rings even when the app is killed. Needs the backend `APNS_*` settings.',
          '**Android:** native full-screen incoming call screen and call notification.',
          '**One-to-one and group** calls, call history, "Calling…" screen, mute / speaker / camera, draggable minimised call.',
        ]}
      />
      <Code code="npx rn-architecture-generator --chat --group-chat --audio-call --video-call --agora-app-id <ID> --agora-app-certificate <CERT>" />

      <H2>Try it without the app</H2>
      <P>The backend serves a **tester page** at `http://localhost:3000/tester` (outside production). Open it in two browser tabs, sign in as two users and chat or call between them.</P>
    </>
  );
}

export function Notifications() {
  return (
    <>
      <P>Push notifications use **Firebase Cloud Messaging** with **Notifee** for display (`--notifications`, on by default).</P>

      <H2>What you get</H2>
      <List
        items={[
          'Permission request after sign-in (iOS, Android 13+). If the user refused, the **Enable notifications** button asks again – or, when the system no longer shows the dialog, explains it and opens the app Settings.',
          'FCM token sync: the device is saved at sign-in, the token is sent when it appears or rotates.',
          'Foreground display with Notifee, background handler, notification inbox with unread badge in the header.',
          'Deep links: chat → conversation, missed call → call history.',
          'Backend: devices, inbox (read, read-all, delete), admin **broadcasts**, push on new chat messages for offline members.',
          'Optional Firebase Analytics (`--analytics`) with automatic screen tracking.',
        ]}
      />

      <H2>Setup</H2>
      <Steps
        steps={[
          { title: 'Firebase project', body: 'Create Android and iOS apps with your package name / bundle id.' },
          { title: 'App files', body: 'Pass them while generating – or copy them later: `android/app/google-services.json` and `GoogleService-Info.plist` (add it in Xcode).', code: 'npx rn-architecture-generator --firebase-android ./google-services.json --firebase-ios ./GoogleService-Info.plist' },
          { title: 'iOS', body: 'Upload an **APNs key** to Firebase, enable *Push Notifications* and *Background Modes → Remote notifications*. Test on a real device.' },
          { title: 'Backend', body: 'Set `FIREBASE_SERVICE_ACCOUNT` to the path of `firebase-service-account.json` (or pass `--firebase-service-account`).' },
        ]}
      />
      <Callout>Each generated app contains `firebase/README.md` with the exact steps for its package name.</Callout>
    </>
  );
}

export function Swagger() {
  return (
    <>
      <H2>Swagger UI</H2>
      <P>With `--swagger` (default on) every route is documented at `http://localhost:3000/api/docs` – try requests with your access token directly in the browser. `docs/API.md` in the backend lists the same routes.</P>

      <H2>Response envelope</H2>
      <Code
        lang="json"
        title="response"
        code={`{
  "success": true,
  "message": "Login successful",
  "data": { "user": { "id": "…" }, "accessToken": "…", "refreshToken": "…" },
  "meta": { "page": 1, "limit": 20, "total": 42 }
}`}
      />
      <P>Errors use the same shape with `success: false` and a machine-readable code. API texts come from one `messages` file per module.</P>

      <H2>API encryption</H2>
      <P>
        With `--encryption`, request and response bodies are encrypted with **AES-256-CBC** (crypto-js). The app, backend and admin panel share
        `API_ENCRYPTION_KEY` / `API_ENCRYPTION_IV`. The app sends `X-Encryption-Key-Id`; a mismatch is answered with `ENCRYPTION_KEY_MISMATCH`
        (usually a stale Metro bundle – restart with `--reset-cache`). Swagger and webhooks keep working.
      </P>

      <H2>Realtime tester</H2>
      <P>`http://localhost:3000/tester` – sign in as two users in two tabs to try chat and calls without the mobile app.</P>
    </>
  );
}

export function Docker() {
  return (
    <>
      <P>
        With `--docker` the backend gets a `Dockerfile` (small production image on `node:22-slim`) and a `docker-compose.yml` with the database and,
        with Redis, `redis:8`.
      </P>

      <H2>Start on free ports</H2>
      <Code
        code={`npm run docker:up              # database (+ Redis) for development
npm run docker:up -- --all     # everything, API image rebuilt
npm run docker:down            # stop`}
      />
      <P>
        Host ports come from `.env` – `DB_PORT`, `REDIS_PORT`, `API_PORT` (microservices: `GATEWAY_PORT`) – and default to the standard ones. If a port is
        already taken, for example by another project's database or a local Postgres, `docker:up` picks the next free port, saves it in `.env` and
        updates `DATABASE_URL` / `REDIS_URL`, so `npm run dev` connects without changes.
      </P>
      <Code
        lang="text"
        title="output"
        code={`Port 5432 is already in use – db runs on 5433 instead (DB_PORT and DATABASE_URL updated in .env).
db             localhost:5433
redis          localhost:6379`}
      />
      <Callout type="tip">Ports used by this project's own running containers are kept, so running `docker:up` again changes nothing.</Callout>

      <H2>Everything in containers</H2>
      <P>`npm run docker:up -- --all` runs the API together with the database and Redis – the API container reaches them by service name. Run the migrations and seed once from your machine first.</P>
      <Code
        code={`docker build -t my-api .
docker run --env-file .env -e NODE_ENV=production -p 3000:3000 my-api`}
      />
    </>
  );
}

export function Ota() {
  return (
    <>
      <P>
        OTA (`--ota`) ships **JavaScript and image changes** to installed apps without a store release. Native changes (new native libraries, Gradle,
        Info.plist, permissions) still need a store build.
      </P>
      <H2>How it works</H2>
      <List
        ordered
        items={[
          'On launch the release app calls `GET /ota/check` with its app version and OTA version.',
          'If a newer active release exists, an update modal offers it (or forces it when mandatory).',
          'The app downloads `release.zip`, checks its **SHA-256 and RSA signature**, unpacks it and restarts on the new bundle.',
          'Rollback in the admin panel sends phones back to the bundle shipped inside the app.',
        ]}
      />
      <H2>Ship an update</H2>
      <Code
        code={`npx react-native run-android --mode release           # OTA never applies to debug builds
npm run ota:android -- --ota-version 2 --notes "Fixed the login screen"
npm run ota:ios -- --ota-version 2 --force             # --force: mandatory update
npm run ota:android -- --ota-version 2 --serve         # test from your computer (same Wi-Fi)`}
      />
      <P>Upload `release.zip` (S3, Firebase Storage, a CDN or a public share link), then **Admin panel → OTA Updates → Publish New Release** with `release.json`.</P>
      <Callout type="warning" title="Keep the signing key">
        `ota/ota-signing-key.pem` is created per project and git-ignored. Back it up – without it you can't ship updates to installed apps.
      </Callout>
    </>
  );
}

export function Configuration() {
  return (
    <>
      <P>Fill in only what you enabled. Placeholders are `YOUR_…` (social login) and `…REPLACE_ME` (payments, APNs).</P>
      <Table
        head={['Feature', 'Where', 'What']}
        rows={[
          ['**API URL**', 'app `.env`', '`API_BASE_URL` – LAN IP on a real device. Restart Metro with `npm start -- --reset-cache` after editing.'],
          ['**Push notifications**', 'app + backend', '`google-services.json`, `GoogleService-Info.plist`, APNs key in Firebase · backend `FIREBASE_SERVICE_ACCOUNT`'],
          ['**Calling**', 'backend `.env`', '`AGORA_APP_ID`, `AGORA_APP_CERTIFICATE`'],
          ['**iOS calls when killed**', 'backend `.env`', '`APNS_KEY_ID`, `APNS_TEAM_ID`, `APNS_KEY_PATH` (.p8), `APNS_BUNDLE_ID`, `APNS_PRODUCTION`'],
          ['**Google login**', 'app `.env`, Info.plist, backend', '`GOOGLE_WEB_CLIENT_ID`, `GOOGLE_IOS_CLIENT_ID`, URL scheme, Android SHA-1 · backend `GOOGLE_CLIENT_IDS`'],
          ['**Facebook login**', '`strings.xml`, Info.plist, backend', 'app id, client token · backend `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET`'],
          ['**Apple login**', 'Xcode, backend', 'enable *Sign in with Apple* · backend `APPLE_CLIENT_IDS`'],
          ['**Google Location**', 'app `.env`', '`GOOGLE_MAPS_API_KEY` (Places API (New) + Geocoding API)'],
          ['**Mobile OTP / emails**', 'backend `.env`', '`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM` · `SMTP_URL`, `MAIL_FROM` (empty = emails are logged)'],
          ['**Payments**', 'backend `.env`', 'provider keys – see [Payments](payments)'],
          ['**API encryption**', 'app, backend, admin', 'the same `API_ENCRYPTION_KEY` / `API_ENCRYPTION_IV` everywhere'],
          ['**OTA**', 'app', 'back up `ota/ota-signing-key.pem`'],
          ['**Admin login**', 'backend `.env`', '`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` – change before deploying'],
        ]}
      />
      <Callout type="tip">Every generated project has a README that lists exactly the keys its features need – start there.</Callout>
    </>
  );
}
