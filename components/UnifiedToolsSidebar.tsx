import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search, Wrench } from 'lucide-react';
import { categories, tools, type ToolCategory } from '../lib/tool-catalog';

type Props = {
  activeId?: string;
  onWorkbenchTool?: (href: string) => void;
};

export default function UnifiedToolsSidebar({ activeId, onWorkbenchTool }: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | ToolCategory>('All');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return tools.filter(tool => {
      const inCategory = category === 'All' || tool.category === category;
      const matches = !needle || `${tool.name} ${tool.description} ${tool.category}`.toLowerCase().includes(needle);
      return inCategory && matches;
    });
  }, [query, category]);

  return (
    <aside className="sidebar unified-tools-sidebar">
      <div className="search">
        <Search size={16} />
        <input placeholder="Search all tools..." value={query} onChange={event => setQuery(event.target.value)} />
      </div>

      <div className="categories">
        {(['All', ...categories] as const).map(item => (
          <button key={item} className={`category-chip ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>

      <div className="tool-list">
        {filtered.map(tool => {
          const body = (
            <>
              <span className="tool-icon"><Wrench size={15} /></span>
              <span><strong>{tool.name}</strong><small>{tool.category}</small></span>
            </>
          );

          const className = `tool-item ${activeId === tool.id ? 'active' : ''}`;
          if (tool.href.startsWith('/workbench#') && onWorkbenchTool) {
            return <button key={tool.id} className={className} onClick={() => onWorkbenchTool(tool.href)}>{body}</button>;
          }
          return <Link key={tool.id} href={tool.href} className={className}>{body}</Link>;
        })}
        {!filtered.length && <div className="empty-state">No tools match that search.</div>}
      </div>
    </aside>
  );
}
