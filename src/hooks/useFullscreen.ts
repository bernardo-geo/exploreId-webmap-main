import { useState, useCallback, useEffect } from 'react';
import { Map } from 'leaflet';
import { isIOS, isIOSSafari } from '../utils/deviceDetection';

export const useFullscreen = (map: Map | null) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleIOSFullscreen = useCallback((appContainer: HTMLElement, enterFullscreen: boolean) => {
    if (enterFullscreen) {
      appContainer.classList.add('ios-fullscreen');
      document.body.style.overflow = 'hidden';
      if (isIOSSafari) {
        window.scrollTo(0, 0);
      }
    } else {
      appContainer.classList.remove('ios-fullscreen');
      document.body.style.overflow = '';
    }

    setIsFullscreen(enterFullscreen);
    if (map) setTimeout(() => map.invalidateSize(), 100);
  }, [map]);

  const toggleFullscreen = useCallback(() => {
    const appContainer = document.getElementById('app-container');
    if (!appContainer) return;

    if (isIOS) {
      handleIOSFullscreen(appContainer, !isFullscreen);
      return;
    }

    try {
      if (!document.fullscreenElement) {
        if (appContainer.requestFullscreen) {
          appContainer.requestFullscreen();
        } else if ((appContainer as any).webkitRequestFullscreen) {
          (appContainer as any).webkitRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        }
        setIsFullscreen(false);
      }
      if (map) setTimeout(() => map.invalidateSize(), 100);
    } catch (error) {
      console.error('Fullscreen error:', error);
      // Fallback to iOS-style fullscreen
      handleIOSFullscreen(appContainer, !isFullscreen);
    }
  }, [map, isFullscreen, handleIOSFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!isIOS) {
        setIsFullscreen(!!document.fullscreenElement);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return { isFullscreen, toggleFullscreen };
};