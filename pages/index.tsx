import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Command, Search, Star } from 'lucide-react';
import { categories, tools, type ToolCategory } from '../lib/tool-catalog';

const categoryDescriptions: Record<ToolCategory, string> = {
  Design: 'Color, asset and visual utilities for product work.',
  Developer: 'Fast helpers for repetitive development tasks.',
  Web: 'SEO, sharing and website utilities.',
  API: 'Inspect, convert and debug API-related data.',
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

  return <>
    <Head><title>indieTools — free tools for builders</title><meta name="description" content="A free, open-source toolbox for developers and indie hackers. Fast, local-first and no account required." /></Head>
    <div className="directory-shell">
      <header className="directory-topbar"><Link href="/" className="brand"><span className="brand-mark">iT</span><span><strong>indieTools</strong><span className="brand-sub">small tools for people who ship</span></span></Link><nav className="directory-actions"><Link href="/workbench" className="ghost-btn">Open workbench</Link><a href="https://github.com/ennouaimi/indie-tools" target="_blank" rel="noreferrer" className="primary-btn">GitHub ↗</a></nav></header>
      <main>
        <section className="directory-hero"><span className="eyebrow">Open source · privacy-first · no account</span><h1>Useful tools for <span>people who build.</span></h1><p>Design, developer, web, API, data and SaaS utilities. Every tool shown here is usable now.</p><div className="directory-search-wrap"><Search size={18}/><input id="tool-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search JSON, JWT, MRR, colors, cURL…"/><kbd><Command size={12}/> K</kbd></div><div className="directory-stats"><span><strong>{tools.length}</strong> working tools</span><span><strong>{categories.length}</strong> categories</span><span><strong>0</strong> coming soon cards</span></div></section>
        <section className="directory-content">
          <div className="directory-filters">{(['All',...categories] as const).map(c=><button key={c} className={activeCategory===c?'active':''} onClick={()=>setActiveCategory(c)}>{c}</button>)}</div>
          {favorites.length>0&&activeCategory==='All'&&!query&&<section className="tool-section"><div className="section-heading"><div><span className="section-kicker">Pinned</span><h2>Favorites</h2></div><span>{tools.filter(t=>favorites.includes(t.id)).length}</span></div><div className="tool-grid">{tools.filter(t=>favorites.includes(t.id)).map(t=><ToolCard key={t.id} tool={t} favorite onFavorite={()=>toggleFavorite(t.id)}/>)}</div></section>}
          {grouped.map(g=><section className="tool-section" key={g.category}><div className="section-heading"><div><span className="section-kicker">{g.category}</span><h2>{categoryDescriptions[g.category]}</h2></div><span>{g.tools.length}</span></div><div className="tool-grid">{g.tools.map(t=><ToolCard key={t.id} tool={t} favorite={favorites.includes(t.id)} onFavorite={()=>toggleFavorite(t.id)}/>)}</div></section>)}
          {!filtered.length&&<div className="directory-empty">No tools match “{query}”.</div>}
        </section>
      </main>
      <footer className="directory-footer">indieTools · open source utilities for builders · data stays local whenever possible</footer>
    </div>
  </>;
}

function ToolCard({tool,favorite,onFavorite}:{tool:(typeof tools)[number];favorite:boolean;onFavorite:()=>void}){return <Link className="directory-card" href={tool.href}><div className="directory-card-body"><div className="directory-card-top"><span className="status-dot available">Ready</span><button className={`favorite-btn ${favorite?'active':''}`} onClick={e=>{e.preventDefault();e.stopPropagation();onFavorite()}} aria-label="Toggle favorite"><Star size={15} fill={favorite?'currentColor':'none'}/></button></div><h3>{tool.name}</h3><p>{tool.description}</p><div className="directory-card-footer"><span>{tool.category}</span><ArrowUpRight size={16}/></div></div></Link>}
