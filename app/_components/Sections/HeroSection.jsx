import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] flex justify-end items-center">
      <Image
        src="/Section.svg"
        alt="Perfume Background"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-full h-full"
      />

      <div className="relative flex flex-col items-center gap-20  w-[600px] mr-20">
        <div className="">
          <img src="/Logo.svg" width={400} height={116} className="" />
        </div>
        <div className=" flex flex-col items-end gap-8 ">
          <p className="text-[30px] text-right font-bold">
            العطر هو اللمسة الأخيرة التي تُكمل أناقتك
          </p>
          <Link href="/Products">
            <button className="mt-4 px-6 py-2 bg-black text-white rounded-lg w-36 h-12">
              تسوق الآن
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
