import React from "react";
import Image from "next/image";

export default function DeleteConfirmationModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <div className=" p-6 rounded-lg bg-white shadow-lg  text-center">
      
        <div className="flex justify-center mb-8">
          <Image src="/icons/deletePopup.svg" width={60} height={60} alt="Delete" />
        </div>
        <h2 className="text-xl font-bold text-primary mb-8">هل تريد حذف هذه الشركة ؟</h2>
        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className=" text-white bg-black px-6  py-2 w-full rounded-lg font-semibold"
          >
            لا
          </button>
          <button
            onClick={onConfirm}
            className=" text-white bg-black px-6 py-2 w-full rounded-lg font-semibold"
          >
            نعم
          </button>
        </div>
      </div>
    </div>
  );
}
