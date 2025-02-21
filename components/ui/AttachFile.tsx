import ResumeContext from "@/Context/resumeContext";
import { useContext } from "react";

export const AttachFile = () => {
  const { handleProfileChange } = useContext(ResumeContext);

  return (
    <div className="flex items-center flex-wrap gap-2 mb-2">
      <label htmlFor="profileImage">
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          className="col-span-2 text-zinc-500 w-fit h-8 rounded"
          onChange={handleProfileChange}
          placeholder="Profile Picture"
        />
      </label>
    </div>
  )
}