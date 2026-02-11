// toast component for displaying notifications
'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ToastProps {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  onClose: () => void;
}

export function Toast({ title, description, variant = 'default', onClose }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`
        pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-lg
        ${variant === 'destructive' ? 'bg-red-600' : 'bg-white border border-gray-200'}
      `}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-1">
            <p className={`text-sm font-semibold ${variant === 'destructive' ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </p>
            {description && (
              <p className={`mt-1 text-sm ${variant === 'destructive' ? 'text-white/90' : 'text-gray-500'}`}>
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className={`ml-4 inline-flex rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              variant === 'destructive'
                ? 'text-white hover:bg-red-700 focus:ring-red-500'
                : 'text-gray-400 hover:bg-gray-100 focus:ring-gray-300'
            }`}
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Toaster({ toasts, onClose }: { toasts: any[]; onClose: (id: string) => void }) {
  return (
    <div className="fixed top-0 right-0 z-50 flex max-h-screen w-full flex-col-reverse p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => onClose(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}