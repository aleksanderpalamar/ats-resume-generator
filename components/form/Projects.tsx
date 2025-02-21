import ResumeContext from "@/Context/resumeContext";
import { ResumeDataType } from "@/utils/DefaultResumeData";
import { ChangeEvent, useContext } from "react";
import { FormButton } from "./FormButton";

type ProjectsKey = keyof ResumeDataType["projects"][0];

export const Projects = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleProjects = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    event.preventDefault();
    const key = event.target.name as ProjectsKey;
    const newProjects = [...resumeData.projects];

    if (key in newProjects[index]) {
      newProjects[index][key] = event.target.value;
      setResumeData({ ...resumeData, projects: newProjects });
    } else {
      console.warn(`Chave inválida: ${key}`);
    }
  }

  const addProjects = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          title: "",
          link: "",
          description: "",
          keyAchievements: "",
          startYear: "",
          endYear: "",
        }
      ],
    })
  }

  const removeProjects = (index: number) => {
    const newProjects = [...resumeData.projects];
    newProjects[index] = newProjects[newProjects.length - 1];
    newProjects.pop();
    setResumeData({ ...resumeData, projects: newProjects });
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold text-zinc-900">Projetos</h2>
      {resumeData.projects.map((project, index) => (
        <div key={index} className="flex flex-col space-y-2">
          <input
            type="text"
            placeholder="Nome do Projeto"
            name="name"
            className="text-zinc-500 w-full h-8 rounded p-1"
            onChange={(e) => handleProjects(e, index)}
            value={project.title}
          />
          <input
            type="text"
            placeholder="Link do Projeto"
            name="link"
            className="text-zinc-500 w-full h-8 rounded p-1"
            onChange={(e) => handleProjects(e, index)}
            value={project.link}
          />
          <textarea
            placeholder="Descrição do Projeto"
            name="description"
            className="w-full text-zinc-500 resize-none h-48 overflow-y-scroll rounded p-1"
            onChange={(e) => handleProjects(e, index)}
            value={project.description}
          />
          <div className="flex flex-row gap-2 flex-wrap">
            <label htmlFor="startYear" className="flex flex-col">
              <span className="text-zinc-500 text-sm">Data de Inicio</span>
              <input
                type="date"
                placeholder="Data de Inicio"
                name="startYear"
                className="text-zinc-500 w-fit h-8 rounded p-1"
                onChange={(e) => handleProjects(e, index)}
                value={project.startYear}
              />
            </label>
            <label htmlFor="endYear" className="flex flex-col">
              <span className="text-zinc-500 text-sm">Data de Fim</span>
              <input
                type="date"
                placeholder="Data de Fim"
                name="endYear"
                className="text-zinc-500 w-fit h-8 rounded p-1"
                onChange={(e) => handleProjects(e, index)}
                value={project.endYear}
              />
            </label>
          </div>
        </div>
      ))}
      <FormButton size={resumeData.projects.length} add={addProjects} remove={removeProjects} />
    </div>
  )
}