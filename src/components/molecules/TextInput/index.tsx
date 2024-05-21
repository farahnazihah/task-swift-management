import { twMerge } from 'tailwind-merge';

interface TextInputProps {
  label: string;
  placeholder?: string;
  className?: string;
}
const TextInput = ({ placeholder, className, label }: TextInputProps) => {
  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <text className="pl-1">{label}</text>
        <input
          type="text"
          placeholder={placeholder}
          className={twMerge('input input-bordered', className)}
        />
      </div>
    </>
  );
};

export { TextInput };
