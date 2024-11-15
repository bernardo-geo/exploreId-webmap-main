import { Marker, Popup, useMap } from 'react-leaflet';
import * as L from 'leaflet';
import { useGeolocation } from '../../hooks/useGeolocation';

interface LocationTrackerProps {
  onError?: (message: string) => void;
}

export default function LocationTracker({ onError }: LocationTrackerProps) {
  const map = useMap();
  const { position } = useGeolocation({ map, onError });

  if (!position) return null;

  return (
    <Marker
      position={[position.coords.latitude, position.coords.longitude]}
      icon={new L.DivIcon({
        className: 'location-marker',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })}
    >
      <Popup>Você está aqui</Popup>
    </Marker>
  );
}