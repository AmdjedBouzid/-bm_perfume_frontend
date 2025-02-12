"use client";

import { useState } from "react";
import Image from "next/image";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed top-0 right-0 h-screen bg-black text-secondary shadow-[rgba(0,0,0,0.25)] overflow-y-scroll rounded-l-2xl transition-all duration-300 ${
        isOpen ? "w-[229px]" : "w-[75px]"
      }`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex flex-col items-end mt-10 gap-20 pr-4">
        <div className="flex flex-row-reverse items-center  space-x-reverse space-x-3">
          <Image
            src="/icons/user-circle.svg"
            width={30}
            height={30}
            alt="user"
          />
          <span
            className={`${isOpen ? "block" : "hidden"} text-[22px] font-medium`}
          >
            المسؤول
          </span>
        </div>

        <nav className="flex flex-col space-y-6 font-semibold text-[20px] w-full">
          <SidebarItem
            isOpen={isOpen}
            imgSrc="/icons/Dashbord.svg"
            text="لوحة التحكم"
          />
          <SidebarItem
            isOpen={isOpen}
            imgSrc="/icons/Category.svg"
            text="الشركات"
          />
          <SidebarItem
            isOpen={isOpen}
            imgSrc="/icons/Products.svg"
            text="المنتجات"
          />
          <SidebarItem
            isOpen={isOpen}
            imgSrc="/icons/Order.svg"
            text="الطلبات"
          />
          <SidebarItem
            isOpen={isOpen}
            imgSrc="/icons/archive-02.svg"
            text="الأرشيف"
          />
          <SidebarItem
            isOpen={isOpen}
            imgSrc="/icons/Products.svg"
            text="الإعدادات"
          />
        </nav>

        <SidebarItem
          isOpen={isOpen}
          imgSrc="/icons/logout-03.svg"
          text="تسجيل الخروج"
          customClass="mt-auto text-[20px] mt-20 font-medium mb-6"
        />
      </div>
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
