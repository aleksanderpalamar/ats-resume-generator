"use client"

import { Certifications } from "@/components/form/certifications";
import { Education } from "@/components/form/Education";
import { FormCP } from "@/components/form/FormCP";
import { Language } from "@/components/form/Language";
import { PersonalInformation } from "@/components/form/PersonalInformation";
import { Projects } from "@/components/form/Projects";
import { Skill } from "@/components/form/Skill";
import { SocialMedia } from "@/components/form/SocialMedia";
import { Summary } from "@/components/form/Summary";
import { WorkExperience } from "@/components/form/WorkExperience";
import Preview from "@/components/preview/Preview";
import { WinPrint } from "@/components/WinPrint";
import ResumeContext from "@/Context/resumeContext";
import { ResumeProvider } from "@/Providers/resumeProvider";
import { DefaultResumeData } from "@/utils/DefaultResumeData";
import { useState } from "react";

export default function Builder() {
  const [resumeData, setResumeData] = useState(DefaultResumeData);
  const [formClose, setFormClose] = useState(false);

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        setResumeData({
          ...resumeData,
          profilePicture: event.target?.result as string
        })
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.preventDefault();
    setResumeData({
      ...resumeData,
      [event.target.name]: event.target.value
    })
  }

  return (
    <ResumeProvider>
      <ResumeContext.Provider
        value={{
          resumeData,
          setResumeData,
          handleProfileChange,
          handleChange
        }}
      >
        <div className="flex flex-col gap-4 md:flex-row justify-evenly max-w-full md:mx-auto md:h-screen">
          {!formClose && (
            <form className="p-4 bg-violet-100 exclude-print w-full h-full md:overflow-y-scroll">
              <PersonalInformation />
              <SocialMedia />
              <Summary />
              <Education />
              <WorkExperience />
              <Projects />
              {
                resumeData.skills.map((skill, index) => (
                  <Skill key={index} title={skill.title} />
                ))
              }
              <Language />
              <Certifications />
            </form>
          )}
          <Preview />
        </div>
        <FormCP formClose={formClose} setFormClose={setFormClose} />
        <WinPrint />
      </ResumeContext.Provider>
    </ResumeProvider>
  )
}