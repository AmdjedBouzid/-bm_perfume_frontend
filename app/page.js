"use client";
import Image from "next/image";
import { useAppContext } from "./context/AppContext";
import { DOMAIN } from "./utils/constants";
export default function Home() {
  const { admin } = useAppContext();
  console.log(DOMAIN);
  console.log(admin);
  return <div className="">home page</div>;
}
