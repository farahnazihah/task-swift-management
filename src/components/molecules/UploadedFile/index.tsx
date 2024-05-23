interface UploadedFileProps {
  name: string;
  onSelect: () => void;
}

export const UploadedFile = ({ name, onSelect }: UploadedFileProps) => {
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <p className="text-sm">{name}</p>
      <button className="btn btn-primary btn-sm" onClick={onSelect}>
        Select
      </button>
    </div>
  );
};
