import ProductCard from "../ProductCard"
import Link from "next/link";

const products = [
    {
      id: 1,
      image: "/Products/GuiltyEua.svg",
      name: "Guilty Eau",
      brand: "Gucci",
      price: 50.99,
      tag: "عطر رجالي",
      imageSize:"150",
      className:"p-12",
    },
    {
      id: 2,
      image: "/Products/ARMANICODE .svg",
      name: "ARMANI CODE Edp",
      brand: "Armani",
      price: 15.50,
      tag: "عطر رجالي",
      className:"p-12",
    },
    {
      id: 3,
      image: "/Products/N5.svg",
      name: "N°5",
      brand: "Chanel",
      price: 29.99,
      tag: "عطر نسائي",
      className:"p-10",
    },
    {
      id: 4,
      image: "/Products/PoisonGirl.svg",
      name: "Poison Girl",
      brand: "Dior",
      price: 29.99,
      tag: "عطر نسائي",
      imageSize:"130",
      className:"p-10",
    },
    {
      id: 5,
      image: "/Products/OudWood.svg",
      name: "Oud Wood",
      brand: "Tom Ford",
      price: 29.99,
      tag: "عطر رجالي",
      className:"p-10",
    },
    {
      id: 6,
      image: "/Products/RoseGoldea.svg",
      name: "Rose Goldea",
      brand: "Bvlgari",
      price: 29.99,
      tag: "عطر نسائي",
      imageSize:"160",
      className:"p-12",

    },
  ];
  
  const ProductSection = () => {
    return (
      <section className="text-center py-10">
        <h2 className="text-3xl font-bold mb-6">منتجات MB PARFUMS</h2>
        <div className="flex justify-items-end">
          <input
            type="text"
            placeholder="ابحث عن عطرك المفضل"
            className="border p-2 rounded-md w-80 text-right"
          />
        </div>
        <div className="flex justify-between mt-8">
        <div className="flex flex-wrap  p-20 gap-28 place-items-center">
            {products.map((product) => (
              <ProductCard  key={product.id} {...product} />
            ))}
          </div>
        </div>
        <Link href="/Products">
        <button className="bg-black text-white py-2 px-6 mt-6 rounded-md">
          عرض الكل
        </button>
        </Link>
      </section>
    );
  };
  export default ProductSection;