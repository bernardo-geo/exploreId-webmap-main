export type SharePlatform = 'whatsapp' | 'telegram' | 'copy';

export type POIType = 'ponto-interesse' | 'embaixador';

export interface ShareConfig {
  url: string;
  platform: SharePlatform;
  message: string;
  poiType: POIType;
}

export interface SocialShareResponse {
  success: boolean;
  error?: string;
}