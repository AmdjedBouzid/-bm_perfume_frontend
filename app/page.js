"use client";
import Image from "next/image";
import { useAppContext } from "./context/AppContext";
import { DOMAIN } from "./utils/constants";
import images from "../public/assets";
export default function Home() {
  const { admin } = useAppContext();
  console.log(DOMAIN);
  console.log("admin", admin);
  return <div className="">

    <h1 className="text-3xl flex justify-center mt -4 font-extrabold">مرحبا بك</h1>
    
  </div>;
  return (
    <div className="">
      <h1 className="text-3xl flex justify-center mt -4 font-extrabold">
        مرحبا بك
      </h1>
      <Image src={images.loginImage} alt="" width={200} height={200} />
    </div>
  );
}
