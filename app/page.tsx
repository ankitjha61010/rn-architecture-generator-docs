import Link from 'next/link';
import { Icon, NextLogo, NodeLogo, ReactLogo, type IconName } from '@/components/Icon';
import { InstallTabs } from '@/components/InstallTabs';
import { docHref, site } from '@/lib/site';

const features: Array<{ icon: IconName; tone: string; title: string; body: string }> = [
  { icon: 'bolt', tone: 'blue', title: 'Fast Generation', body: 'A complete, runnable project from one interactive command.' },
  { icon: 'layers', tone: 'green', title: 'Multiple Architectures', body: '8 mobile and 6 backend architectures – monolith or microservices.' },
  { icon: 'settings', tone: 'purple', title: 'Full Stack Ready', body: 'Mobile app, backend and admin panel that already talk to each other.' },
  { icon: 'code', tone: 'orange', title: 'Modern Tech Stack', body: 'React Native 0.87, NestJS / Express, React + Vite or Next.js.' },
];

const stack = [
  { logo: <ReactLogo size={34} />, title: 'React Native', body: 'TypeScript app for iOS & Android, native files patched for you' },
  { logo: <NodeLogo size={34} />, title: 'NestJS / Express', body: 'Versioned REST API, Socket.IO, Swagger and tests' },
  { logo: <NextLogo size={34} />, title: 'React + Next.js', body: 'Admin panel with Tailwind CSS – Vite or App Router' },
  { logo: <span className="stack-icon blue"><Icon name="database" size={28} /></span>, title: 'Database', body: 'PostgreSQL, MySQL or MongoDB – Prisma, TypeORM, Mongoose' },
  { logo: <span className="stack-icon purple"><Icon name="settings" size={28} /></span>, title: 'Extras', body: 'JWT, Stripe / Razorpay / PayPal, Socket.io, FCM, Agora, OTA' },
];

const reasons = [
  { title: 'Save Time', body: 'Days of setup – navigation, auth, native config – done in minutes.' },
  { title: 'Best Practices', body: 'Typed code in a clean, consistent architecture you pick.' },
  { title: 'Only What You Choose', body: 'Unselected features leave no code and no packages behind.' },
  { title: 'Production Ready', body: 'Security middleware, migrations, tests, Docker and docs included.' },
];

