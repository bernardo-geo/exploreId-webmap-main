import { useState, useEffect, useRef, useCallback } from 'react';
import { Map as LeafletMap } from 'leaflet';

interface GeolocationHookProps {
  map: LeafletMap | null;
  onError?: (message: string) => void;
}

export function useGeolocation({ map, onError }: GeolocationHookProps) {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const watchId = useRef<number | null>(null);

  const clearWatch = useCallback(() => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }, []);

  const handleError = useCallback((error: GeolocationPositionError) => {
    console.error('Geolocation error:', error);
    let message = 'Unable to get your location';

    switch (error.code) {
      case error.PERMISSION_DENIED:
        message = 'Please enable location services in your device settings to use this feature.';
        break;
      case error.POSITION_UNAVAILABLE:
        message = 'Location information is unavailable. Please try again.';
        break;
      case error.TIMEOUT:
        message = 'Location request timed out. Please try again.';
        break;
    }

    onError?.(message);
    setIsTracking(false);
    clearWatch();
  }, [clearWatch, onError]);

  const startTracking = useCallback(() => {
    if (!('geolocation' in navigator)) {
      onError?.('Geolocation is not supported by your browser');
      return;
    }

    setIsTracking(true);

    const handleSuccess = (pos: GeolocationPosition) => {
      setPosition(pos);
      if (map) {
        map.setView([pos.coords.latitude, pos.coords.longitude], map.getZoom());
      }
    };

    // Try to get initial position quickly
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });

    // Then start watching with a longer timeout
    watchId.current = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, [map, handleError, onError]);

  const stopTracking = useCallback(() => {
    setIsTracking(false);
    clearWatch();
  }, [clearWatch]);

  const toggleTracking = useCallback(() => {
    if (isTracking) {
      stopTracking();
    } else {
      startTracking();
    }
  }, [isTracking, startTracking, stopTracking]);

  useEffect(() => {
    return () => {
      clearWatch();
    };
  }, [clearWatch]);

  return {
    position,
    isTracking,
    toggleTracking,
    startTracking,
    stopTracking
  };
}