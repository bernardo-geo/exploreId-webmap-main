import { useMap } from 'react-leaflet';
import { Maximize2, Minimize2 } from 'lucide-react';
import { useFullscreen } from '../hooks/useFullscreen';

export default function FullscreenControl() {
  const map = useMap();
  const { isFullscreen, toggleFullscreen } = useFullscreen('app-container');

  const handleClick = async () => {
    await toggleFullscreen();
    // Give the browser time to complete the transition
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  };

  return (
    <div className="leaflet-control-fullscreen leaflet-bar leaflet-control">
      <button
        onClick={handleClick}
        className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center 
          justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 
          focus:ring-blue-500 transition-colors touch-manipulation"
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        {isFullscreen ? (
          <Minimize2 className="text-gray-600" size={20} />
        ) : (
          <Maximize2 className="text-gray-600" size={20} />
        )}
      </button>
    </div>
  );
}