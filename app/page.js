"use client";
import Image from "next/image";
import { useAppContext } from "./context/AppContext";
export default function Home() {
  const { admin } = useAppContext();
  console.log(admin);
  return <div className="">home page</div>;
}
