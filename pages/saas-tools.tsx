import Head from 'next/head';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowUpRight, Search, Sparkles } from 'lucide-react';

type Category = 'All' | 'Design' | 'Assets' | 'Build' | 'Analytics' | 'Growth' | 'Business';

type SaaSTool = {
  name: string;
  url: string;
  domain: string;
  category: Exclude<Category, 'All'>;
  description: string;
};

const categories: Category[] = ['All', 'Design', 'Assets', 'Build', 'Analytics', 'Growth', 'Business'];

const tools: SaaSTool[] = [
  { name: 'Figma', url: 'https://www.figma.com', domain: 'figma.com', category: 'Design', description: 'Collaborative UI design, prototypes and product mockups.' },
  { name: 'Canva', url: 'https://www.canva.com', domain: 'canva.com', category: 'Design', description: 'Fast social posts, launch graphics and lightweight design.' },
  { name: 'Framer', url: 'https://www.framer.com', domain: 'framer.com', category: 'Design', description: 'Design and publish polished marketing websites visually.' },
  { name: 'Coolors', url: 'https://coolors.co', domain: 'coolors.co', category: 'Design', description: 'Generate and explore color palettes for your brand.' },
  { name: 'Flaticon', url: 'https://www.flaticon.com', domain: 'flaticon.com', category: 'Assets', description: 'Huge library of icons and stickers for product interfaces.' },
  { name: 'Lucide', url: 'https://lucide.dev', domain: 'lucide.dev', category: 'Assets', description: 'Clean open-source icon set with developer-friendly packages.' },
  { name: 'Unsplash', url: 'https://unsplash.com', domain: 'unsplash.com', category: 'Assets', description: 'High-quality photography for landing pages and content.' },
  { name: 'LottieFiles', url: 'https://lottiefiles.com', domain: 'lottiefiles.com', category: 'Assets', description: 'Lightweight motion assets and animations for product UI.' },
  { name: 'Vercel', url: 'https://vercel.com', domain: 'vercel.com', category: 'Build', description: 'Deploy frontend apps with previews, domains and serverless functions.' },
  { name: 'Supabase', url: 'https://supabase.com', domain: 'supabase.com', category: 'Build', description: 'Postgres database, auth, storage and realtime APIs.' },
  { name: 'Firebase', url: 'https://firebase.google.com', domain: 'firebase.google.com', category: 'Build', description: 'Backend services for auth, data, hosting and notifications.' },
  { name: 'Clerk', url: 'https://clerk.com', domain: 'clerk.com', category: 'Build', description: 'Drop-in authentication and user management for web apps.' },
  { name: 'Resend', url: 'https://resend.com', domain: 'resend.com', category: 'Build', description: 'Developer-first transactional email API with simple tooling.' },
  { name: 'PostHog', url: 'https://posthog.com', domain: 'posthog.com', category: 'Analytics', description: 'Product analytics, funnels, session replay and experiments.' },
  { name: 'Plausible', url: 'https://plausible.io', domain: 'plausible.io', category: 'Analytics', description: 'Simple privacy-friendly web analytics without dashboard overload.' },
  { name: 'DataFast', url: 'https://datafa.st', domain: 'datafa.st', category: 'Analytics', description: 'Revenue-focused analytics built for indie hackers and SaaS.' },
  { name: 'Sentry', url: 'https://sentry.io', domain: 'sentry.io', category: 'Analytics', description: 'Track application errors, performance issues and regressions.' },
  { name: 'Ahrefs', url: 'https://ahrefs.com', domain: 'ahrefs.com', category: 'Growth', description: 'SEO research, keyword discovery, backlinks and competitor analysis.' },
  { name: 'Google Trends', url: 'https://trends.google.com', domain: 'trends.google.com', category: 'Growth', description: 'Compare search interest and spot demand before building.' },
  { name: 'Buffer', url: 'https://buffer.com', domain: 'buffer.com', category: 'Growth', description: 'Plan and schedule social media content across channels.' },
  { name: 'Tally', url: 'https://tally.so', domain: 'tally.so', category: 'Growth', description: 'Create clean forms for waitlists, feedback and lead capture.' },
  { name: 'Stripe', url: 'https://stripe.com', domain: 'stripe.com', category: 'Business', description: 'Payments, subscriptions, invoices and SaaS billing infrastructure.' },
  { name: 'Lemon Squeezy', url: 'https://www.lemonsqueezy.com', domain: 'lemonsqueezy.com', category: 'Business', description: 'Payments, subscriptions and merchant-of-record tooling.' },
  { name: 'Notion', url: 'https://www.notion.so', domain: 'notion.so', category: 'Business', description: 'Docs, project notes, roadmaps and lightweight team knowledge.' },
  { name: 'Crisp', url: 'https://crisp.chat', domain: 'crisp.chat', category: 'Business', description: 'Customer support inbox, live chat and lightweight CRM.' },
  { name: 'Calendly', url: 'https://calendly.com', domain: 'calendly.com', category: 'Business', description: 'Simple scheduling links for demos, interviews and calls.' },
];

