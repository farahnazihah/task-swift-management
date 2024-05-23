import { EnumToastType } from "@/types/global";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ToastProps {
  message: string;
  type: EnumToastType;
}

interface ToastContextProps {
  toast: ToastProps[];
  showToast: (message: string, type: EnumToastType, timeout?: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastProps[]>([]);

  const showToast = (
    message: string,
    type: EnumToastType,
    timeout: number = 3000
  ) => {
    setToast((prevToasts) => [...prevToasts, { message, type }]);

    setTimeout(() => {
      setToast((prevToasts) => prevToasts.filter((t) => t.message !== message));
    }, timeout);
  };

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
