import { POIType } from './types';

export const SHARE_MESSAGES: Record<POIType, (name: string) => string> = {
  'ponto-interesse': (name: string) => 
    `Próxima paragem: ${name}! Vem explorar este fantástico ponto de interesse, acredita que vale a pena! Obtém as direções através do mapa ou da página. Sabe mais em `,
  'embaixador': (name: string) => 
    `Próxima paragem: ${name}! Vem conhecer este embaixador e vive uma experiência única! Obtém as direções através do mapa ou da página. Sabe mais em `
};

export const PLATFORM_CONFIGS = {
  whatsapp: {
    webUrl: 'https://web.whatsapp.com/send',
    mobileUrl: 'whatsapp://send',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
  },
  telegram: {
    webUrl: 'https://t.me/share/url',
    mobileUrl: 'tg://msg',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg'
  }
};