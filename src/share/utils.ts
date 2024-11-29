import { ShareConfig, SocialShareResponse } from './types';
import { PLATFORM_CONFIGS } from './constants';

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const createShareUrl = ({ url, platform, message }: ShareConfig): { mobileUrl: string; webUrl: string } => {
  const encodedMessage = encodeURIComponent(message);
  const encodedUrl = encodeURIComponent(url);
  const config = PLATFORM_CONFIGS[platform];

  if (platform === 'whatsapp') {
    return {
      mobileUrl: `${config.mobileUrl}?text=${encodedMessage}%20${encodedUrl}`,
      webUrl: `${config.webUrl}?text=${encodedMessage}%20${encodedUrl}`
    };
  }

  if (platform === 'telegram') {
    return {
      mobileUrl: `${config.mobileUrl}?text=${encodedMessage}%20${encodedUrl}`,
      webUrl: `${config.webUrl}?url=${encodedUrl}&text=${encodedMessage}`
    };
  }

  return { mobileUrl: '', webUrl: '' };
};

export const handleSocialShare = async (config: ShareConfig): Promise<SocialShareResponse> => {
  try {
    if (config.platform === 'copy') {
      await navigator.clipboard.writeText(`${config.message} ${config.url}`);
      return { success: true };
    }

    const urls = createShareUrl(config);
    const shareUrl = isMobileDevice() ? urls.mobileUrl : urls.webUrl;

    // Open in new tab
    window.open(shareUrl, '_blank', 'noopener,noreferrer');

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to share content'
    };
  }
};