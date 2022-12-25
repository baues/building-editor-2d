import EditPlansCanvas from "./EditPlansCanvas";
import { EditPlansProvider } from "./EditPlansContext";
import InputSidebar from "./InputSidebar";
import NavSidebar from "./NavSidebar";

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
