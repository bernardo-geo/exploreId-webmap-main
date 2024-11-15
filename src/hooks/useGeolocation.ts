import { useState, useEffect, useRef, useCallback } from 'react';
import { Map } from 'leaflet';
import { isIOS } from '../utils/deviceDetection';

interface GeolocationHookReturn {
  position: GeolocationPosition | null;
  error: string | null;
  startTracking: () => void;
  stopTracking: () => void;
}

export const useGeolocation = (map: Map | null): GeolocationHookReturn => {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const watchId = useRef<number | null>(null);
  const retryCount = useRef(0);
  const maxRetries = 3;

  const clearWatch = useCallback(() => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }, []);

  const handleSuccess = useCallback((pos: GeolocationPosition) => {
    setPosition(pos);
    setError(null);
    retryCount.current = 0;
    if (map) {
      map.setView([pos.coords.latitude, pos.coords.longitude], 
        map.getZoom() || 15, // Use current zoom or default to 15 if not set
        { animate: true, duration: 1 }
      );
    }
  }, [map]);

  const handleError = useCallback((err: GeolocationPositionError) => {
    let errorMessage = 'Error getting location';
    
    switch (err.code) {
      case err.PERMISSION_DENIED:
        errorMessage = isIOS 
          ? 'Please enable location services in Settings > Privacy > Location Services'
          : 'Please allow location access to use this feature';
        break;
      case err.POSITION_UNAVAILABLE:
        if (retryCount.current < maxRetries) {
          retryCount.current++;
          return; // Silent retry
        }
        errorMessage = 'Unable to get your location. Please try again.';
        break;
      case err.TIMEOUT:
        if (retryCount.current < maxRetries) {
          retryCount.current++;
          return; // Silent retry
        }
        errorMessage = 'Location request timed out. Please try again.';
        break;
    }
    
    setError(errorMessage);
    clearWatch(); // Stop watching on error
  }, [clearWatch]);

  const startTracking = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setError('Location services are not supported by your browser');
      return;
    }

    // Reset state
    setError(null);
    retryCount.current = 0;

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: isIOS ? 10000 : 5000, // Longer timeout for iOS
      maximumAge: 0
    };

    try {
      // First get a single position fix
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        handleError,
        options
      );

      // Then start watching position
      watchId.current = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        options
      );
    } catch (error) {
      console.error('Geolocation error:', error);
      setError('Failed to start location tracking');
    }
  }, [handleSuccess, handleError]);

  const stopTracking = useCallback(() => {
    clearWatch();
    setPosition(null);
    setError(null);
    retryCount.current = 0;
  }, [clearWatch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearWatch();
    };
  }, [clearWatch]);

  return { position, error, startTracking, stopTracking };
};