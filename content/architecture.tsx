import { Callout, Code, H2, List, P, Table, md } from '@/components/Doc';
import { CodeBlock } from '@/components/CodeBlock';
import trees from './trees.json';

type MobileTree = { name: string; summary: string; tree: string };
const mobile = trees.mobile as Record<string, MobileTree>;
const backend = trees.backend as Record<string, string>;

const mobileWhen: Record<string, string> = {
  atomic: 'Design-system heavy apps – UI built from atoms → molecules → organisms → templates.',
  'feature-based': 'Most apps – each feature owns its screens, hooks and services. A good default.',
  layered: 'Teams that like strict horizontal layers: presentation → business → data.',
  clean: 'Large apps with long-lived business rules – domain in the centre, frameworks at the edge.',
  mvc: 'Simple apps and teams coming from MVC frameworks.',
  mvvm: 'Screens driven by view-models (hooks) that hold all UI state and logic.',
  redux: 'Redux-centric apps – slices and selectors first (always uses Redux Toolkit).',
  modular: 'Big apps split into independent modules with a public API each.',
};

function TreeCard({ id, title, summary, tree, open }: { id: string; title: string; summary: string; tree: string; open?: boolean }) {
  return (
    <details className="tree-card" open={open}>
      <summary>
        <span>
          <strong>{title}</strong> <code>{id}</code>
        </span>
        <small>{md(summary)}</small>
      </summary>
      <CodeBlock code={tree} lang="text" title={`${id} – src/`} />
    </details>
  );
}

export function Architectures() {
  return (
    <>
      <P>
        {'Pick one of **8 architectures** for the mobile app. The wizard shows the folder tree before you confirm; with flags use `--architecture <id>`. Every feature (auth, chat, calling, payments…) is placed correctly in every architecture – the trees below come straight from the generator (app with chat and notifications).'}
      </P>
      <Table
        head={['Architecture', 'Flag value', 'Good for']}
        rows={Object.entries(mobile).map(([id, arch]) => [`**${arch.name}**`, `\`${id}\``, mobileWhen[id] ?? arch.summary])}
      />
      <Code code="npx rn-architecture-generator --architecture clean --state zustand" />

      <H2>Folder trees</H2>
      {Object.entries(mobile).map(([id, arch], index) => (
        <TreeCard key={id} id={id} title={arch.name} summary={arch.summary} tree={arch.tree} open={index === 1} />
      ))}

      <H2>State management & storage</H2>
      <Table
        head={['Flag', 'Values']}
        rows={[
          ['`--state`', '`redux` (Redux Toolkit) · `zustand` · `context` · `none` – the `redux` architecture always uses Redux Toolkit'],
          ['`--storage`', '`mmkv` (fast, synchronous) · `async-storage`'],
        ]}
      />
      <Callout type="tip">Every generated app contains `docs/ARCHITECTURE.md` explaining its own folders and where to add new code.</Callout>
    </>
  );
}

const backendArchs = [
  ['feature-based', 'Feature-Based', 'Code grouped by feature (auth, users…) with a small shared layer.'],
  ['layered', 'Layered', 'Horizontal layers: routes/controllers → services → repositories → database.'],
  ['clean', 'Clean', 'Domain & application services in the centre, frameworks and databases at the edge.'],
  ['mvc', 'MVC', 'Models, Views (response presenters) and Controllers, with services for business logic.'],
  ['modular', 'Modular', 'Self-contained modules with a public API, on top of a shared core.'],
  ['enterprise', 'Enterprise', 'Bounded-context modules, each with domain / application / infrastructure / presentation layers.'],
] as const;

export function Monolith() {
  return (
    <>
      <P>
        A **monolith** is one backend project – one process, one database – containing every module you selected. It is the default and the
        recommended start: easy to run, test and deploy.
      </P>
      <Code code="npx rn-architecture-generator --type backend --deployment monolith --backend-architecture clean" />

      <H2>Backend architectures</H2>
      <Table head={['Architecture', 'Flag value', 'Idea']} rows={backendArchs.map(([id, name, idea]) => [`**${name}**`, `\`${id}\``, idea])} />

      <H2>Folder trees</H2>
      <P>Express, PostgreSQL + Prisma, with chat and notifications (NestJS uses the same layout with Nest modules):</P>
      {backendArchs.map(([id, name, idea], index) => (
        <TreeCard key={id} id={id} title={name} summary={idea} tree={backend[`express:${id}`] ?? ''} open={index === 0} />
      ))}

      <H2>Project layout</H2>
      <Code
        lang="text"
        title="my-api"
        code={`my-api/
├── src/                 your architecture
├── prisma/ or migrations
├── test/                unit + e2e (in-memory repositories)
├── docs/API.md, ARCHITECTURE.md
├── public/              legal pages (with terms)
├── tester/              realtime tester page (chat / calls)
├── scripts/docker-up.mjs  (with --docker)
├── docker-compose.yml · Dockerfile (with --docker)
├── .env · .env.example
└── README.md`}
      />

      <H2>Redis (optional)</H2>
      <List
        items={[
          'Shared rate limits across instances, the Socket.IO Redis adapter, cache and OTP codes.',
          'Without Redis everything runs in memory – fine for one instance.',
          'Turn it on with `--redis`; with Docker, `docker-compose.yml` adds `redis:8`.',
        ]}
      />
    </>
  );
}

export function Microservices() {
  return (
    <>
      <P>
        With `--deployment microservices` the backend is split into an **API gateway** and independent services – each with its own database, all
        connected through **Redis** events. Clients still use **one URL**: `http://localhost:3000/api/v1`, the same API as the monolith.
      </P>
      <Code code="npx rn-architecture-generator --type backend --name my-api --deployment microservices --modules chat,notifications" />

      <H2>Services</H2>
      <Table
        head={['Folder', 'Port', 'What']}
        rows={[
          ['`gateway/`', '3000', 'The only public entry point: routes `/api/v1/*` and Socket.IO to the services; `/api/v1/health` checks all of them'],
          ['`services/identity/`', '3001', 'Accounts, sign-in, tokens, profiles (`/auth`, `/users`). Publishes user changes'],
          ['`services/chat/`', '3002', 'Conversations, messages, uploads, **Socket.IO** (`/chat`)'],
          ['`services/notifications/`', '3003', 'Push devices, inbox, broadcasts (`/notifications`)'],
        ]}
      />

      <H2>How the services work together</H2>
      <List
        items={[
          '**Tokens:** the identity service signs access tokens; every service verifies them itself (same `JWT_ACCESS_SECRET`, issuer and audience) – no call to identity per request.',
          '**Users:** identity publishes `user.upserted` / `user.deleted` on Redis; chat and notifications keep a local copy (names, avatars, roles – never password hashes).',
          '**Chat → notifications:** offline members get a push – chat publishes `push`, notifications sends it.',
          '**Notifications → apps:** live `notification:new` events go to the chat service, which holds the sockets.',
        ]}
      />

      <H2>Run it</H2>
      <Code
        code={`npm run docker:up        # database server + Redis (with --docker, free ports)
npm install              # root tools (concurrently)
npm run install:all      # every service + the gateway
npm run setup            # migrations + seed
npm run dev              # gateway + all services, one terminal`}
      />
      <Callout type="warning" title="Limits">
        Microservices always use Redis and require authentication. Audio / video calling is generated for the monolith only; payments live in the identity service.
      </Callout>
    </>
  );
}
