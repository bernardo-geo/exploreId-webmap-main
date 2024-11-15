import { X } from 'lucide-react';

interface LocationToastProps {
  message: string;
  onClose: () => void;
  onRetry?: () => void;
}

export default function LocationToast({ message, onClose, onRetry }: LocationToastProps) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[2000] bg-red-50 px-4 py-3 
      rounded-xl shadow-lg flex items-center gap-3 ring-1 ring-red-200 max-w-[90%] w-auto">
      <span className="text-sm font-medium text-red-700">{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100 
            rounded transition-colors"
        >
          Retry
        </button>
      )}
      <button
        onClick={onClose}
        className="p-1 hover:bg-red-100 rounded-lg transition-colors ml-auto flex-shrink-0"
      >
        <X size={16} className="text-red-700" />
      </button>
    </div>
  );
}