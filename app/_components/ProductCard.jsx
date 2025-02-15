import React from "react";

const ProductCard = ({
  image,
  name,
  brand,
  price,
  tag,
  imageSize = 196,
  textSize = "text-[20px]",
  buttonSize = "w-[129px] h-[45px]",
  className = "", 
}) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg p-4 w-[246px] h-[420px] flex flex-col justify-between relative ${className}`}
    >
      <div className="absolute top-2 right-2 bg-secondary opacity-85 text-white text-xs px-3 py-1 rounded-lg rotate-12">
        {tag}
      </div>

      {/* التحكم في حجم الصورة */}
      <div className="flex justify-center mt-4">
        <img
          src={image}
          alt={name}
          className={`h-${imageSize} object-cover`}
          width={imageSize}
          height={imageSize}
        />
      </div>

      <div className="mt-4 flex flex-col gap-2 text-right">
        <h2 className="text-[22px] font-bold truncate">{name}</h2>

        <div>
          <p className={`text-primary ${textSize}`}>
            <span className="font-bold">{brand}</span>{" "}
            <span className="font-medium"> : البراند</span>
          </p>
          <p className={`text-secondary ${textSize}`}>
            <span className="text-black font-medium">السعر :</span>{" "}
            <span className="font-bold"> ${price.toFixed(2)} </span>
          </p>
        </div>

        <div className="flex justify-center items-center">
          <button
            className={`mt-2 bg-black text-white px-4 py-2 rounded-lg ${buttonSize}`}
          >
            عرض التفاصيل
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
