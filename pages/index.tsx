import { EditPlansProvider } from './EditPlansContext';
import NavSidebar from './NavSidebar';
import InputSidebar from './InputSidebar';
import dynamic from 'next/dynamic';

const EditPlansCanvas = dynamic(() => import('./EditPlansCanvas'), {
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
