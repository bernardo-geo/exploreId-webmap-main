import { useMap } from 'react-leaflet';
import { Home } from 'lucide-react';

export default function ReturnToViewButton() {
  const map = useMap();

  const handleReturn = () => {
    map.setView([40.0411, -8.354], 10);
  };

  return (
    <div className="leaflet-control-return leaflet-bar leaflet-control">
      <button
        onClick={handleReturn}
        className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center 
          justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 
          focus:ring-blue-500 transition-colors"
        title="Return to Initial View"
      >
        <Home className="text-gray-600" size={20} />
      </button>
    </div>
  );
}