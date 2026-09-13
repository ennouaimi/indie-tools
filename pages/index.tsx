import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Command, Search, Star } from 'lucide-react';
import { categories, tools, type ToolCategory } from '../lib/tool-catalog';

const categoryDescriptions: Record<ToolCategory, string> = {
  Design: 'Color, visual and asset utilities for product work.',
  Developer: 'Fast helpers for the repetitive parts of development.',
  Web: 'SEO, sharing and website utilities.',
  API: 'Small tools for inspecting and shaping API workflows.',
  Data: 'Convert, format and generate structured data.',
  'Indie Hacker': 'Simple calculators for running a small SaaS.',
};

export default function Home() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | ToolCategory>('All');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try { setFavorites(JSON.parse(localStorage.getItem('indieTools:favorites') || '[]')); } catch {}
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        document.getElementById('tool-search')?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  function toggleFavorite(id: string) {
    setFavorites(current => {
      const next = current.includes(id) ? current.filter(item => item !== id) : [...current, id];
      localStorage.setItem('indieTools:favorites', JSON.stringify(next));
      return next;
    });
  }

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return tools.filter(tool => {
      const inCategory = activeCategory === 'All' || tool.category === activeCategory;
      const matches = !needle || `${tool.name} ${tool.description} ${tool.category}`.toLowerCase().includes(needle);
      return inCategory && matches;
    });
  }, [query, activeCategory]);

  const grouped = useMemo(() => categories.map(category => ({
    category,
    tools: filtered.filter(tool => tool.category === category),
  })).filter(group => group.tools.length), [filtered]);

  return (
    <>
      <Head>
        <title>indieTools — free tools for builders</title>
        <meta name="description" content="A free, open-source toolbox for developers and indie hackers. Fast, local-first and no account required." />
      </Head>
      <div className="directory-shell">
        <header className="directory-topbar">
          <Link href="/" className="brand">
            <span className="brand-mark">iT</span>
            <span><strong>indieTools</strong><span className="brand-sub">small tools for people who ship</span></span>
          </Link>
          <nav className="directory-actions">
            <Link href="/workbench" className="ghost-btn">Open workbench</Link>
            <a href="https://github.com/ennouaimi/indie-tools" target="_blank" rel="noreferrer" className="primary-btn">GitHub ↗</a>
          </nav>
        </header>

        <main>
          <section className="directory-hero">
            <span className="eyebrow">Open source · privacy-first · no account</span>
            <h1>Useful tools for <span>people who build.</span></h1>
            <p>Design, developer, web, API, data and SaaS utilities in one focused toolbox. Most tools run entirely in your browser.</p>
            <div className="directory-search-wrap">
              <Search size={18} />
              <input id="tool-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search JSON, JWT, MRR, colors…" />
              <kbd><Command size={12}/> K</kbd>
            </div>
            <div className="directory-stats">
              <span><strong>{tools.length}</strong> tools</span>
              <span><strong>{tools.filter(tool => tool.status === 'available').length}</strong> ready now</span>
              <span><strong>{categories.length}</strong> categories</span>
            </div>
          </section>

          <section className="directory-content">
            <div className="directory-filters">
              {(['All', ...categories] as const).map(category => (
                <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>
              ))}
            </div>

            {favorites.length > 0 && activeCategory === 'All' && !query && (
              <section className="tool-section">
                <div className="section-heading"><div><span className="section-kicker">Pinned</span><h2>Favorites</h2></div><span>{favorites.length}</span></div>
                <div className="tool-grid">
                  {tools.filter(tool => favorites.includes(tool.id)).map(tool => <ToolCard key={tool.id} tool={tool} favorite onFavorite={() => toggleFavorite(tool.id)} />)}
                </div>
              </section>
            )}

            {grouped.map(group => (
              <section className="tool-section" key={group.category}>
                <div className="section-heading">
                  <div><span className="section-kicker">{group.category}</span><h2>{categoryDescriptions[group.category]}</h2></div>
                  <span>{group.tools.length}</span>
                </div>
                <div className="tool-grid">
                  {group.tools.map(tool => <ToolCard key={tool.id} tool={tool} favorite={favorites.includes(tool.id)} onFavorite={() => toggleFavorite(tool.id)} />)}
                </div>
              </section>
            ))}

            {filtered.length === 0 && <div className="directory-empty">No tools match “{query}”.</div>}
          </section>
        </main>

        <footer className="directory-footer">indieTools · open source utilities for builders · data stays local whenever possible</footer>
      </div>
    </>
  );
}

function ToolCard({ tool, favorite, onFavorite }: { tool: (typeof tools)[number]; favorite: boolean; onFavorite: () => void }) {
  const href = tool.status === 'available' ? `/workbench#${tool.workbenchId || tool.id}` : undefined;
  const card = (
    <div className="directory-card-body">
      <div className="directory-card-top">
        <span className={`status-dot ${tool.status}`}>{tool.status === 'available' ? 'Ready' : 'Roadmap'}</span>
        <button className={`favorite-btn ${favorite ? 'active' : ''}`} onClick={event => { event.preventDefault(); event.stopPropagation(); onFavorite(); }} aria-label="Toggle favorite"><Star size={15} fill={favorite ? 'currentColor' : 'none'} /></button>
      </div>
      <h3>{tool.name}</h3>
      <p>{tool.description}</p>
      <div className="directory-card-footer"><span>{tool.category}</span>{href ? <ArrowUpRight size={16}/> : <span>soon</span>}</div>
    </div>
  );
  return href ? <Link className="directory-card" href={href}>{card}</Link> : <div className="directory-card planned">{card}</div>;
}
