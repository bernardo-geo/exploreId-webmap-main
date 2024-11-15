import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Tooltip, AttributionControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { POI } from '../../types/poi';
import { BaseMaps } from '../../types/map';
import { categoryIcons } from '../../utils/icons';
import FullscreenButton from './Controls/FullscreenButton';
import LocationButton from './Controls/LocationButton';
import ResetViewButton from './Controls/ResetViewButton';
import POIPopup from '../POIPopup';
import LocationToast from '../LocationToast';
import { MutableRefObject } from 'react';
import * as L from 'leaflet';

interface MapContentProps {
  isMobile: boolean;
  locationError: string | null;
  setLocationError: (error: string | null) => void;
  mapRef: MutableRefObject<L.Map | null>;
  selectedBaseMap: string;
  baseMaps: BaseMaps;
  filteredPOIs: POI[];
  isSidebarOpen: boolean;
}

export default function MapContent({
  isMobile,
  locationError,
  setLocationError,
  mapRef,
  selectedBaseMap,
  baseMaps,
  filteredPOIs,
  isSidebarOpen
}: MapContentProps) {
  return (
    <div className={`absolute inset-0 ${isMobile ? 'pb-12' : ''}`}>
      {locationError && <LocationToast message={locationError} onClose={() => setLocationError(null)} />}
      
      <MapContainer
        center={[39.999, -8.464]}
        zoom={10.5}
        style={{ height: '100%', width: '100%' }}
        className="h-full w-full"
        ref={mapRef}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url={baseMaps[selectedBaseMap].url}
          attribution={baseMaps[selectedBaseMap].attribution}
          maxZoom={19}
        />
        
        <AttributionControl
          position="bottomright"
          prefix={false}
        />
        
        <ZoomControl position="bottomright" />

        {/* Map Controls */}
        <div className={`map-controls ${isMobile ? 'mobile' : ''} ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
          <FullscreenButton />
          <ResetViewButton />
          <LocationButton />
        </div>

        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={10}
          disableClusteringAtZoom={25}
          spiderfyOnMaxZoom={true}
          showCoverageOnHover={false}
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