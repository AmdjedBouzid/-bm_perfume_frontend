import Image from "next/image";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-right w-full max-w-md px-4 font-arabic">
        مرحبا بك في متجرك
      </h1>

      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-8 px-4">
        <div className="w-full md:w-1/2 relative">
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

        {/* Right side - Login Form */}
        <div className="w-full md:w-1/2">
          <div className="bg-[#D4B878] rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-right font-arabic">
              تسجيل الدخول
            </h2>

            <form className="space-y-6">
              <div>
                <label className="block text-right mb-2 font-arabic">
                  اسم المستخدم
                </label>
                <input
                  type="text"
                  placeholder="ادخل اسم المستخدم"
                  className="w-full p-3 rounded-lg bg-white/90 text-right"
                  dir="rtl"
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
                />
              </div>

              <div>
                <label className="block text-right mb-2 font-arabic">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="ادخل كلمة المرور"
                    className="w-full p-3 rounded-lg bg-white/90 text-right"
                    dir="rtl"
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
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
    </div>
  );
}
