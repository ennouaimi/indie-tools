import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Command, Search, Star } from 'lucide-react';
import { categories, tools, type ToolCategory } from '../lib/tool-catalog';

const categoryDescriptions: Record<ToolCategory, string> = {
  Design: 'Color and visual utilities for product work.',
  Developer: 'Fast helpers for the repetitive parts of development.',
  Web: 'Small utilities for websites and content.',
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
            <p>Every tool shown here is available now. No placeholders, no “coming soon” cards.</p>
            <div className="directory-search-wrap">
              <Search size={18} />
              <input id="tool-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search JSON, JWT, colors, timezone…" />
              <kbd><Command size={12}/> K</kbd>
            </div>
            <div className="directory-stats">
              <span><strong>{tools.length}</strong> working tools</span>
              <span><strong>{categories.length}</strong> active categories</span>
              <span><strong>100%</strong> available</span>
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
                <div className="section-heading"><div><span className="section-kicker">Pinned</span><h2>Favorites</h2></div><span>{tools.filter(tool => favorites.includes(tool.id)).length}</span></div>
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
  const href = `/workbench#${tool.workbenchId}`;
  return (
    <Link className="directory-card" href={href}>
      <div className="directory-card-body">
        <div className="directory-card-top">
          <span className="status-dot available">Ready</span>
          <button className={`favorite-btn ${favorite ? 'active' : ''}`} onClick={event => { event.preventDefault(); event.stopPropagation(); onFavorite(); }} aria-label="Toggle favorite"><Star size={15} fill={favorite ? 'currentColor' : 'none'} /></button>
        </div>
        <h3>{tool.name}</h3>
        <p>{tool.description}</p>
        <div className="directory-card-footer"><span>{tool.category}</span><ArrowUpRight size={16}/></div>
      </div>
    </Link>
  );
}
