import { Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Tooltip, AttributionControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { POI } from '../../types/poi';
import { BaseMaps } from '../../types/map';
import { categoryIcons } from '../../utils/icons';
import LocationTracker from './LocationTracker';
import FullscreenControl from '../FullscreenControl';
import ReturnToViewButton from '../ReturnToViewButton';
import POIPopup from '../POIPopup';
import LocationToast from '../LocationToast';
import { MutableRefObject, useEffect } from 'react';
import * as L from 'leaflet';

interface MapContentProps {
  isMobile: boolean;
  locationError: string | null;
  setLocationError: (error: string | null) => void;
  mapRef: MutableRefObject<L.Map | null>;
  selectedBaseMap: string;
  baseMaps: BaseMaps;
  isTracking: boolean;
  toggleLocationTracking: () => void;
  filteredPOIs: POI[];
}

export default function MapContent({
  isMobile,
  locationError,
  setLocationError,
  mapRef,
  selectedBaseMap,
  baseMaps,
  isTracking,
  toggleLocationTracking,
  filteredPOIs
}: MapContentProps) {
  // Handle iOS-specific touch events
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventScroll, { passive: false });
    return () => {
      document.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  // Handle iOS Safari viewport height issues
  useEffect(() => {
    const resizeHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    resizeHeight();
    window.addEventListener('resize', resizeHeight);
    window.addEventListener('orientationchange', resizeHeight);

    return () => {
      window.removeEventListener('resize', resizeHeight);
      window.removeEventListener('orientationchange', resizeHeight);
    };
  }, []);

  return (
    <div className={`absolute inset-0 ${isMobile ? 'pb-12' : ''}`} style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
      {locationError && <LocationToast message={locationError} onClose={() => setLocationError(null)} />}
      
      <MapContainer
        center={[39.999, -8.464]}
        zoom={10.5}
        style={{ height: '100%', width: '100%' }}
        className="h-full w-full"
        ref={mapRef}
        zoomControl={false}
        attributionControl={false}
        touchZoom={true}
        tap={true}
        dragging={true}
        doubleClickZoom={true}
      >
        <TileLayer
          url={baseMaps[selectedBaseMap].url}
          attribution={baseMaps[selectedBaseMap].attribution}
          maxZoom={19}
        />
        
        <AttributionControl
          position="topright"
          prefix={false}
        />
        
        <ZoomControl position="bottomright" />
        <FullscreenControl />
        <ReturnToViewButton />

        <div className="leaflet-control-locate leaflet-bar leaflet-control">
          <button
            onClick={toggleLocationTracking}
            className={`
              w-11 h-11 bg-white rounded-xl shadow-lg flex items-center 
              justify-center active:bg-gray-100 focus:outline-none focus:ring-2 
              focus:ring-blue-500 transition-colors touch-manipulation
              ${isTracking ? 'text-blue-500' : 'text-gray-600'}
            `}
            title="Track my location"
          >
            <Navigation size={24} className={isTracking ? 'text-blue-500' : ''} />
          </button>
        </div>

        {isTracking && <LocationTracker />}

        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={10}
          disableClusteringAtZoom={25}
          spiderfyOnMaxZoom={true}
          showCoverageOnHover={false}
          zoomToBoundsOnClick={true}
          animate={true}
        >
          {filteredPOIs.map((poi) => (
            <Marker
              key={poi.id}
              position={poi.coordinates}
              icon={categoryIcons[poi.category]}
            >
              <Popup className="custom-popup">
                <POIPopup 
                  poi={poi} 
                  iconUrl={categoryIcons[poi.category].options.iconUrl || ''} 
                />
              </Popup>
              <Tooltip 
                direction="top" 
                offset={[0, -20]} 
                opacity={1}
                permanent={false}
              >
                {poi.name}
              </Tooltip>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}