export default function HomePage() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <span className="pill">
            <Icon name="rocket" size={14} /> Powerful App Generator
          </span>
          <h1>
            Generate Full Stack Applications in <span className="grad">Seconds</span>
          </h1>
          <p>
            A powerful npm package to generate production-ready applications with <strong>React Native</strong>, a{' '}
            <strong>backend (NestJS / Express)</strong> and an <strong>admin panel (React + Next.js)</strong> – all in one go.
          </p>
          <div className="hero-actions">
            <Link href={docHref('quick-start')} className="btn btn-primary">
              <Icon name="code" size={16} /> Get Started <Icon name="arrowRight" size={16} />
            </Link>
            <Link href={docHref('examples')} className="btn btn-outline">
              <Icon name="search" size={16} /> View Examples
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="float-card fc-rn">
            <ReactLogo size={30} />
            <span>React Native<br />Mobile App</span>
          </div>
          <div className="float-card fc-be">
            <NodeLogo size={30} />
            <span>Backend<br />(NestJS/Express)</span>
          </div>
          <div className="terminal">
            <div className="terminal-bar">
              <i /><i /><i />
            </div>
            <p className="terminal-cmd">
              <span className="tok-cmd">npx</span> {site.packageName}
            </p>
            <ul>
              <li><Icon name="checkCircle" size={15} /> React Native App</li>
              <li><Icon name="checkCircle" size={15} /> Backend (NestJS/Express)</li>
              <li><Icon name="checkCircle" size={15} /> Admin Panel (React + Next.js)</li>
            </ul>
          </div>
          <div className="float-card fc-admin">
            <NextLogo size={30} />
            <span>Admin Panel<br />(React + Next.js)</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="feature-row">
        {features.map(feature => (
          <div key={feature.title} className={`feature tone-${feature.tone}`}>
            <span className="feature-icon">
              <Icon name={feature.icon} size={20} />
            </span>
            <strong>{feature.title}</strong>
            <span>{feature.body}</span>
          </div>
        ))}
      </section>

      {/* Structures */}
      <section className="home-section">
        <h2>Generated Project Structures</h2>
        <p className="section-sub">Choose your preferred backend deployment and get a complete, well-structured project.</p>
        <div className="structures">
          <div className="structure">
            <div className="structure-head">
              <h3>Monolithic Architecture</h3>
              <span className="tag tag-green">Recommended</span>
            </div>
            <p>All modules in a single backend codebase – easy to manage and deploy.</p>
            <div className="diagram mono">
              <div className="diagram-group">
                <span className="diagram-label">Single Project</span>
                <div className="node node-blue node-center">
                  <Icon name="phone" size={20} />
                  <span><strong>Frontend</strong><small>React Native</small></span>
                </div>
                <div className="diagram-arrows">
                  <span>↙</span><span>↘</span>
                </div>
                <div className="diagram-pair">
                  <div className="node node-green">
                    <NodeLogo size={24} />
                    <span><strong>Backend</strong><small>NestJS / Express</small></span>
                  </div>
                  <span className="diagram-link">⟷</span>
                  <div className="node node-purple">
                    <NextLogo size={24} />
                    <span><strong>Admin Panel</strong><small>React + Next.js</small></span>
                  </div>
                </div>
              </div>
              <div className="diagram-arrows"><span>↓</span></div>
              <div className="node node-blue node-wide">
                <Icon name="database" size={20} />
                <span><strong>Database</strong><small>MySQL / PostgreSQL / MongoDB</small></span>
              </div>
            </div>
            <Link href={docHref('monolith')} className="text-link">
              Monolithic setup <Icon name="arrowRight" size={14} />
            </Link>
          </div>

          <div className="structure">
            <div className="structure-head">
              <h3>Microservices Architecture</h3>
              <span className="tag tag-purple">Scalable</span>
            </div>
            <p>Separate services for better scalability and independent deployment.</p>
            <div className="diagram micro">
              <div className="diagram-group">
                <span className="diagram-label">Client Apps</span>
                <div className="diagram-pair">
                  <div className="node node-blue">
                    <Icon name="phone" size={20} />
                    <span><strong>React Native</strong><small>Mobile App</small></span>
                  </div>
                  <div className="node node-purple">
                    <NextLogo size={24} />
                    <span><strong>Admin Panel</strong><small>React + Next.js</small></span>
                  </div>
                </div>
              </div>
              <div className="diagram-arrows"><span>↓</span></div>
              <div className="node node-blue node-wide">
                <Icon name="cloud" size={20} />
                <span><strong>API Gateway</strong><small>:3000 · one public URL</small></span>
              </div>
              <div className="diagram-arrows"><span>↙</span><span>↓</span><span>↘</span></div>
              <div className="diagram-trio">
                <div className="node node-green">
                  <Icon name="lock" size={18} />
                  <span><strong>Identity</strong><small>:3001</small></span>
                </div>
                <div className="node node-blue">
                  <Icon name="wifi" size={18} />
                  <span><strong>Chat</strong><small>:3002</small></span>
                </div>
                <div className="node node-purple">
                  <Icon name="bell" size={18} />
                  <span><strong>Notifications</strong><small>:3003</small></span>
                </div>
              </div>
              <div className="diagram-arrows"><span>↓</span></div>
              <div className="node node-blue node-wide">
                <Icon name="database" size={20} />
                <span><strong>Database per service + Redis events</strong><small>MySQL / PostgreSQL / MongoDB</small></span>
              </div>
            </div>
            <Link href={docHref('microservices')} className="text-link">
              Microservices setup <Icon name="arrowRight" size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="home-section">
        <h2>Supported Tech Stack</h2>
        <p className="section-sub">Modern, popular technologies – pinned to versions that work together.</p>
        <div className="stack">
          {stack.map(item => (
            <div key={item.title} className="stack-card">
              {item.logo}
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="why">
        <h2>Why Choose This Generator?</h2>
        <div className="why-grid">
          {reasons.map(reason => (
            <div key={reason.title} className="why-item">
              <Icon name="checkCircle" size={22} />
              <div>
                <strong>{reason.title}</strong>
                <span>{reason.body}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-text">
          <Icon name="rocket" size={34} />
          <div>
            <h2>Start Building Your Next App Today!</h2>
            <p>Generate your full stack application with just one command.</p>
          </div>
        </div>
        <div className="cta-actions">
          <InstallTabs dark />
          <Link href={docHref('installation')} className="btn btn-primary">
            Get Started <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </section>

      <footer className="footer">
        <span>
          {site.name} · MIT License
        </span>
        <span className="footer-links">
          <a href={site.npm} target="_blank" rel="noreferrer">npm</a>
          <a href={site.github} target="_blank" rel="noreferrer">GitHub</a>
          <Link href={docHref('contributing')}>Contributing</Link>
        </span>
      </footer>
    </div>
  );
}
