"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Loader from "../Loader";

export default function AddBrandForm({ onClose, onAddCompany }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onAddCompany({ name, description, img: preview });
    } catch (error) {
      console.error("حدث خطأ أثناء الإرسال:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[543px] h-[600px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-600"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          إضافة شركة جديدة
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-right text-gray-700 font-medium mb-2">
              اسم الشركة
            </label>
            <input
              type="text"
              placeholder="... اسم الشركة"
              className="w-full border border-gray-300 p-3 text-right rounded-lg bg-gray-100"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-right text-gray-700 font-medium mb-2">
              وصف الشركة
            </label>
            <textarea
              placeholder="... وصف الشركة"
              className="w-full border border-gray-200 p-3 text-right rounded-lg bg-gray-100 h-28 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-4 border-dashed border-2 border-secondary p-6 mt-8 text-center rounded-lg">
            <label className="cursor-pointer flex flex-col items-center">
              <img
                src="/icons/Upload.svg"
                alt="Upload"
                className="w-10 h-10 "
              />
              <span className="text-secondary font-medium">إضافة صورة</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={selectedImage !== null}
              />
            </label>
          </div>

          {selectedImage && preview && (
            <div className="flex justify-between items-center p-2 rounded-lg  ">
              <p className="text-center text-gray-600 text-sm">
                {" "}
                {selectedImage}
              </p>
              <button onClick={removeImage} className="text-primary opacity-60">
                <X size={20} />
              </button>
            </div>
          )}

          <button
            type="submit"
            className="bg-black text-white text-lg font-medium p-3 rounded-lg w-full mt-10 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "إضافة شركة جديدة"}
          </button>
        </form>
      </div>
    </div>
  );
}
