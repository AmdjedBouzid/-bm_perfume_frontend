"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { DOMAIN } from "../../utils/constants";
import { toast } from "react-toastify";
import { userAgent } from "next/server";
import images from "../../../public/assets";
import Image from "next/image";
export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const handlingLogin = async (event) => {
    event.preventDefault();
    if (!password || !username || !email || !phonenumber) {
      toast.error("يجب ادخال جميع المعلومات 🙂🙂");
      return;
    }
    try {
      const response = await axios.post(
        `${DOMAIN}/api/auth/login`,
        { username, email, password, phonenumber },
        { withCredentials: true }
      );

      if (response.status === 200) {
        Cookies.set("state", "pinrecived");
        console.log("state:", Cookies.get("state"));

        router.push("/Pin-verification");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex p-8 flex-col gap-6 items-center ">
      <h3 className="text-[30.2px] font-bold">مرحبا بك في متجرك</h3>

      <div className="flex-1 w-full  flex justify-between pl-20 pr-20 max-sm:h-full">
        <div className="w-2/6  h-full max-sm:hidden">
          <img src={images.loginImage} alt="" className="h-full" />
        </div>
        <div className="w-3/6 max-sm:w-full h-full">
          <form
            className="h-full w-full bg-[#CCB87C] flex flex-col gap-3 pr-4 pl-4 max-sm:pl-1 max-sm:pr-1 rounded-lg pb-3"
            onSubmit={handlingLogin}
          >
            <div>
              <label className="block text-right mb-2 font-arabic">
                اسم المستخدم
              </label>
              <input
                type="text"
                placeholder="ادخل اسم المستخدم"
                className="w-full p-3 rounded-lg bg-white/90 text-right"
                dir="rtl"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-right mb-2 font-arabic">
                الايميل
              </label>
              <input
                type="email"
                placeholder="Parfume@gmail.com"
                className="w-full p-3 rounded-lg bg-white/90 text-right"
                dir="rtl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-right mb-2 font-arabic">
                كلمة المرور
              </label>
              <input
                type="password"
                placeholder="ادخل كلمة المرور"
                className="w-full p-3 rounded-lg bg-white/90 text-right"
                dir="rtl"
                value={password} // ✅ Added value
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-right mb-2 font-arabic">
                رقم الهاتف
              </label>
              <input
                type="tel"
                placeholder="ادخل رقم الهاتف"
                className="w-full p-3 rounded-lg bg-white/90 text-right"
                dir="rtl"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-lg font-bold hover:bg-black/90 transition-colors font-arabic"
            >
              سجل الدخول
            </button>
          </form>
        </div>
      </div>
    </div>

    // <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-200 flex flex-col items-center justify-center p-4">
    //   <h1 className="text-3xl font-bold mb-8 text-right w-full max-w-md px-4 font-arabic">
    //     مرحبا بك في متجرك
    //   </h1>

    //   <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-8 px-4">
    //     <div className="w-full md:w-1/2 relative max-sm:hidden">
    //       <div className="rounded-2xl overflow-hidden shadow-xl"></div>
    //     </div>

    //     <div className="w-full md:w-1/2">
    //       <div className="bg-[#D4B878] rounded-2xl p-8 shadow-lg">
    //         <h2 className="text-2xl font-bold mb-6 text-right font-arabic">
    //           تسجيل الدخول
    //         </h2>

    // <form className="space-y-6" onSubmit={handlingLogin}>
    //   <div>
    //     <label className="block text-right mb-2 font-arabic">
    //       اسم المستخدم
    //     </label>
    //     <input
    //       type="text"
    //       placeholder="ادخل اسم المستخدم"
    //       className="w-full p-3 rounded-lg bg-white/90 text-right"
    //       dir="rtl"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
    //   </div>

    //   <div>
    //     <label className="block text-right mb-2 font-arabic">
    //       الايميل
    //     </label>
    //     <input
    //       type="email"
    //       placeholder="Parfume@gmail.com"
    //       className="w-full p-3 rounded-lg bg-white/90 text-right"
    //       dir="rtl"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //   </div>

    //   <div>
    //     <label className="block text-right mb-2 font-arabic">
    //       كلمة المرور
    //     </label>
    //     <input
    //       type="password"
    //       placeholder="ادخل كلمة المرور"
    //       className="w-full p-3 rounded-lg bg-white/90 text-right"
    //       dir="rtl"
    //       value={password} // ✅ Added value
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //   </div>

    //   <div>
    //     <label className="block text-right mb-2 font-arabic">
    //       رقم الهاتف
    //     </label>
    //     <input
    //       type="tel"
    //       placeholder="ادخل رقم الهاتف"
    //       className="w-full p-3 rounded-lg bg-white/90 text-right"
    //       dir="rtl"
    //       value={phonenumber}
    //       onChange={(e) => setPhonenumber(e.target.value)}
    //     />
    //   </div>

    //   <button
    //     type="submit"
    //     className="w-full bg-black text-white p-3 rounded-lg font-bold hover:bg-black/90 transition-colors font-arabic"
    //   >
    //     سجل الدخول
    //   </button>
    // </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
