import ResumeContext from "@/Context/resumeContext";
import { ChangeEvent, useContext } from "react";
import { FormButton } from "./FormButton";

export const Certifications = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleSkills = (event: ChangeEvent<HTMLInputElement>, index: number, skillType: string) => {
    event.preventDefault();
    const newSkills = [...resumeData.certifications];
    newSkills[index] = event.target.value;
    setResumeData((prevData) => ({
      ...prevData,
      [skillType]: newSkills
    }))
  }

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      certifications: [...resumeData.certifications, ""]
    })
  }

  const removeSkill = (index: number) => {
    const newSkills = [...resumeData.certifications];
    newSkills[index] = newSkills[newSkills.length - 1];
    newSkills.pop();
    setResumeData({
      ...resumeData,
      certifications: newSkills
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold text-zinc-900">Certificações</h2>
      {resumeData.certifications.map((skill, index) => (
        <div key={index} className="flex flex-col gap-2">
          <input 
            type="text"
            placeholder="Certificação"
            name="certifications"
            className="col-span-2 text-zinc-500 w-4/12 h-8 rounded p-1"
            onChange={(e) => handleSkills(e, index, "certifications")}
            value={skill}
          />
        </div>
      ))}
      <FormButton size={resumeData.certifications.length} remove={removeSkill} add={addSkill} />
    </div>
  )
}