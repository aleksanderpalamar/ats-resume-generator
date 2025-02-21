export const DefaultResumeData = {
  name: "",
  position: "",
  contactInformation: "",
  email: "",
  profilePicture: "",
  socialMedia: [
    {
      socialMedia: "Github",
      link: ""
    },
    {
      socialMedia: "LinkedIn",
      link: ""
    },
    {
      socialMedia: "Portfolio",
      link: ""
    }
  ],
  summary: "",
  education: [
    {
      "school": "",
      "degree": "",
      "startYear": "",
      "endYear": ""
    }
  ],
  workExperience: [
    {
      "company": "",
      "position": "",
      "description": "",
      "keyAchievements": "",
      "startYear": "",
      "endYear": ""
    },
  ],
  projects: [
    {
      "title": "",
      "link": "",
      "description": "",
      "keyAchievements": "",
      "startYear": "",
      "endYear": ""
    }
  ],
  skills: [
    {
      title: "",
      skills: [
        "",
      ],
    }
  ],
  languages: [
    "",
  ],
  certifications: [
    "",
    "",
  ],
}

export type ResumeDataType = typeof DefaultResumeData;