import { twMerge } from "tailwind-merge";

interface TextInputProps {
  label: string;
  placeholder?: string;
  className?: string;
}
const TextArea = ({ placeholder, className, label }: TextInputProps) => {
  return (
    <>
      <div className="flex flex-col w-full">
        <p className="pl-1">{label}</p>
        <textarea
          placeholder={placeholder}
          className={twMerge("textarea textarea-bordered ", className)}
        />
      </div>
    </>
  );
};

export { TextArea };
