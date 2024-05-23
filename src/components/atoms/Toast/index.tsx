import { useToast } from "@/providers/ToastProvider";

export const Toast = ({}) => {
  const { toast } = useToast();
  return (
    <div className="toast toast-top toast-center">
      {toast.map((t) => (
        <div className={`alert alert-${t.type}`} key={t.message}>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
};
