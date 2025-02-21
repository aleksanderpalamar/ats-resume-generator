import { Minus, Plus } from "lucide-react";

interface FormButtonProps {
  size: number;
  remove: (index: number) => void;
  add: () => void;
  title?: string
}

export const FormButton = ({size, remove, add }: FormButtonProps) => {
  return (
    <div className="flex items-center flex-wrap gap-2 mb-2">
      <button
        aria-label="Add social media"
        type="button"
        onClick={add}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-500 hover:bg-violet-600 transition-colors duration-200"
      >
        <Plus className="text-[1.2rem] text-zinc-50" />
      </button>
      {
        size > 0 && 
        <button
          aria-label="Remove social media"
          type="button"
          onClick={() => remove(size - 1)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-500 hover:bg-violet-600 transition-colors duration-200"
        >
          <Minus className="text-[1.2rem] text-zinc-50" />
        </button>
      }
    </div>
  )
}