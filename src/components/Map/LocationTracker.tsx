import { useState, useEffect, useRef } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import * as L from 'leaflet';

export default function LocationTracker() {
  const map = useMap();
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const watchId = useRef<number | null>(null);

  useEffect(() => {
    const handleSuccess = (pos: GeolocationPosition) => {
      setPosition(pos);
      setError(null);
      map.setView([pos.coords.latitude, pos.coords.longitude], map.getZoom());
    };

    const handleError = (err: GeolocationPositionError) => {
      let errorMessage = 'Error getting location';
      
      switch (err.code) {
        case err.PERMISSION_DENIED:
          errorMessage = 'Please enable location services to use this feature';
          break;
        case err.POSITION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable';
          break;
        case err.TIMEOUT:
          errorMessage = 'Location request timed out';
          break;
      }
      
      setError(errorMessage);
      console.error('Geolocation error:', err);
    };

    if ('geolocation' in navigator) {
      // First, get a single position fix
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });

      // Then start watching position
      watchId.current = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }

    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, [map]);

  if (error) {
    // You can handle the error UI here or pass it up to a parent component
    console.error(error);
    return null;
  }

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