"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`fixed bg-black text-secondary shadow-[rgba(0,0,0,0.25)] overflow-hidden transition-all duration-500 ${
        isMobile
          ? "bottom-0 left-0 right-0 h-[60px] flex justify-around items-center"
          : `top-0 right-0 h-screen rounded-l-2xl ${
              isOpen ? "min-w-[229px] " : "min-w-[75px]"
            }`
      }`}
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
    >
      {!isMobile ? (
        <div className="flex flex-col items-end mt-20 gap-20 pr-4">
          <div className="flex flex-row-reverse items-center space-x-reverse space-x-3">
            <Image
              src="/icons/user-circle.svg"
              width={30}
              height={30}
              alt="user"
            />
            <span
              className={`${
                isOpen ? "block" : "hidden"
              } text-[22px] font-medium`}
            >
              المسؤول
            </span>
          </div>

          <nav className="flex flex-col space-y-6 font-semibold text-[20px] w-full">
            <Link href="/Administration/">
              <SidebarItem
                isOpen={isOpen}
                imgSrc="/icons/Dashbord.svg"
                text="لوحة التحكم"
              />
            </Link>
            <Link href="/Administration/Brand">
              <SidebarItem
                isOpen={isOpen}
                imgSrc="/icons/Category.svg"
                text="الشركات"
              />
            </Link>
            <Link href="/Administration/Products">
              <SidebarItem
                isOpen={isOpen}
                imgSrc="/icons/Products.svg"
                text="المنتجات"
              />
            </Link>
            <Link href="/Administration/Order">
              <SidebarItem
                isOpen={isOpen}
                imgSrc="/icons/Order.svg"
                text="الطلبات"
              />
            </Link>
            <Link href="/Administration/Archive">
              <SidebarItem
                isOpen={isOpen}
                imgSrc="/icons/archive-02.svg"
                text="الأرشيف"
              />
            </Link>
            <Link href="/Administration/Profile">
              <SidebarItem
                isOpen={isOpen}
                imgSrc="/icons/settings.svg"
                text="الإعدادات"
              />
            </Link>
          </nav>
          <SidebarItem
            isOpen={isOpen}
            imgSrc="/icons/logout-03.svg"
            text="تسجيل الخروج"
            customClass="mt-auto text-[20px] mt-20 font-medium mb-6"
          />
        </div>
      ) : (
        <nav className="flex gap-2 w-full ">
          <SidebarItem isOpen={true} imgSrc="/icons/logout-03.svg" text="" />
          <Link href="/Administration/settings">
            <SidebarItem isOpen={true} imgSrc="/icons/settings.svg" text="" />
          </Link>
          <Link href="/Administration/Archive">
            <SidebarItem isOpen={true} imgSrc="/icons/archive-02.svg" text="" />
          </Link>
          <Link href="/Administration/Order">
            <SidebarItem isOpen={true} imgSrc="/icons/Order.svg" text="" />
          </Link>
          <Link href="/Administration/Products">
            <SidebarItem isOpen={true} imgSrc="/icons/Products.svg" text="" />
          </Link>
          <Link href="/Administration/Brand">
            <SidebarItem isOpen={true} imgSrc="/icons/Category.svg" text="" />
          </Link>
          <Link href="/Administration/">
            <SidebarItem isOpen={true} imgSrc="/icons/Dashbord.svg" text="" />
          </Link>
        </nav>
      )}
    </div>
  );
};

const SidebarItem = ({ isOpen, Icon, imgSrc, text, customClass = "" }) => {
  return (
    <div
      className={`flex flex-row-reverse items-center space-x-reverse space-x-3 text-right p-2 cursor-pointer hover:bg-gray-800 rounded ${customClass}`}
    >
      {imgSrc ? (
        <Image src={imgSrc} alt={text} width={24} height={24} />
      ) : (
        Icon && <Icon size={24} />
      )}
      <span className={`${isOpen ? "block" : "hidden"} text-[18px]`}>
        {text}
      </span>
    </div>
  );
};

export default Sidebar;
