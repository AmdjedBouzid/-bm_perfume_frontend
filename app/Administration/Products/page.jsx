"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import Image from "next/image";
import { DOMAIN } from "../../utils/constants";
import DeleteConfirmationModal from "../../_components/Forms/DeleteConfirmationModal";
import AddProductForm from "../../_components/Forms/AddProductForm";
import { useAppContext } from "../../context/AppContext";
export default function ProductTable() {
  const [search, setSearch] = useState("");
  // Hadil!! => hetre how you should use global state (just defind hin in the context and import here)
  const { products, setProducts } = useAppContext();
  // Hadil!! => hetre how you should use global state (just defind hin in the context and import here)
  const [brands, setBrands] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    axios
      .get(`${DOMAIN}/api/Perfume?page=${currentPage}&limit=6`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => console.error("❌ خطأ في جلب المنتجات:", err));

    axios
      .get(`${DOMAIN}/api/Brand`)
      .then((res) => {
        const brandMap = {};
        res.data.brands?.forEach((brand) => {
          brandMap[brand._id] = brand.name;
        });
        setBrands(brandMap);
      })
      .catch((err) => console.error("❌ خطأ في جلب الشركات:", err));
  }, [currentPage]);

  const deleteProduct = async () => {
    if (!selectedProductId) return;

    try {
      await axios.delete(`${DOMAIN}/api/Perfume/${selectedProductId}`);
      setProducts((prev) => prev.filter((p) => p._id !== selectedProductId));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("❌ خطأ في حذف المنتج:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));

  return (
    <div className="p-4 md:p-8 lg:p-12 bg-white pb-20">
      <div className="flex items-center gap-3 w-full mb-6">
        <button
          className="bg-black text-white p-3 rounded-lg whitespace-nowrap flex gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          اضافة منتج جديد <img src="/icons/add-circle.svg" alt="add" />
        </button>
        <div className="relative flex-1 max-w-[250px]">
          <input
            type="text"
            placeholder="البحث"
            className="pl-10 pr-4 py-2 border rounded-lg w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse border border-gray-300"
          dir="rtl"
        >
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-4">اسم المنتج</th>
              <th className="border border-gray-300 p-4">الوصف</th>
              <th className="border border-gray-300 p-4">الشركة</th>
              <th className="border border-gray-300 p-4">الحجم / السعر</th>
              <th className="border border-gray-300 p-4">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product._id} className="text-center">
                  <td className="border border-gray-300 p-4">{product.name}</td>
                  <td className="border border-gray-300 p-4">
                    {product.description}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {brands[product.brandId] || "غير معروف"}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {product.bottles?.length > 0 ? (
                      product.bottles.map((bottle, index) => (
                        <div key={bottle._id || index}>
                          {bottle.size} مل - {bottle.price} دج
                        </div>
                      ))
                    ) : (
                      <div>غير متوفر</div>
                    )}
                  </td>
                  <td className="border p-4 flex justify-center gap-2">
                    <button>
                      <Image
                        src="/icons/pencil-edit.svg"
                        width={24}
                        height={24}
                        alt="Edit"
                      />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProductId(product._id);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <Image
                        src="/icons/delete-02.svg"
                        width={24}
                        height={24}
                        alt="Delete"
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  لا توجد منتجات
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center md:justify-start items-center gap-4 mt-4">
        <button
          onClick={() =>
            setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={currentPage >= totalPages}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          التالي
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          السابق
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black  bg-opacity-50">
          <AddProductForm onClose={() => setIsModalOpen(false)} />
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center w-full bg-black bg-opacity-50">
          <DeleteConfirmationModal
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={deleteProduct}
            title={"هل تريد حذف هذا المنتج؟"}
          />
        </div>
      )}
    </div>
  );
}
