import { useCallback, useEffect, useState } from 'react';
import LegacyWorkbench from '../components/LegacyWorkbench';
import UnifiedToolsSidebar from '../components/UnifiedToolsSidebar';

const workbenchNames: Record<string, string> = {
  'color-studio': 'Color Studio',
  json: 'JSON formatter',
  base64: 'Base64',
  url: 'URL encoder',
  uuid: 'UUID generator',
  slug: 'Slug generator',
  case: 'Case converter',
  timestamp: 'Timestamp converter',
  timezone: 'Timezone converter',
  password: 'Password generator',
  'text-stats': 'Text analyzer',
  jwt: 'JWT decoder',
  lorem: 'Lorem ipsum',
};

export default function WorkbenchPage() {
  const [activeId, setActiveId] = useState('color-studio');

  const activate = useCallback((href: string, updateUrl = true) => {
    const id = href.split('#')[1] || 'color-studio';
    const expected = workbenchNames[id];
    if (!expected) return;

    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.legacy-workbench .sidebar .tool-item'));
    const target = buttons.find(button => button.querySelector('strong')?.textContent?.trim() === expected);
    target?.click();
    setActiveId(id);
    if (updateUrl) window.history.replaceState(null, '', `/workbench#${id}`);
  }, []);

  useEffect(() => {
    const applyHash = () => activate(`/workbench${window.location.hash || '#color-studio'}`, false);
    const frame = window.requestAnimationFrame(applyHash);
    window.addEventListener('hashchange', applyHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', applyHash);
    };
  }, [activate]);

  return (
    <>
      <UnifiedToolsSidebar activeId={activeId} onWorkbenchTool={activate} />
      <div className="legacy-workbench"><LegacyWorkbench /></div>
      <style jsx global>{`
        .legacy-workbench .sidebar { display: none; }
        .legacy-workbench .workspace { display: block; }
        .legacy-workbench .tool-stage { margin-left: 286px; }
        .unified-tools-sidebar { z-index: 35; }
        @media (max-width: 980px) {
          .unified-tools-sidebar { display: none !important; }
          .legacy-workbench .sidebar { display: block; }
          .legacy-workbench .workspace { display: grid; }
          .legacy-workbench .tool-stage { margin-left: 0; }
        }
      `}</style>
    </>
  );
}
