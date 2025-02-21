"use client"

import ResumeContext from "@/Context/resumeContext";
import { ResumeDataType } from "@/utils/DefaultResumeData";
import { ChangeEvent, MouseEvent, useContext } from "react";
import { FaCloudDownloadAlt, FaCloudUploadAlt } from "react-icons/fa"

export const LoadUnLoad = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleLoad = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        setResumeData({
          ...resumeData,
          profilePicture: event.target?.result as string
        })
      };
      reader.readAsDataURL(file);
    }
  }

  const handleDownload = (
    data: ResumeDataType,
    filename: string,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div className="flex flex-wrap gap-4 mb-2 justify-center">
      <div className="inline-flex flex-row items-center gap-2">
        <h2 className="text-[1.2rem] text-zinc-900">Load Data:</h2>
        <label className="p-2 text-white bg-violet-500 hover:bg-violet-600 transition-colors duration-200 rounded cursor-pointer">
          <FaCloudUploadAlt className="text-[1.2rem] text-zinc-50" />
          <input
            type="file"
            className="hidden"
            aria-label="Load Data"
            onChange={handleLoad}
            accept=".json"
          />
        </label>
      </div>
      <div className="inline-flex flex-row items-center gap-2">
        <h2 className="text-[1.2rem] text-zinc-900">Save Data</h2>
        <button
          aria-label="Save Data"
          className="p-2 text-white bg-violet-500 hover:bg-violet-600 transition-colors duration-200 rounded cursor-pointer"
          onClick={(event) => handleDownload(resumeData, 'resume.json', event)
          }
        >
          <FaCloudDownloadAlt className="text-[1.2rem] text-zinc-50" />
        </button>
      </div>
    </div>
  )
}