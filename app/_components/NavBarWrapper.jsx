"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBarUser";

export default function NavBarWrapper() {
  const pathname = usePathname();
  const hiddenRoutes = ["/auth", "/Administration"];
  const shouldHideNavBar = hiddenRoutes.some((route) => pathname.startsWith(route));

  return shouldHideNavBar ? null : <NavBar />;
}
