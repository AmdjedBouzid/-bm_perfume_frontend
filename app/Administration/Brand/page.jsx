"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import Image from "next/image";
import AddBrandForm from "../../_components/Forms/AddFormBrand";
import DeleteConfirmationModal from "../../_components/Forms/DeleteConfirmationModal";
import { DOMAIN } from "../../utils/constants";

export default function CompanyTable() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    axios
      .get(`${DOMAIN}/api/Brand`)
      .then((res) => setCompanies(res.data.brands))
      .catch((err) => console.error("خطأ في جلب البيانات:", err));
  }, []);

  const addCompany = async (formData) => {
    try {
      const jsonData = {
        name: formData.name,
        description: formData.description,
        img: formData.img || "",
      };

      const res = await axios.post(`${DOMAIN}/api/Brand`, jsonData, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data && res.data.brand) {
        setCompanies((prevCompanies) => [...prevCompanies, res.data.brand]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("❌ خطأ في الإضافة:", error);
    }
  };

  const deleteCompany = async () => {
    if (!selectedCompanyId) return;

    try {
      await axios.delete(`${DOMAIN}/api/Brand/${selectedCompanyId}`, {
        headers: { "Content-Type": "application/json" },
      });

      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company._id !== selectedCompanyId)
      );
      setIsDeleteModalOpen(false);
      setSelectedCompanyId(null);
    } catch (error) {
      console.error("خطأ في الحذف:", error);
    }
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCompanies = filteredCompanies.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="p-4 md:p-8 lg:p-12 bg-white pb-20">
      <div className="flex items-center gap-3 w-full mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded whitespace-nowrap"
        >
          إضافة شركة جديدة
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
              <th className="border border-gray-300 p-4">اسم الشركة</th>
              <th className="border border-gray-300 p-4">وصف الشركة</th>
              <th className="border border-gray-300 p-4">عدد المنتجات</th>
              <th className="border border-gray-300 p-4">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCompanies.length > 0 ? (
              paginatedCompanies.map((company) => (
                <tr key={company._id} className="text-center">
                  <td className="border border-gray-300 p-4">{company.name}</td>
                  <td className="border border-gray-300 p-4">
                    {company.description}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {company.Perfume?.length || 0}
                  </td>
                  <td className="border-t border-gray- p-4 flex justify-center gap-2 ">
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
                        setSelectedCompanyId(company._id);
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
                <td colSpan="4" className="text-center p-4">
                  لا توجد شركات
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center md:justify-start items-center gap-4 mt-4 md:mb-40">
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev < Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE)
                ? prev + 1
                : prev
            )
          }
          disabled={
            currentPage === Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE)
          }
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
          <AddBrandForm
            onClose={() => setIsModalOpen(false)}
            onAddCompany={addCompany}
          />
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center w-full bg-black bg-opacity-50">
          <DeleteConfirmationModal
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={deleteCompany}
            title={"هل تريد حذف هذه الشركة ؟"}
          />
        </div>
      )}
    </div>
  );
}
