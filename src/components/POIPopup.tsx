import { type FC } from 'react';
import { ExternalLink, MapPin, Building2 } from 'lucide-react';
import { type POI } from '../types/poi';
import ShareButton from '../share/components/ShareButton';

interface POIPopupProps {
  poi: POI;
  iconUrl: string;
}

const POIPopup: FC<POIPopupProps> = ({ poi, iconUrl }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${poi.coordinates[0]},${poi.coordinates[1]}`;

  const formatCategoryName = (category: string): string => {
    const articles = ['de', 'do', 'da', 'dos', 'das', 'e', 'os', 'as'];
    return category
      .split(' ')
      .map((word, index) => {
        const lowerWord = word.toLowerCase();
        return index === 0 || !articles.includes(lowerWord)
          ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          : lowerWord;
      })
      .join(' ');
  };
  
  return (
    <div className="w-[220px] sm:w-[260px] overflow-visible">
      {poi.image && (
        <img
          src={poi.image}
          alt={poi.name}
          className="w-full h-50 object-contain"
        />
      )}
      <div className="p-2 sm:p-3">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <img 
              src={iconUrl}
              alt={poi.category}
              className="w-5 h-5 object-contain"
            />
            <span className="text-xs font-medium text-blue-600">
              {formatCategoryName(poi.category)}
            </span>
          </div>
          <ShareButton poi={poi} />
        </div>
        <h3 className="font-bold text-base sm:text-lg mb-1.5 text-gray-900">
          {poi.name}
        </h3>
        {poi.image && (
          <div className="flex items-center gap-1.5 mb-2">
            <Building2 size={14} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-500">
              {poi.project}
            </span>
          </div>
        )}
        <p className="text-xs sm:text-sm text-gray-600 mb-3">
          {poi.description}
        </p>

        <div className="flex flex-col gap-2">
          {poi.url && (
            <a
              href={poi.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-blue-600 
                hover:text-blue-800 transition-colors bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100"
            >
              Sabe mais
              <ExternalLink size={14} />
            </a>
          )}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-green-600 
              hover:text-green-800 transition-colors bg-green-50 px-3 py-2 rounded-lg hover:bg-green-100"
          >
            Direções no Google Maps
            <MapPin size={14} />
          </a>
          {poi.hasMoedaId && (
            <a
              href="https://exploreid.pt/moeda-id/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-xs font-medium text-amber-600 
                hover:text-amber-800 transition-colors bg-amber-50 px-3 py-2 rounded-lg hover:bg-amber-100 
                ring-1 ring-amber-200"
            >
              <img src="/icons/ID.png" alt="Moeda ID" className="w-6 h-6" />
              Utiliza a Moeda ID - 10% de desconto
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default POIPopup;