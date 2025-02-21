import ResumeContext from "@/Context/resumeContext";
import { useContext } from "react";

export const Summary = () => {
  const { resumeData, handleChange } = useContext(ResumeContext);
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold text-zinc-900">Resumo</h2>
      <div className="grid grid-cols-4 gap-2">
        <textarea 
          placeholder="Resumo"
          name="summary"
          className="w-full col-span-4 text-zinc-500 resize-none h-48 overflow-y-scroll rounded p-1"
          onChange={handleChange}
          value={resumeData.summary}
          maxLength={500}
        />
      </div>
    </div>
  )
}