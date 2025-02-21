/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useContext, useState } from "react"
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import { CgWebsite } from "react-icons/cg"
import Image from "next/image"
import Link from "next/link"
import ResumeContext from "@/Context/resumeContext"
import { ContactInfo } from "./ContactInfo"
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md"

const DragAndDropResume: React.FC = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext)
  const [dragging, setDragging] = useState<string | null>(null)

  const icons = [
    { name: "github", icon: <FaGithub /> },
    { name: "linkedin", icon: <FaLinkedin /> },
    { name: "twitter", icon: <FaTwitter /> },
    { name: "facebook", icon: <FaFacebook /> },
    { name: "instagram", icon: <FaInstagram /> },
    { name: "youtube", icon: <FaYoutube /> },
    { name: "portfolio", icon: <CgWebsite /> },
  ]

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setDragging(id)
    e.dataTransfer.setData("text/plain", id)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault()
    const sourceId = e.dataTransfer.getData("text")

    if (sourceId === targetId) return

    const updateArray = (array: any[]) => {
      const sourceIndex = array.findIndex((item) => item.id === sourceId)
      const targetIndex = array.findIndex((item) => item.id === targetId)
      const newArray = [...array]
      const [removed] = newArray.splice(sourceIndex, 1)
      newArray.splice(targetIndex, 0, removed)
      return newArray
    }

    if (sourceId.includes("WORK_EXPERIENCE") && targetId.includes("WORK_EXPERIENCE")) {
      setResumeData({
        ...resumeData,
        workExperience: updateArray(resumeData.workExperience),
      })
    } else if (sourceId.includes("SKILLS") && targetId.includes("SKILLS")) {
      setResumeData({
        ...resumeData,
        skills: updateArray(resumeData.skills),
      })
    } else if (sourceId.includes("PROJECTS") && targetId.includes("PROJECTS")) {
      setResumeData({
        ...resumeData,
        projects: updateArray(resumeData.projects),
      })
    }

    setDragging(null)
  }

  return (
    <div id="preview" className="print md:max-w-[60%] bg-zinc-50 sticky top-0 preview rm-padding-print p-6 md:overflow-y-scroll md:h-screen">
      <div className="w-8.5in">
        <div className="flex flex-col items-start space-y-1">
          {resumeData.profilePicture.length > 0 && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-violet-500">
              <Image
                src={resumeData.profilePicture || "/placeholder.svg"}
                alt="profile"
                width={100}
                height={100}
                className="object-cover h-full w-full"
              />
            </div>
          )}
          <h1 className="text-zinc-800 text-2xl font-bold">{resumeData.name}</h1>
          <p className="text-zinc-800 text-lg">{resumeData.position}</p>
          <ContactInfo
            mainclass="flex flex-col gap-2 text-zinc-800 text-sm"
            linkclass="inline-flex items-center gap-1"
            teldata={resumeData.contactInformation}
            emaildata={resumeData.email}
            telicon={<MdPhone />}
            emailicon={<MdEmail />}
            addressicon={<MdLocationOn />}
          />
          <div className="flex flex-col flex-wrap gap-2">
            {resumeData.socialMedia.map((socialMedia, index) => (
              <Link
                href={`http://${socialMedia.link}`}
                aria-label={socialMedia.socialMedia}
                key={index}
                title={socialMedia.socialMedia}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 text-zinc-800"
                style={socialMedia.link.length > 32 ? { wordWrap: "break-word", display: "inline-flex align-items-center" } : {}}
              >
                {icons.map((icon, index) => {
                  if (icon.name === socialMedia.socialMedia.toLowerCase()) {
                    return <span key={index}>{icon.icon}</span>
                  }
                })}
                <span className="text-sm">{socialMedia.link}</span>
              </Link>
            ))}
          </div>
        </div>
        <hr className="border-dashed border-zinc-300 my-2" />
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1 space-y-2">
            {resumeData.summary.length > 0 && (
              <div className="mb-1">
                <h2 className="section-title mb-1 border-b-2 border-zinc-300 text-zinc-800 font-medium">Summary</h2>
                <p className="content break-words text-zinc-800">{resumeData.summary}</p>
              </div>
            )}
            <div>
              {resumeData.education.length > 0 && (
                <div className="mb-1">
                  <h2 className="section-title mb-1 border-b-2 border-zinc-300 text-zinc-800 font-medium">Education</h2>
                  {resumeData.education.map((item, index) => (
                    <div key={index} className="mb-1">
                      <p className="content text-zinc-800 font-semibold">{item.school}</p>
                      <p className="content text-zinc-500">{item.degree}</p>
                      {/* <DateRange startYear={item.startYear} endYear={item.endYear} id={`education-start-end-date`} /> */}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              {resumeData.skills.map((skill, index) => (
                <div
                  key={`SKILLS-${index}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, `SKILLS-${index}`)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, `SKILLS-${index}`)}
                  className={`mb-1 ${dragging === `SKILLS-${index}` ? "opacity-50" : ""}`}
                >
                  <p className="content text-zinc-800 font-medium">
                    {skill.title}
                  </p>
                  <div className="content text-zinc-800 flex flex-wrap gap-1">
                    {resumeData.skills[index].skills.map((item, subIndex) => (
                      <span
                        key={`${skill.title}-${subIndex}`}
                        className="inline-block mr-1 bg-violet-100 text-violet-500 text-sm px-2 py-1 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-2 space-y-2 mt-2">
              {resumeData.languages.length > 0 && (
                <div>
                  <h2 className="section-title mb-1 border-b-2 border-zinc-300 text-zinc-800 font-medium">Languages</h2>
                  {resumeData.languages.map((item, index) => (
                    <div key={index} className="mb-1">
                      <p className="content i-bold text-zinc-800">{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col-span-2 space-y-2 mt-2">
              {resumeData.certifications.length > 0 && (
                <div>
                  <h2 className="section-title mb-1 border-b-2 border-zinc-300 text-zinc-800 font-medium">Certifications</h2>
                  {resumeData.certifications.map((item, index) => (
                    <div key={index} className="mb-1">
                      <p className="content i-bold text-zinc-800">{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="col-span-2 space-y-2">
            {resumeData.workExperience.length > 0 && (
              <div>
                <h2 className="section-title mb-1 border-b-2 border-zinc-300 editable text-zinc-800 font-medium">Work Experience</h2>
                {resumeData.workExperience.map((item, index) => (
                  <div
                    key={`WORK_EXPERIENCE-${index}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, `WORK_EXPERIENCE-${index}`)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, `WORK_EXPERIENCE-${index}`)}
                    className={`mb-1 border-dashed border-zinc-200 rounded ${dragging === `WORK_EXPERIENCE-${index}` ? "opacity-50 border-[1px]" : " border-[1px] p-1"}`}
                  >
                    <p className="content text-zinc-800 font-semibold">{item.company}</p>
                    <p className="content text-zinc-800 font-medium">{item.position}</p>
                    {/* 
                    <DateRange
                      startYear={item.startYear}
                      endYear={item.endYear}
                      id={`work-experience-start-end-date`}
                    />
                    */}
                    <p className="content hyphens-auto text-zinc-500">{item.description}</p>
                    <div className="flex items-center space-x-2 flex-wrap">
                      <label htmlFor={`work-experience-start-end-date-${index}`}>
                        <span className="mr-1 text-zinc-500 text-sm">
                          {item.startYear === item.endYear ? item.startYear : `${item.startYear} - ${item.endYear}`}
                        </span>
                      </label>
                    </div>
                    <div className="content text-zinc-800">
                      {typeof item.keyAchievements === "string" &&
                        item.keyAchievements
                          .split("\n")
                          .map((achievement, subIndex) => (
                            <div key={`${item.company}-${index}-${subIndex}`}>{achievement}</div>
                          ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {resumeData.projects.length > 0 && (
              <div>
                <h2 className="section-title mb-1 border-b-2 border-gray-300 editable text-zinc-800 font-medium">Projects</h2>
                {resumeData.projects.map((item, index) => (
                  <div
                    key={`PROJECTS-${index}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, `PROJECTS-${index}`)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, `PROJECTS-${index}`)}
                    className={`mb-1 ${dragging === `PROJECTS-${index}` ? "opacity-50" : ""}`}
                  >
                    <p className="content text-zinc-800">{item.title}</p>
                    {/* <DateRange startYear={item.startYear} endYear={item.endYear} id={`project-start-end-date`} /> */}
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="content text-zinc-800"
                    >
                      {item.link}
                    </Link>
                    <p className="content hyphens-auto text-zinc-800">{item.description}</p>
                    <div className="list-disc ul-padding content text-zinc-800">
                      {typeof item.keyAchievements === "string" &&
                        item.keyAchievements
                          .split("\n")
                          .map((achievement, subIndex) => (
                            <span key={`${item.title}-${index}-${subIndex}`}>{achievement}</span>
                          ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DragAndDropResume