import { useToast } from "@/providers/ToastProvider";
import { IoInformationCircleOutline } from "react-icons/io5";

export const Toast = ({}) => {
  const { toast } = useToast();
  return (
    <div className="toast toast-top toast-center">
      {toast.map((t) => (
        <div className={`alert alert-${t.type} text-white`} key={t.message}>
          <IoInformationCircleOutline />
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
};
