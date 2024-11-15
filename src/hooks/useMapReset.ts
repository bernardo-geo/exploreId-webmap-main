import { useCallback } from 'react';
import { Map } from 'leaflet';
import { isIOS } from '../utils/deviceDetection';

interface MapResetOptions {
  center: [number, number];
  zoom: number;
}

export const useMapReset = (map: Map | null, options: MapResetOptions) => {
  const handleReset = useCallback(() => {
    if (!map) return;

    try {
      if (isIOS) {
        // Disable animations on iOS for better reliability
        map.setView(options.center, options.zoom, {
          animate: false,
          duration: 0
        });
        return;
      }

      map.setView(options.center, options.zoom, {
        animate: true,
        duration: 1
      });
    } catch (error) {
      console.error('Error resetting map view:', error);
      // Fallback without animation
      map.setView(options.center, options.zoom, {
        animate: false
      });
    }
  }, [map, options]);

  return handleReset;
};