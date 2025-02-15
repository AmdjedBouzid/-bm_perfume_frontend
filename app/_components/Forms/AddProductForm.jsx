"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Loader from "../Loader";
import axios from "axios";
import { DOMAIN } from "../../utils/constants";
import { CldUploadButton } from "next-cloudinary";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Yantramanav } from "next/font/google";
import { useAppContext } from "../../context/AppContext";
export default function AddProductForm({ onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sex, setSex] = useState("Male");
  const [openSizeInput, setOpenSizeInput] = useState(false);
  const [company, setCompany] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [sizes, setSises] = useState([]);
  const [newSize, setNewSize] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [sendRequestLoader, setSendRequestLoader] = useState(false);
  const qualities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const [images, setImages] = useState([]);
  const [quality, setQuality] = useState(1);
  const addSize = () => {
    if (!newSize || !newPrice) return;
    setSises([...sizes, { size: Number(newSize), price: Number(newPrice) }]);
    setNewSize("");
    setNewPrice("");
    setOpenSizeInput(false);
  };
  const { products, setProducts } = useAppContext();
  const deleteSize = (index) => {
    setSises(sizes.filter((_, i) => i !== index));
    setOpenSizeInput(false);
  };
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${DOMAIN}/api/Brand`);
        setCompanies(response.data.brands);
      } catch (error) {
        console.error("فشل تحميل الشركات:", error);
      } finally {
        setLoadingCompanies(false);
      }
    };

    fetchCompanies();
  }, []);

  const onUpload = (result) => {
    if (result) {
      console.log("result:", result.info.secure_url);
      setImages((prevImages) => [...prevImages, result?.info?.secure_url]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        images.length === 0 ||
        name === "" ||
        sizes.length === 0 ||
        company === "" ||
        (sex !== "Male" && sex !== "Female")
      ) {
        toast.error("يجب إدخال جميع المعلومات", {
          position: "top-center",
        });
        return;
      }

      const formData = {
        name,
        description,
        bottles: sizes,
        images,
        brandId: company,
        sex,
        quality: parseInt(quality),
      };

      console.log("formData: ", formData);

      let token = Cookies.get("Token")?.trim();

      if (!token) {
        console.log("No token found in cookies");
        Cookies.set("Token", "");
        Cookies.set("state", "notauthenticated");
        return;
      }
      setSendRequestLoader(true);
      const response = await axios.post(`${DOMAIN}/api/Perfume`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        onClose();
        console.log("Success:", response.data);
        toast.success("تم الإرسال بنجاح!");
        setSendRequestLoader(false);
        setProducts((prev) => [...prev, response.data.Perfume]);
      }
    } catch (error) {
      setSendRequestLoader(false);
      console.log("Error:", error?.response?.data?.message || error.message);
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء الإرسال");
    }
  };

  const deleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 max-lg:p-4">
      <div className="bg-white p-6 rounded-lg w-[843px] h-3/4 relative overflow-y-scroll no-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-600"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">إضافة منتج جديد</h2>

        <form>
          <div className="mb-4">
            <label className="block text-right text-gray-700 font-medium mb-2">
              اسم المنتج
            </label>
            <input
              type="text"
              placeholder="... اسم المنتج"
              className="w-full border border-gray-300 p-3 text-right rounded-lg bg-gray-100"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-right text-gray-700 font-medium mb-2">
              وصف المنتج
            </label>
            <textarea
              placeholder="... وصف المنتج"
              className="w-full border border-gray-200 p-3 text-right rounded-lg bg-gray-100 h-28 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-right text-gray-700 font-medium mb-2">
              شركة المنتج
            </label>
            {loadingCompanies ? (
              <p className="text-gray-500">جارِ تحميل الشركات...</p>
            ) : (
              <select
                className="w-full border border-gray-300 p-3 text-right rounded-lg bg-gray-100"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              >
                <option value="">اختر الشركة</option>
                {companies.length > 0 ? (
                  companies.map((comp) => (
                    <option key={comp._id} value={comp._id}>
                      {comp.name}
                    </option>
                  ))
                ) : (
                  <option disabled>لا توجد شركات متاحة</option>
                )}
              </select>
            )}
          </div>

          <div className="mb-20 flex justify-between gap-3 w-full ">
            <div className="h-3 w-full ">
              <label className="block text-right text-gray-700 font-medium mb-2">
                الجنس
              </label>
              <select
                className="w-full border border-gray-300 p-3 text-right rounded-lg bg-gray-100"
                id="sex"
                name="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              >
                <option value="Male">ذكر</option>
                <option value="Female">أنثى</option>
              </select>
            </div>
            <div className="h-3 w-full">
              <label className="block text-right text-gray-700 font-medium mb-2">
                الجودة
              </label>
              <select
                className="w-full border border-gray-300 p-3 text-right rounded-lg bg-gray-100 "
                id="quality"
                name="quality"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              >
                <option value="">اختر الشركة</option>
                {qualities.length > 0 ? (
                  qualities.map((item, index) => (
                    <option key={index} value={item}>
                      <X />
                      {item}
                    </option>
                  ))
                ) : (
                  <option disabled>لا توجد شركات متاحة</option>
                )}
              </select>
            </div>
          </div>
          <div className="w-full flex justify-end">
            {!openSizeInput ? (
              <button
                className={`bg-black text-white text-lg font-medium p-3 rounded-lg mt-10 flex justify-center items-center mb-5`}
                onClick={() => {
                  setOpenSizeInput(!openSizeInput);
                }}
              >
                إظافة حجم
              </button>
            ) : (
              <></>
            )}
          </div>
          {openSizeInput ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 max-lg:p-6">
              <div className="h-52 w-1/4 max-lg:w-full  p-4 flex flex-col gap-10 rounded-lg bg-white">
                <div className="w-full flex justify-between items-center">
                  <div className=" flex flex-col items-end">
                    <label className="block text-right text-gray-700 font-medium mb-2">
                      الحجم(مل)
                    </label>
                    <input
                      type="number"
                      placeholder="السعر (دج)"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full border border-gray-300 p-3 text-right rounded-lg bg-gray-100 appearance-none"
                    />
                  </div>
                  <div className=" flex flex-col items-end">
                    <label className="block text-right text-gray-700 font-medium mb-2">
                      الحجم(مل)
                    </label>
                    <input
                      type="number"
                      placeholder="الحجم (مل)"
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      className="w-full border border-gray-300 p-3 text-right rounded-lg bg-gray-100 appearance-none"
                    />
                  </div>
                </div>
                <div className="w-full flex gap-5">
                  <button
                    className="bg-black text-white text-lg font-medium p-3 rounded-lg   flex justify-center items-center w-full"
                    onClick={() => {
                      setNewSize("");
                      setNewPrice("");
                      setOpenSizeInput(false);
                    }}
                  >
                    إلغاء
                  </button>
                  <button
                    className="bg-black text-white text-lg font-medium p-3 rounded-lg flex justify-center items-center w-full"
                    onClick={addSize}
                  >
                    تأكيد
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {sizes.length > 0 ? (
            <div className="h-auto w-full  mt-2 flex flex-col gap-1 rounded-sm ">
              {sizes.map((item, index) => (
                <div
                  key={index}
                  className="h-12 w-full bg-gray-200 flex justify-between items-center cursor-pointer hover:bg-red-200"
                  onClick={() => deleteSize(index)}
                >
                  <div>{item.price}(دج)</div>
                  <div>{item.size} (مل)</div>
                  <div>
                    <X />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}

          <div className=" w-full  flex items-center justify-center bg-black text-white text-lg font-medium p-3 rounded-lg mt-10  mb-5">
            {" "}
            <CldUploadButton uploadPreset="olystsuw" onSuccess={onUpload}>
              <h1>أظف صورة</h1>
            </CldUploadButton>
          </div>
          <div className="w-full flex flex-wrap gap-4  ">
            {images.map((item, index) => (
              <div
                className="h-28 w-28 relative"
                key={index}
                onClick={() => deleteImage(index)}
              >
                <X className="relative top-0 left-0" size={24} />
                <img
                  src={item}
                  alt=""
                  className="h-full w-full rounded-xl cursor-pointer"
                />
              </div>
            ))}
          </div>
          <div className="w-full h-auto flex justify-center items-center ">
            {" "}
            <button
              className="bg-black text-white text-lg font-medium p-3 rounded-lg flex justify-center items-center w-1/2 mt-16"
              onClick={handleSubmit}
            >
              {sendRequestLoader ? <Loader /> : "تأكيد"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
