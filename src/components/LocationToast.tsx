import { X } from 'lucide-react';

interface LocationToastProps {
  message: string;
  onClose: () => void;
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
      (position) => {
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);
      },
      (error) => {
          console.error("Erro ao obter localização:", error.message);
      }
  );
} else {
  console.error("Geolocalização não é suportada pelo navegador.");
}

export default function LocationToast({ message, onClose }: LocationToastProps) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[2000] bg-red-50 text-red-700 
      px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 ring-1 ring-red-200">
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="p-1 hover:bg-red-100 rounded-lg transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}