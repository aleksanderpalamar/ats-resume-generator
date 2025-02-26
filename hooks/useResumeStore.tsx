import { create } from "zustand";
import { DefaultResumeData, type ResumeDataType } from "@/utils/DefaultResumeData";

interface ResumeStore {
  resumeData: ResumeDataType;
  setResumeData: (data: ResumeDataType) => void;
  handleProfileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: DefaultResumeData,
  setResumeData: (data) => set({ resumeData: data }),
  handleProfileChange: (event) => {
    const { name, value } = event.target;
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        [name]: value,
      },
    }));
  },

  handleChange: (event) => {
    const { name, value } = event.target;
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        [name]: value,
      },
    }));
  }
}));

export default useResumeStore