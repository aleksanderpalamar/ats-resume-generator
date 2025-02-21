import ResumeContext from "@/Context/resumeContext";
import { useContext } from "react"
import { AttachFile } from "../ui/AttachFile";

export const PersonalInformation = () => {
  const { resumeData, handleChange } = useContext(ResumeContext);
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold text-zinc-900">Informação Pessoal</h2>
      <div className="grid grid-cols-4 gap-2">
        <input 
          type="text"
          placeholder="Nome Completo"
          name="name"
          className="col-span-2 text-zinc-500 w-full h-8 rounded p-1"
          onChange={handleChange}
          value={resumeData.name}
        />
        <input 
          type="text"
          placeholder="Titulo: Ex: Desenvolvedor de Software" 
          name="position"
          className="text-zinc-500 col-span-2 w-full h-8 rounded p-1"
          onChange={handleChange}
          value={resumeData.position} 
        />
        <input 
          type="text"
          placeholder="Telefone"
          name="contactInformation"
          className="col-span-2 text-zinc-500 w-full h-8 rounded p-1"
          onChange={handleChange}
          value={resumeData.contactInformation}
        />
        <input 
          type="text"
          placeholder="email" 
          name="email"
          className="col-span-2 text-zinc-500 w-full h-8 rounded p-1"
          onChange={handleChange}
          value={resumeData.email} 
        />
        <AttachFile />
      </div>
    </div>
  )
}