"use client";
import { ShoppingCart, Heart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-black text-secondary py-4 px-6 flex justify-between h-[80px] items-center rtl  ">
      {/* أيقونات */}
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <img alt="Shoping" src="/icons/shopping-cart-01.svg" width={35} height={35} className="text-secondary  cursor-pointer hover:text-accent" />
        <img alt="Shoping" src="/icons/Wishlist.svg" width={40} height={40} className="text-secondary  cursor-pointer hover:text-accent" />
      </div>
      
      {/* القائمة اليمنى */}
      <div className="flex items-center space-x-16 rtl:space-x-reverse font-bold  text-secondary text-lg">
        <a href="/" className= "hover:text-accent">تواصل معنا</a>
        <a href="#" className="hover:text-accent">لماذا نحن</a>
        <a href="/Products" className="hover:text-accent">المنتجات</a>
        <a href="/" className="hover:text-accent">الرئيسية</a>
      </div>

      {/* الشعار */}
      <img src="/icons/MB.svg" alt="MB" className="px-8"/>
    </nav>
  );
}