import { useState, useEffect, useRef } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import * as L from 'leaflet';

export default function LocationTracker() {
  const map = useMap();
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const watchId = useRef<number | null>(null);

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


  useEffect(() => {
    if ('geolocation' in navigator) {
      watchId.current = navigator.geolocation.watchPosition(
        (pos) => {
          setPosition(pos);
          map.setView([pos.coords.latitude, pos.coords.longitude], map.getZoom());
        },
        (error) => {
          console.error('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }

    return () => {
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, [map]);

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
      <Popup>Estás aqui</Popup>
    </Marker>
  );
}