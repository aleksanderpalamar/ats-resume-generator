import ResumeContext from "@/Context/resumeContext";
import { ChangeEvent, useContext } from "react";
import { FormButton } from "./FormButton";

export const Skill = ({ title }: { title: string }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleSkill = (event: ChangeEvent<HTMLInputElement>, index: number, title: string) => {
    event.preventDefault();
    const newSkills = [
      ...resumeData.skills.find((skillType) => skillType.title === title)!.skills
    ];
    newSkills[index] = event.target.value;
    setResumeData((prevData) => ({
      ...prevData,
      skills: prevData.skills.map((skill) => (
        skill.title === title ? { ...skill, skills: newSkills } : skill
      ))
    }))
  }

  const addSkill = () => {
    setResumeData((prevData) => {
      const skillType = prevData.skills.find(
        (skillType) => skillType.title === title
      );
      const newSkills = [...skillType!.skills, ""];
      const updateSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      );
      return { ...prevData, skills: updateSkills };
    });
  };

  const removeSkill = (index: number) => {
    setResumeData((prevData) => {
      const skillType = prevData.skills.find(
        (skillType) => skillType.title === title
      );
      const newSkills = [...skillType!.skills];
      newSkills[index] = newSkills[newSkills.length - 1];
      newSkills.pop();
      const updateSkills = prevData.skills.map((skill) => (
        skill.title === title ? { ...skill, skills: newSkills } : skill
      ))
      return { ...prevData, skills: updateSkills }
    })
  }

  const skillType = resumeData.skills.find(
    (skillType) => skillType.title === title
  )

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold text-zinc-900">{title}</h2>
      {skillType?.skills.map((skill, index) => (
        <div key={index} className="flex flex-col gap-2 flex-wrap">
          <input
            type="text"
            placeholder={title}
            name={title}
            className="text-zinc-500 w-fit flex items-center justify-center h-8 rounded p-1"
            onChange={(event) => handleSkill(event, index, title)}
            value={skill}
          />
        </div>
      ))}
      <FormButton 
        size={skillType?.skills.length || 0}
        remove={removeSkill}
        add={addSkill}
        title={title}
      />
    </div>
  )
}