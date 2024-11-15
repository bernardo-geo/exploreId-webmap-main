import { Maximize2, Minimize2 } from 'lucide-react';
import { useMap } from 'react-leaflet';
import { useFullscreen } from '../../../hooks/useFullscreen';

export default function FullscreenButton() {
  const map = useMap();
  const { isFullscreen, toggleFullscreen } = useFullscreen(map);

  return (
    <button
      onClick={toggleFullscreen}
      onTouchEnd={(e) => {
        e.preventDefault();
        toggleFullscreen();
      }}
      className="control-button"
      title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
    >
      {isFullscreen ? (
        <Minimize2 className="text-gray-600" size={20} />
      ) : (
        <Maximize2 className="text-gray-600" size={20} />
      )}
    </button>
  );
}