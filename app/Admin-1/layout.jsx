import Sidebar from "../_components/SideBarAdmin";

export default function AdminLayout({ children }) {
  return (
    <div>
      <main className="flex-1 p-6">
        <Sidebar/>
        {children}
        
        </main>
    </div>
  );
}
