import { Navigation } from 'lucide-react';
import { useMap } from 'react-leaflet';
import { useState, useCallback } from 'react';
import { useGeolocation } from '../../../hooks/useGeolocation';
import LocationToast from '../../LocationToast';

export default function LocationButton() {
  const map = useMap();
  const [isTracking, setIsTracking] = useState(false);
  const [showError, setShowError] = useState(false);
  const { position, error, startTracking, stopTracking } = useGeolocation(map);

  const toggleTracking = useCallback(() => {
    if (isTracking) {
      stopTracking();
      setShowError(false);
    } else {
      startTracking();
    }
    setIsTracking(!isTracking);
  }, [isTracking, startTracking, stopTracking]);

  const handleRetry = useCallback(() => {
    setShowError(false);
    startTracking();
    setIsTracking(true);
  }, [startTracking]);

  // Show error toast if there's an error and tracking is enabled
  if (error && isTracking && showError) {
    return (
      <>
        <LocationToast 
          message={error} 
          onClose={() => {
            setShowError(false);
            setIsTracking(false);
            stopTracking();
          }}
          onRetry={handleRetry}
        />
        <button
          onClick={toggleTracking}
          className="control-button bg-red-50"
          title="Location tracking error"
        >
          <Navigation size={20} className="text-red-500" />
        </button>
      </>
    );
  }

  return (
    <button
      onClick={toggleTracking}
      className={`control-button ${isTracking ? 'bg-blue-50' : ''}`}
      title={isTracking ? "Stop tracking location" : "Track my location"}
    >
      <Navigation 
        size={20} 
        className={isTracking ? 'text-blue-500' : 'text-gray-600'} 
      />
    </button>
  );
}