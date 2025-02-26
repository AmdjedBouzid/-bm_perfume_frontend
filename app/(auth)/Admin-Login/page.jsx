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
import { Eye, EyeOff } from "lucide-react";
import Loader from "../../_components/Loader";
export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [waitingResponse, setWaitingResponse] = useState(false);
  const handlingLogin = async (event) => {
    event.preventDefault();
    if (!password || !username || !email || !phonenumber) {
      toast.error("يجب ادخال جميع المعلومات 🙂🙂");
      return;
    }
    try {
      setWaitingResponse(true);
      const response = await axios.post(
        `${DOMAIN}/api/auth/login`,
        { username, email, password, phonenumber },
        { withCredentials: true }
      );

      if (response.status === 200) {
        Cookies.set("state", "pinrecived");
        console.log("state:", Cookies.get("state"));
        setWaitingResponse(false);
        router.push("/Pin-verification");
      }
    } catch (error) {
      console.log("Login Error:", error);
      toast.error(error?.response?.data?.message);
      setWaitingResponse(false);
    }
  };

  return (
    <div className="min-h-screen flex mt-12 max-lg:p-4 max-sm:p-6 flex-col gap-12 items-center max-lg:mt-4">
      <h3 className="text-[60px] max-lg:text-[30px]  font-bold">
        مرحبا بك في متجرك
      </h3>

      <div className="h-screen w-full  flex justify-center gap-36  max-lg:h-full ">
        <img
          src={images.loginImage}
          alt=""
          className="h-[716px] w-[500px]  max-lg:hidden"
        />

        <form
          className="h-[716px] w-[500px]  bg-[#CCB87C] flex flex-col gap-12 p-14  max-lg:w-full max-lg:pl-1 max-md:pr-1 rounded-xl pb-3"
          onSubmit={handlingLogin}
        >
          <div className="">
            <label className="block text-right font-semibold mb-2 text-[20px]">
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
            <label className="block text-right font-semibold mb-2 text-[20px]">
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
            <label className="block text-right mb-2 font-semibold  text-[20px]">
              كلمة المرور
            </label>
            <div className="flex justify-content gap-4 w-full p-3 rounded-lg bg-white/90 text-right">
              {showPassword ? (
                <Eye
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <EyeOff
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}

              <input
                type={showPassword ? "text" : "password"}
                placeholder="ادخل كلمة المرور"
                className="w-full bg-transparent text-right outline-none"
                dir="rtl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-right font-semibold mb-2 text-[20px]">
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
            className="w-full bg-black text-white p-3 rounded-lg font-bold hover:bg-black/90 transition-colors text-[20px]  flex items-center justify-center"
          >
            {waitingResponse ? <Loader /> : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
}
