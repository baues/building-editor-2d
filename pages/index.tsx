import dynamic from 'next/dynamic';

const EditPlansCanvas = dynamic(() => import('./EditPlansCanvas'), {
  ssr: false,
});
const EditPlansProvider = dynamic(() => import('./EditPlansContext').then(mod => mod.EditPlansProvider), {
  ssr: false,
});
const NavSidebar = dynamic(() => import('./NavSidebar'), {
  ssr: false,
});

const InputSidebar = dynamic(() => import('./InputSidebar'), {
  ssr: false,
});

export default function EditPlans(): React.ReactElement {
  return (
    <div
      onContextMenu={(e) => { e.preventDefault(); }}
    >
      <EditPlansProvider >
        <EditPlansCanvas />
        <NavSidebar />
        <InputSidebar />
      </EditPlansProvider>
    </div>
  );
}
