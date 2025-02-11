"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import Image from "next/image";
import AddBrandForm from "../../../Forms/AddFormBrand";
import { DOMAIN } from "../../utils/constants";

export default function CompanyTable() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios
      .get(`${DOMAIN}/api/Brand`)
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) {
          setCompanies(data);
        } else if (data && typeof data === "object") {
          setCompanies([data]);
        } else {
          setCompanies([]);
        }
      })
      .catch((err) => console.error("خطأ في جلب البيانات:", err));
  }, []);

  const addCompany = async (formData) => {
    try {
      console.log("📤 إرسال البيانات:", formData);

      const jsonData = {
        name: formData.name,
        description: formData.description,
        img: formData.img,
      };

      const res = await axios.post(`${DOMAIN}/api/Brand`, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setCompanies([...companies, res.data]);

      setIsModalOpen(false);
    } catch (error) {
      console.error("❌ خطأ في الإضافة:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="p-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-4 py-2 rounded"
          >
            إضافة شركة جديدة
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="البحث"
            className="pl-10 pr-4 py-2 border rounded-lg w-60"
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
              <th className="border border-gray-300 p-4">اسم الشركة</th>
              <th className="border border-gray-300 p-4">وصف الشركة</th>
              <th className="border border-gray-300 p-4">الصورة</th>
              <th className="border border-gray-300 p-4">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
          {companies.length > 0 ? (
  companies
    
    .map((company, index) => (
      <tr key={index} className="text-center">
        <td className="border border-gray-300 p-4">{company.name}</td>
        <td className="border border-gray-300 p-4">{company.description }</td>
        <td className="border border-gray-300 p-4">
          {company.img ? (
            <Image src={company.img} width={50} height={50} alt="Brand Image" />
          ) : (
            "—"
          )}
        </td>
        <td className="border border-gray-300 p-4 flex justify-center gap-2">
          <button>
            <Image src="/icons/pencil-edit.svg" width={24} height={24} alt="Edit" />
          </button>
          <button>
            <Image src="/icons/delete-02.svg" width={24} height={24} alt="Delete" />
          </button>
        </td>
      </tr>
    ))
) : (
  <tr>
    <td colSpan={4} className="text-center p-4">لا توجد بيانات متاحة</td>
  </tr>
)}

          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div onClick={(e) => e.stopPropagation()}>
            <AddBrandForm
              onClose={() => setIsModalOpen(false)}
              onAddCompany={addCompany}
            />
          </div>
        </div>
      )}
    </div>
  );
}
