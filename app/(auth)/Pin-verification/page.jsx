"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { DOMAIN } from "../../utils/constants";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import Loader from "../../_components/Loader";

export default function VerificationCode() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [waitingResponse, setWaitingResponse] = useState(false);
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
      setWaitingResponse(true);
      const response = await axios.post(
        `${DOMAIN}/api/auth/pin-verification`,
        { Code_Pink: verificationCode },
        { withCredentials: true }
      );
      // console.log("response: ", response);
      if (response.status === 200 && typeof response.data.token === "string") {
        // console.log("token :", response.data.token);
        const Token = response.data.token;
        setWaitingResponse(false);

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
      setWaitingResponse(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-amber-100 to-amber-200 flex flex-col items-center justify-center p-40 max-lg:p-4 ">
      <div className="bg-[#D4B878] rounded-2xl p-8 shadow-lg h-[360px] w-1/3 flex flex-col items-center max-lg:w-full">
        {" "}
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
        </div>{" "}
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
          className="w-1/2 bg-black text-white p-3 rounded-lg mb-4 mt-4 font-bold hover:bg-black/90 transition-colors font-arabic flex items-center justify-center"
        >
          {waitingResponse ? <Loader /> : "تحقق"}
        </button>
      </div>
    </div>
  );
}
