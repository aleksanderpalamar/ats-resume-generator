import ResumeContext from "@/Context/resumeContext";
import { ResumeDataType } from "@/utils/DefaultResumeData";
import { ChangeEvent, useContext } from "react";
import { FormButton } from "./FormButton";

type WorkExperienceKey = keyof ResumeDataType["workExperience"][0];

export const WorkExperience = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleWorkExperience = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    event.preventDefault();
    const key = event.target.name as WorkExperienceKey;
    const newWorkExperience = [...resumeData.workExperience];

    if (key in newWorkExperience[index]) {
      newWorkExperience[index][key] = event.target.value;
      setResumeData({ ...resumeData, workExperience: newWorkExperience });
    } else {
      console.warn(`Chave inválida: ${key}`);
    }
  }

  const addWorkExperience = () => {
    setResumeData({
      ...resumeData,
      workExperience: [
        ...resumeData.workExperience,
        {
          company: "",
          position: "",
          description: "",
          keyAchievements: "",
          startYear: "",
          endYear: ""
        }
      ],
    })
  }

  const removeWorkExperience = (index: number) => {
    const newWorkExperience = [...resumeData.workExperience];
    newWorkExperience[index] = newWorkExperience[newWorkExperience.length - 1];
    newWorkExperience.pop();
    setResumeData({ ...resumeData, workExperience: newWorkExperience });
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold text-zinc-900">Experiência Profissional</h2>
      {resumeData.workExperience.map((WorkExperience, index) => (
        <div key={index} className="flex flex-col space-y-2">
          <input
            type="text"
            placeholder="Nome da Empresa"
            name="company"
            className="text-zinc-500 w-full h-8 rounded p-1"
            onChange={(e) => handleWorkExperience(e, index)}
            value={WorkExperience.company}
          />
          <input
            type="text"
            placeholder="Job Title"
            name="position"
            className="text-zinc-500 w-full h-8 rounded p-1"
            onChange={(e) => handleWorkExperience(e, index)}
            value={WorkExperience.position}
          />
          <textarea
            placeholder="Description"
            name="description"
            className="w-full text-zinc-500 resize-none h-48 overflow-y-scroll rounded p-1"
            onChange={(e) => handleWorkExperience(e, index)}
            value={WorkExperience.description}
          />
          <textarea
            placeholder="Key Achievements"
            name="keyAchievements"
            className="w-full text-zinc-500 resize-none h-48 overflow-y-scroll rounded p-1"
            onChange={(e) => handleWorkExperience(e, index)}
            value={WorkExperience.keyAchievements}
          />
          <div className="flex flex-row gap-2 flex-wrap">
            <label htmlFor="startYear" className="flex flex-col">
              <span className="text-zinc-500 text-sm">Data de Início</span>
              <input
                type="text"
                placeholder="Data de Início"
                name="startYear"
                className="text-zinc-500 w-fit h-8 rounded p-1"
                onChange={(e) => handleWorkExperience(e, index)}
                value={WorkExperience.startYear}
              />
            </label>
            <label htmlFor="endYear" className="flex flex-col">
              <span className="text-zinc-500 text-sm">Data de Fim</span>
              <input
                type="text"
                placeholder="Data de Fim"
                name="endYear"
                className="text-zinc-500 w-fit h-8 rounded p-1"
                onChange={(e) => handleWorkExperience(e, index)}
                value={WorkExperience.endYear}
              />
            </label>
          </div>
        </div>
      ))}
      <FormButton
        size={resumeData.workExperience.length}
        add={addWorkExperience}
        remove={removeWorkExperience}
      />
    </div>
  )
}