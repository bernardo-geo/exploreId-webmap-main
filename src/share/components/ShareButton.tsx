import { Share2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ShareMenu from './ShareMenu';
import { POI } from '../../types/poi';

interface ShareButtonProps {
  poi: POI;
}

export default function ShareButton({ poi }: ShareButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        menuRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={buttonRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-gray-600 
          hover:text-gray-800 transition-colors bg-gray-50 px-2 py-1 rounded-lg hover:bg-gray-100"
        aria-label="Share"
      >
        <Share2 size={14} />
      </button>

      {isMenuOpen && (
        <div 
          ref={menuRef}
          className="fixed transform -translate-x-1/2 left-1/2 top-1/2 z-[9999]"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.1))'
          }}
        >
          <ShareMenu
            poi={poi}
            onClose={() => setIsMenuOpen(false)}
          />
        </div>
      )}
    </div>
  );
}