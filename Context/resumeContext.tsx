import { ResumeDataType } from "@/utils/DefaultResumeData";
import { ChangeEvent, createContext, Dispatch, SetStateAction } from "react";

interface ResumeContextType {
  resumeData: ResumeDataType;
  setResumeData: Dispatch<SetStateAction<ResumeDataType>>;
  handleProfileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ResumeContext = createContext<ResumeContextType>({
  resumeData: {} as ResumeDataType,
  setResumeData: () => {},
  handleProfileChange: () => {},
  handleChange: () => {},
});

export default ResumeContext;