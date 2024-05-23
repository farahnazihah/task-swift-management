import { EnumToastType } from "@/types/global";
import { useState } from "react";

interface ToastProps {
  message: string;
  type: EnumToastType;
}

export const useToast = () => {
  const [toasts, setToast] = useState<ToastProps[]>([]);

  const showToast = (
    message: string,
    type: EnumToastType = EnumToastType.INFO,
    timeout: number = 3000
  ) => {
    setToast((prevToasts) => [...prevToasts, { message, type }]);

    setTimeout(() => {
      setToast((prevToasts) => prevToasts.filter((t) => t.message !== message));
    }, timeout);
  };

  return { toasts, showToast };
};
