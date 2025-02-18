"use client";
import { useAppContext } from "./context/AppContext";
import { DOMAIN } from "./utils/constants";


import HeroSection from "./_components/Sections/HeroSection"
import WhyUsSection from "./_components/Sections/WhyUsSection"
import ProductSection from "./_components/Sections/ProductSection"

export default function Home() {
  const { admin } = useAppContext();
  console.log(DOMAIN);

  console.log("admin", admin);
  return (
    <div className="">
     <HeroSection/>
     <WhyUsSection/>  
     <ProductSection/>
    </div>
    
  );
}
