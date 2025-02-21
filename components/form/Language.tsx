import ResumeContext from "@/Context/resumeContext";
import { ChangeEvent, useContext } from "react";
import { FormButton } from "./FormButton";

export const Language = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleSkills = (event: ChangeEvent<HTMLInputElement>, index: number, skillType: string) => {
    event.preventDefault();
    const newSkills = [...resumeData.languages];
    newSkills[index] = event.target.value;
    setResumeData((prevData) => ({
      ...prevData,
      [skillType]: newSkills
    }))
  }

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      languages: [...resumeData.languages, ""]
    })
  }

  const removeSkill = (index: number) => {
    const newSkills = [...resumeData.languages];
    newSkills[index] = newSkills[newSkills.length - 1];
    newSkills.pop();
    setResumeData({
      ...resumeData,
      languages: newSkills
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold text-zinc-900">Idiomas</h2>
      {resumeData.languages.map((skill, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            name="languages"
            placeholder="Idioma"
            className="w-fit text-zinc-500 rounded p-1"
            onChange={(e) => handleSkills(e, index, "languages")}
            value={skill}
          />
        </div>
      ))}
      <FormButton size={resumeData.languages.length} remove={removeSkill} add={addSkill} />
    </div>
  )
}