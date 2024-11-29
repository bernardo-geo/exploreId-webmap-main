import { useState, useCallback } from 'react';

export function useLocation() {
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  const requestLocationPermission = useCallback(async () => {
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      
      if (result.state === 'denied') {
        setLocationError('Por favor, ative a localização nas configurações do seu navegador para usar esta funcionalidade.');
        setIsTracking(false);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error checking geolocation permission:', error);
      return false;
    }
  }, []);

  const toggleLocationTracking = useCallback(async () => {
    if (isTracking) {
      setIsTracking(false);
      return;
    }

    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    try {
      await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });
      
      setIsTracking(true);
      setLocationError(null);
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Por favor, ative a localização nas configurações do seu navegador.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Não foi possível obter sua localização atual.');
            break;
          case error.TIMEOUT:
            setLocationError('Tempo excedido ao tentar obter sua localização.');
            break;
          default:
            setLocationError('Ocorreu um erro ao tentar obter sua localização.');
        }
      }
      setIsTracking(false);
    }
  }, [isTracking, requestLocationPermission]);

  return {
    isTracking,
    locationError,
    setLocationError,
    toggleLocationTracking
  };
}