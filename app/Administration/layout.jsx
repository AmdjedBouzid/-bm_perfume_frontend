import SideBarAdmin from "@/_components/SideBarAdmin"; 

export default function Layout({ children }) {
  return (
    <div className="flex">
      <SideBarAdmin />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
