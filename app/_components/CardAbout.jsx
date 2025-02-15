import Image from "next/image";

const CardAbout = ({ icon, title, description }) => {
  return (
    <div className="bg-accent bg-opacity-[0.36]   shadow-xl rounded-xl p-6 text-center w-[257px] h-[300px]">
       <div className="mt-8 flex flex-col gap-6 ">
      {icon && (
        <div className="flex justify-center ">
          <Image src={icon} alt="icon" width={55} height={55} />
        </div>
      )}

     
      <h2 className="text-xl font-bold text-black">{title}</h2>

      
      <p className="text-black font mt-2">{description}</p>
      </div>
    </div>
  );
};

export default CardAbout;
