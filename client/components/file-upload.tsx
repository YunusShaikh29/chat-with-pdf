"use client";
import axios from "axios";
import { Upload } from "lucide-react";
import React from "react";

export const FileUploadComponent: React.FC = () => {
  const handleFileUploadClick = () => {
    try {
      const el = document.createElement("input");
      el.setAttribute("type", "file");
      el.setAttribute("accept", "application/pdf");
      el.addEventListener("change", async (event) => {
        if(el.files && el.files.length > 0 ){
            const file = el.files[0]
            console.log(file)
            if(file){
                const formData = new FormData()
                formData.append("pdf", file)
                await axios.post("http://localhost:8080/upload/pdf", formData)
            }
        }
      })
      el.click();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      onClick={handleFileUploadClick}
      className="bg-slate-600 text-white shadow-2xl border-white border-2 rounded-xl p-4 flex justify-center items-center w-[80%] cursor-pointer"
    >
      <div className="flex justify-center items-center flex-col">
        <Upload />
        <p>Upload your pdf</p>
      </div>
    </div>
  );
};
