import { ReactNode } from "react";

const A4PageWrapper = ({ children }: { children: ReactNode }) => {

  const alertA4Size = () => {
    const preview = document.querySelector(".preview");
    const previewHeight = preview?.clientHeight;

    if (previewHeight && previewHeight > 1122) {
      alert("A4 size exceeds");
    }
  }

  return (
    <div 
      className="w-[8.5in] h-[11in] mx-auto border-l-2 border-zinc-900"
      onLoad={alertA4Size}
    >
      {children}
    </div>
  )
}

export default A4PageWrapper;