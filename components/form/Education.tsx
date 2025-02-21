import ResumeContext from "@/Context/resumeContext";
import { ChangeEvent, useContext } from "react"
import { FormButton } from "./FormButton";

type EducationKey = "school" | "degree" | "startYear" | "endYear";

export const Education = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleEducation = (
    event: ChangeEvent<HTMLInputElement>,
    index: number) => {
    event.preventDefault();
    const key = event.target.name as EducationKey;
    const newEducation = [...resumeData.education];

    if (key in newEducation[index]) {
      newEducation[index][key] = event.target.value;
      setResumeData({ ...resumeData, education: newEducation });
    } else {
      console.warn(`Chave inválida: ${key}`);
    }
  }

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        { school: "", degree: "", startYear: "", endYear: "" }
      ],
    })
  }

  const removeEducation = (index: number) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = newEducation[newEducation.length - 1];
    newEducation.pop();
    setResumeData({ ...resumeData, education: newEducation });
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold text-zinc-900">Educação</h2>
      {resumeData.education.map((education, index) => (
        <div key={index} className="flex flex-col space-y-2">
          <input 
            type="text"
            placeholder="Institution"
            name="school"
            className="text-zinc-500 w-full h-8 rounded p-1"
            onChange={(event) => handleEducation(event, index)}
            value={education.school}
          />
          <input 
            type="text"
            placeholder="Degree"
            name="degree"
            className="text-zinc-500 w-full h-8 rounded p-1"
            onChange={(event) => handleEducation(event, index)}
            value={education.degree}
          />
          <input 
            type="text"
            placeholder="Start Year"
            name="startYear"
            className="text-zinc-500 w-full h-8 rounded p-1"
            onChange={(event) => handleEducation(event, index)}
            value={education.startYear}
          />
          <input 
            type="text"
            placeholder="End Year"
            name="endYear"
            className="text-zinc-500 w-full h-8 rounded p-1"
            onChange={(event) => handleEducation(event, index)}
            value={education.endYear}
          />
        </div>
      ))}
      <FormButton size={resumeData.education.length} add={addEducation} remove={removeEducation} />
    </div>
  )
}