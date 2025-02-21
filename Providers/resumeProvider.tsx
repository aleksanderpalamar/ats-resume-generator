"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import ResumeContext from "../Context/resumeContext"
import { DefaultResumeData, type ResumeDataType } from "@/utils/DefaultResumeData"

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resumeData, setResumeData] = useState<ResumeDataType>(DefaultResumeData)

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setResumeData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setResumeData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, handleProfileChange, handleChange }}>
      {children}
    </ResumeContext.Provider>
  )
}