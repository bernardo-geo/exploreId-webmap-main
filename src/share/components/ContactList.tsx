import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Contact } from '../types';

interface ContactListProps {
  contacts: Contact[];
  onSelect: (contact: Contact) => void;
  onClose: () => void;
  loading?: boolean;
  error?: string | null;
}

export default function ContactList({
  contacts,
  onSelect,
  onClose,
  loading = false,
  error = null
}: ContactListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Partilhar via WhatsApp
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-b border-red-100">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="p-4">
          <div className="relative mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Procurar contactos..."
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg
                placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-transparent text-sm"
            />
            <Search 
              className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" 
              size={16}
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhum contacto encontrado
            </div>
          ) : (
            <div className="space-y-1 max-h-[400px] overflow-y-auto">
              {filteredContacts.map(contact => (
                <button
                  key={contact.id}
                  onClick={() => onSelect(contact)}
                  className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 
                    rounded-lg transition-colors"
                >
                  {contact.picture ? (
                    <img
                      src={contact.picture}
                      alt={contact.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 font-medium">
                        {contact.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 text-left">
                    <span className="text-sm font-medium text-gray-900">
                      {contact.name}
                    </span>
                    {contact.status && (
                      <p className="text-xs text-gray-500">{contact.status}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}