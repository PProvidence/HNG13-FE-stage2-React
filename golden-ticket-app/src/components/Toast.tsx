import type { FC } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: FC<ToastProps> = ({ message, type, onClose }) => (
  <div
    className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm animate-slide-in ${
      type === 'success'
        ? 'bg-gradient-to-r from-amber-400 to-orange-500'
        : 'bg-gradient-to-r from-red-400 to-pink-500'
    }`}
  >
    {type === 'success' ? (
      <CheckCircle className="w-5 h-5 text-white" />
    ) : (
      <AlertCircle className="w-5 h-5 text-white" />
    )}
    <span className="text-white font-medium">{message}</span>
    <button
      onClick={onClose}
      className="text-white hover:text-gray-100"
      aria-label="Close notification"
    >
      <X className="w-5 h-5" />
    </button>
  </div>
);

export default Toast;
