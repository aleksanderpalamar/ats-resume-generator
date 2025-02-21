import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs"

type FormCPProps = {
  formClose: boolean,
  setFormClose: React.Dispatch<React.SetStateAction<boolean>>
}

export const FormCP = ({ formClose, setFormClose }: FormCPProps) => {
  return (
    <button
      aria-label="Form Open/Close"
      onClick={() => setFormClose(!formClose)}
      className="exclude-print fixed bottom-5 md:bottom-10 md:left-10 left-10 font-bold rounded-full bg-white text-violet-500"
    >
      {formClose ? <BsFillArrowRightCircleFill className="w-10 h-10 ml-2" title="Open Form" /> : <BsFillArrowLeftCircleFill className="w-10 h-10" title="Close Form" />}
    </button>
  )
}