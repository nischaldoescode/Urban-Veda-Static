// toast hook for notifications
import { useState, useEffect } from 'react';

type ToastProps = {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
};

type Toast = ToastProps & {
  id: string;
};

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({ title, description, variant = 'default' }: ToastProps) => {
    const id = Math.random().toString(36).substring(7);
    const newToast: Toast = { id, title, description, variant };
    
    setToasts((prev) => [...prev, newToast]);

    // auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return { toast, toasts };
}