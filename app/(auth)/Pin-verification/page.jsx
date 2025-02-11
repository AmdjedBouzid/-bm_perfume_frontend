"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { DOMAIN } from "../../utils/constants";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
export default function VerificationCode() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleInput = (e, index) => {
    const value = e.target.value;

    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value.length === 1 && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);

    const newCode = [...code];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) {
        newCode[index] = char;
      }
    });
    setCode(newCode);
  };

  const handleVerify = async () => {
    try {
      const verificationCode = code.join("");
      const response = await axios.post(
        `${DOMAIN}/api/auth/pin-verification`,
        { Code_Pink: verificationCode },
        { withCredentials: true }
      );
      console.log("response: ", response);
      if (response.status === 200 && typeof response.data.token === "string") {
        // console.log("token :", response.data.token);
        const Token = response.data.token;

        if (Token) {
          Cookies.set("Token", Token, {
            expires: 30,
            path: "/",
            secure: false,
            sameSite: "strict",
          });
          Cookies.set("state", "authenticated");
          router.push("/Administration");
        }
      }
    } catch (error) {
      console.log("error.code:", error.code);

      Cookies.set("Token", "");
      Cookies.set("state", "notauthenticated");

      console.error("Verification failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-right w-full max-w-md px-4 font-arabic">
        مرحبا بك في متجرك
      </h1>

      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-8 px-4">
        {/* Left side - Image */}
        <div className="w-full md:w-1/2 relative max-sm:hidden">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/perfume-desert.jpg"
              alt="Perfume bottle in desert"
              width={500}
              height={600}
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Right side - Verification Form */}
        <div className="w-full md:w-1/2">
          <div className="bg-[#D4B878] rounded-2xl p-8 shadow-lg">
            <div className="flex justify-center mb-6">
              <svg
                className="w-16 h-16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
                <circle cx="19" cy="5" r="3" fill="#EF4444" />
              </svg>
            </div>

            <h2 className="text-xl font-bold mb-6 text-center font-arabic">
              أدخل الرمز المرسل إلى بريدك الإلكتروني
            </h2>

            <div className="flex justify-center gap-2 mb-8 dir-ltr">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="number"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-xl font-bold rounded-lg bg-white/90 border-2 border-transparent focus:border-black focus:outline-none"
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              className="w-full bg-black text-white p-3 rounded-lg font-bold hover:bg-black/90 transition-colors font-arabic"
            >
              تحقق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
