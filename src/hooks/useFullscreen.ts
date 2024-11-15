import { useState, useCallback, useEffect } from 'react';
import screenfull from 'screenfull';

export function useFullscreen(elementId: string) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(async () => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
      if (screenfull.isEnabled) {
        await screenfull.toggle(element);
      } else {
        console.warn('Fullscreen is not supported');
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }, [elementId]);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(screenfull.isFullscreen);
    };

    if (screenfull.isEnabled) {
      screenfull.on('change', handleChange);
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', handleChange);
      }
    };
  }, []);

  return { isFullscreen, toggleFullscreen };
}