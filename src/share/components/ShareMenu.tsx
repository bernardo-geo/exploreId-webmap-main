import { Copy, X } from 'lucide-react';
import { useState } from 'react';
import { POI } from '../../types/poi';
import { SHARE_MESSAGES, PLATFORM_CONFIGS } from '../constants';
import { handleSocialShare } from '../utils';
import { SharePlatform } from '../types';
import { getPOIType } from '../utils/poiTypeUtils';

interface ShareMenuProps {
  poi: POI;
  onClose: () => void;
}

export default function ShareMenu({ poi, onClose }: ShareMenuProps) {
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const poiType = getPOIType(poi.category);
  const message = SHARE_MESSAGES[poiType](poi.name);

  const handleShare = async (platform: SharePlatform) => {
    try {
      const shareConfig = {
        url: poi.url || window.location.href,
        platform,
        message,
        poiType
      };

      const result = await handleSocialShare(shareConfig);
      
      if (!result.success) {
        throw new Error(result.error);
      }

      if (platform === 'copy') {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
          onClose();
        }, 2000);
      } else {
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to share');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 p-3 w-[220px]">
      <div className="flex items-center justify-between mb-1 pb-1 border-b">
        <h3 className="text-sm font-semibold text-gray-900">
          Partilha este local
        </h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={1} className="text-gray-500" />
        </button>
      </div>
      
      {error && (
        <div className="mb-2 p-2 bg-red-50 text-red-600 text-xs rounded-lg">
          {error}
        </div>
      )}

      {copySuccess && (
        <div className="mb-2 p-2 bg-green-50 text-green-600 text-xs rounded-lg">
          Copiado para a área de transferência!
        </div>
      )}
      
      <div className="space-y-1">
        <button
          onClick={() => handleShare('whatsapp')}
          className="flex items-center gap-2 w-full p-2 text-left text-sm text-gray-700 
            hover:bg-gray-50 rounded-lg transition-colors"
        >
          <img 
            src={PLATFORM_CONFIGS.whatsapp.icon}
            alt="WhatsApp"
            className="w-4 h-4"
          />
          WhatsApp
        </button>

        <button
          onClick={() => handleShare('telegram')}
          className="flex items-center gap-2 w-full p-2 text-left text-sm text-gray-700 
            hover:bg-gray-50 rounded-lg transition-colors"
        >
          <img 
            src={PLATFORM_CONFIGS.telegram.icon}
            alt="Telegram"
            className="w-4 h-4"
          />
          Telegram
        </button>

        <div className="my-2 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-gray-500">ou</span>
          </div>
        </div>

        <button
          onClick={() => handleShare('copy')}
          className="flex items-center gap-2 w-full p-2 text-left text-sm text-gray-700 
            hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Copy size={16} className="text-gray-500" />
          Copia esta informação e partilha
        </button>
      </div>
    </div>
  );
}