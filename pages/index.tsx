import { EditPlansProvider } from './EditPlansContext';
import NavSidebar from './NavSidebar';
import InputSidebar from './InputSidebar';
import EditPlansCanvas from './EditPlansCanvas';

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
