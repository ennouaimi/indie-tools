import { useRouter } from 'next/router';
import LegacyLab from '../components/LegacyLab';
import UnifiedToolsSidebar from '../components/UnifiedToolsSidebar';

export default function LabPage() {
  const router = useRouter();
  const activeId = typeof router.query.tool === 'string' ? router.query.tool : undefined;

  return (
    <>
      <UnifiedToolsSidebar activeId={activeId} />
      <div className="legacy-lab"><LegacyLab /></div>
      <style jsx global>{`
        .legacy-lab .sidebar { display: none; }
        .legacy-lab .workspace { display: block; }
        .legacy-lab .tool-stage { margin-left: 286px; }
        .unified-tools-sidebar { z-index: 35; }
        @media (max-width: 980px) {
          .unified-tools-sidebar { display: none !important; }
          .legacy-lab .sidebar { display: block; }
          .legacy-lab .workspace { display: grid; }
          .legacy-lab .tool-stage { margin-left: 0; }
        }
      `}</style>
    </>
  );
}
