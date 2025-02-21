import ResumeContext from "@/Context/resumeContext";
import { useContext } from "react";
import { FormButton } from "./FormButton";

type SocialMediaKey = "socialMedia" | "link";

export const SocialMedia = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleSocialMedia = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const key = e.target.name as SocialMediaKey;
    const newSocialMedia = [...resumeData.socialMedia];
    
    if (key in newSocialMedia[index]) { // Verificação adicional
      newSocialMedia[index][key] = e.target.value.replace("https://", "");
      setResumeData({ ...resumeData, socialMedia: newSocialMedia });
    } else {
      console.warn(`Chave inválida: ${key}`);
    }
  };

  const addSocialMedia = () => {
    setResumeData({
      ...resumeData,
      socialMedia: [...resumeData.socialMedia, { socialMedia: "", link: "" }]
    })
  }

  const removeSocialMedia = (index: number) => {
    const newSocialMedia = [...resumeData.socialMedia];
    newSocialMedia[index] = newSocialMedia[newSocialMedia.length - 1];
    newSocialMedia.pop();
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold text-zinc-900">Redes Sociais</h2>
      {resumeData.socialMedia.map((socialMedia, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            placeholder="Rede Social"
            name="socialMedia"
            className="text-zinc-500 w-fit h-8 rounded p-1"
            onChange={(e) => handleSocialMedia(e, index)}
            value={socialMedia.socialMedia}
          />
          <input
            type="text"
            placeholder="Link"
            name="link"
            className="text-zinc-500 w-4/12 h-8 rounded p-1"
            onChange={(e) => handleSocialMedia(e, index)}
            value={socialMedia.link}
          />          
        </div>
      ))}
      <FormButton 
        size={resumeData.socialMedia.length}
        remove={removeSocialMedia}
        add={addSocialMedia}
      />
    </div>
  )
}