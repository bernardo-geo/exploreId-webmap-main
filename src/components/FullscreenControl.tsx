import { useMap } from 'react-leaflet';
import { Maximize2, Minimize2 } from 'lucide-react';
import { useCallback, useState, useEffect } from 'react';

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

export default function FullscreenControl() {
  const map = useMap();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    const appContainer = document.getElementById('app-container');
    if (!appContainer) return;

    if (isIOS) {
      // iOS-specific fullscreen handling
      if (!isFullscreen) {
        appContainer.style.position = 'fixed';
        appContainer.style.top = '0';
        appContainer.style.left = '0';
        appContainer.style.width = '100vw';
        appContainer.style.height = '100vh';
        appContainer.style.zIndex = '9999';
        document.body.style.overflow = 'hidden';
        setIsFullscreen(true);
      } else {
        appContainer.style.position = '';
        appContainer.style.top = '';
        appContainer.style.left = '';
        appContainer.style.width = '';
        appContainer.style.height = '';
        appContainer.style.zIndex = '';
        document.body.style.overflow = '';
        setIsFullscreen(false);
      }
      setTimeout(() => map.invalidateSize(), 100);
      return;
    }

    // Standard fullscreen API for other platforms
    if (!document.fullscreenElement) {
      appContainer.requestFullscreen().then(() => {
        setIsFullscreen(true);
        setTimeout(() => map.invalidateSize(), 100);
      }).catch(err => {
        console.error(`Error enabling fullscreen: ${err.message}`);
        // Fallback to iOS-style fullscreen if standard API fails
        toggleFullscreen();
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
        setTimeout(() => map.invalidateSize(), 100);
      }).catch(err => {
        console.error(`Error exiting fullscreen: ${err.message}`);
      });
    }
  }, [map, isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!isIOS) {
        setIsFullscreen(!!document.fullscreenElement);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="leaflet-control-fullscreen leaflet-bar leaflet-control">
      <button
        onClick={toggleFullscreen}
        className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center 
          justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 
          focus:ring-blue-500 transition-colors touch-manipulation"
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        {isFullscreen ? (
          <Minimize2 className="text-gray-600" size={20} />
        ) : (
          <Maximize2 className="text-gray-600" size={20} />
        )}
      </button>
    </div>
  );
}