function logoUrl(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
}

export default function SaaSToolsPage() {
  const [category, setCategory] = useState<Category>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory = category === 'All' || tool.category === category;
      const matchesQuery = !q || `${tool.name} ${tool.description} ${tool.category}`.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <>
      <Head>
        <title>SaaS Stack — indieTools</title>
        <meta name="description" content="A curated directory of useful SaaS tools for indie hackers: design, assets, development, analytics, growth and business." />
      </Head>

      <main className="saas-page">
        <header className="saas-topbar">
          <Link href="/" className="brand saas-brand">
            <div className="brand-mark"><img src="/favicon.svg" alt="" style={{ width: 30, height: 30 }} /></div>
            <div><div>indieTools</div><div className="brand-sub">Tiny tools. Serious momentum.</div></div>
          </Link>
          <nav className="saas-nav">
            <Link href="/" className="ghost-btn">Utility tools</Link>
            <span className="primary-btn">SaaS stack</span>
          </nav>
        </header>

        <section className="saas-hero">
          <span className="eyebrow"><Sparkles size={13} /> The indie hacker stack</span>
          <h1>Useful SaaS tools,<br /><span>without the hunt.</span></h1>
          <p>A curated shortcut to the products indie hackers keep reaching for — from the first mockup to launch, analytics and payments.</p>
        </section>

        <section className="saas-directory">
          <div className="directory-bar">
            <div className="saas-search">
              <Search size={16} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Figma, analytics, payments..." aria-label="Search SaaS tools" />
            </div>
            <div className="saas-categories">
              {categories.map((item) => (
                <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>
              ))}
            </div>
          </div>

          <div className="directory-meta">
            <span>{filtered.length} tools</span>
            <span>Hand-picked for building & shipping</span>
          </div>

          <div className="saas-grid">
            {filtered.map((tool) => (
              <a key={tool.name} className="saas-card" href={tool.url} target="_blank" rel="noreferrer">
                <div className="saas-card-head">
                  <div className="saas-logo"><img src={logoUrl(tool.domain)} alt={`${tool.name} logo`} /></div>
                  <span className="saas-category">{tool.category}</span>
                  <ArrowUpRight size={17} className="saas-arrow" />
                </div>
                <h2>{tool.name}</h2>
                <p>{tool.description}</p>
                <span className="saas-domain">{tool.domain}</span>
              </a>
            ))}
          </div>

          {!filtered.length && <div className="saas-empty">No tools match that search yet.</div>}
        </section>

        <footer className="saas-footer">indieTools — a smaller toolbox for building bigger things.</footer>
      </main>

      <style jsx>{`
        .saas-page { min-height: 100vh; }
        .saas-topbar { position: sticky; top: 0; z-index: 40; min-height: 76px; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 0 22px; border-bottom: 1px solid var(--line); background: rgba(243,237,220,.94); backdrop-filter: blur(10px); }
        .saas-brand { text-decoration: none; }
        .saas-nav { display: flex; align-items: center; gap: 8px; }
        .saas-nav .primary-btn { cursor: default; }
        .saas-hero { max-width: 1120px; margin: 0 auto; padding: 82px 24px 56px; text-align: center; }
        .saas-hero h1 { margin: 24px auto 16px; max-width: 900px; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(48px, 7vw, 82px); line-height: .98; letter-spacing: -.055em; }
        .saas-hero h1 span { color: var(--accent); font-style: italic; font-weight: 600; }
        .saas-hero p { max-width: 720px; margin: 0 auto; color: var(--ink-soft); line-height: 1.75; font-size: 14px; }
        .saas-directory { max-width: 1180px; margin: 0 auto; padding: 0 24px 80px; }
        .directory-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 0; border-top: 1px solid var(--line-strong); border-bottom: 1px solid var(--line-strong); }
        .saas-search { flex: 0 1 360px; display: flex; align-items: center; gap: 9px; border: 1px solid var(--line-strong); padding: 10px 11px; background: rgba(255,255,255,.10); }
        .saas-search input { min-width: 0; width: 100%; border: 0; outline: 0; color: var(--ink); background: transparent; }
        .saas-search input::placeholder { color: #8f866f; }
        .saas-categories { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 5px; }
        .saas-categories button { border: 1px solid transparent; padding: 7px 9px; color: var(--ink-soft); background: transparent; font-size: 10px; }
        .saas-categories button:hover { border-color: var(--line); }
        .saas-categories button.active { border-color: var(--line-strong); background: var(--paper-3); color: var(--ink); }
        .directory-meta { display: flex; justify-content: space-between; gap: 12px; padding: 15px 2px 11px; color: var(--ink-soft); font-size: 10px; }
        .saas-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid var(--line-strong); border-left: 1px solid var(--line-strong); }
        .saas-card { position: relative; min-height: 230px; padding: 20px; border-right: 1px solid var(--line-strong); border-bottom: 1px solid var(--line-strong); background: rgba(255,255,255,.09); transition: background .14s ease, transform .14s ease; }
        .saas-card:hover { background: rgba(255,255,255,.28); transform: translateY(-2px); z-index: 2; }
        .saas-card-head { display: flex; align-items: center; gap: 9px; }
        .saas-logo { width: 44px; height: 44px; display: grid; place-items: center; flex: 0 0 auto; border: 1px solid var(--line-strong); background: #f8f3e6; }
        .saas-logo img { width: 27px; height: 27px; object-fit: contain; }
        .saas-category { border: 1px solid var(--line); padding: 4px 6px; color: var(--ink-soft); font-size: 9px; }
        .saas-arrow { margin-left: auto; color: var(--ink-soft); transition: transform .14s ease; }
        .saas-card:hover .saas-arrow { transform: translate(2px,-2px); }
        .saas-card h2 { margin: 26px 0 8px; font-family: Georgia, 'Times New Roman', serif; font-size: 27px; line-height: 1; letter-spacing: -.035em; }
        .saas-card p { margin: 0; max-width: 310px; color: var(--ink-soft); font-size: 11px; line-height: 1.65; }
        .saas-domain { position: absolute; left: 20px; bottom: 18px; color: #817761; font-size: 9px; }
        .saas-empty { padding: 70px 20px; text-align: center; color: var(--ink-soft); border: 1px solid var(--line-strong); border-top: 0; }
        .saas-footer { border-top: 1px solid var(--line); padding: 28px 20px 42px; text-align: center; color: #716953; font-size: 10px; }
        @media (max-width: 900px) { .directory-bar { align-items: stretch; flex-direction: column; } .saas-search { flex-basis: auto; width: 100%; } .saas-categories { justify-content: flex-start; } .saas-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 620px) { .saas-topbar { min-height: 68px; padding: 10px 12px; } .saas-nav .ghost-btn { display: none; } .saas-hero { padding: 52px 16px 38px; } .saas-hero h1 { font-size: 48px; } .saas-directory { padding: 0 13px 56px; } .directory-meta { flex-direction: column; gap: 4px; } .saas-grid { grid-template-columns: 1fr; } .saas-card { min-height: 218px; } }
      `}</style>
    </>
  );
}
