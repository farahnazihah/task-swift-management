interface UploadedFileProps {
  name: string;
  onSelect: () => void;
}

export const UploadedFile = ({ name, onSelect }: UploadedFileProps) => {
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <text className="text-sm">{name}</text>
      <button className="btn btn-primary btn-sm" onClick={onSelect}>
        Select
      </button>
    </div>
  );
};
