import Sidebar from "../_components/SideBarAdmin";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
     
     
        <Sidebar />
     

      
      <main className="flex-1 p-6 mr-24">{children}</main>
    </div>
  );
}
