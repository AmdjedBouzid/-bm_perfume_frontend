"use client";

import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import {
  MdDashboard,
  MdStore,
  MdArchive,
  MdShoppingCart,
  MdCategory,
} from "react-icons/md";
import { FiUsers } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed top-0 right-0 h-screen bg-black text-secondary rounded-l-lg transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex flex-col items-end mt-10 gap-12 pr-4">
        <div className="flex flex-row-reverse items-center space-x-reverse space-x-3">
          <FiUsers size={24} />
          <span
            className={`${isOpen ? "block" : "hidden"} text-[22px] font-medium`}
          >
            المسؤول
          </span>
        </div>

        <nav className="flex flex-col space-y-4 font-bold text-[24px] w-full">
          <SidebarItem isOpen={isOpen} Icon={MdDashboard} text="لوحة التحكم" />
          <SidebarItem isOpen={isOpen} Icon={FiUsers} text="الشركات" />
          <SidebarItem isOpen={isOpen} Icon={MdCategory} text="المنتجات" />
          <SidebarItem isOpen={isOpen} Icon={MdShoppingCart} text="الطلبات" />
          <SidebarItem isOpen={isOpen} Icon={MdArchive} text="الأرشيف" />
          <SidebarItem
            isOpen={isOpen}
            Icon={IoSettingsSharp}
            text="الإعدادات"
          />
        </nav>

        <SidebarItem
          isOpen={isOpen}
          Icon={FaSignOutAlt}
          text="تسجيل الخروج"
          customClass="mt-auto mb-6"
        />
      </div>
    </div>
  );
};

const SidebarItem = ({ isOpen, Icon, text, customClass = "" }) => {
  return (
    <div
      className={`flex flex-row-reverse items-center space-x-reverse space-x-3 text-right p-2 cursor-pointer hover:bg-gray-800 rounded ${customClass}`}
    >
      <Icon size={24} />
      <span className={`${isOpen ? "block" : "hidden"} text-sm`}>{text}</span>
    </div>
  );
};

export default Sidebar;
