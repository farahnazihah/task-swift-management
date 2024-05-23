import { useToast } from "@/hooks/useToast";

export const Toast = ({}) => {
  const { showToast, toasts } = useToast();

  console.log(toasts);

  return (
    <div className="toast toast-top toast-center">
      {toasts.map((toast) => (
        <div className={`alert alert-${toast.type}`} key={toast.message}>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
