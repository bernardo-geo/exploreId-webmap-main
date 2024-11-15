import { Home } from 'lucide-react';
import { useMap } from 'react-leaflet';
import { useMapReset } from '../../../hooks/useMapReset';

const DEFAULT_VIEW = {
  center: [39.999, -8.464] as [number, number],
  zoom: 10.5
};

export default function ResetViewButton() {
  const map = useMap();
  const handleReset = useMapReset(map, DEFAULT_VIEW);

  return (
    <button
      onClick={handleReset}
      onTouchEnd={(e) => {
        e.preventDefault();
        handleReset();
      }}
      className="control-button"
      title="Return to Initial View"
    >
      <Home className="text-gray-600" size={20} />
    </button>
  );
}