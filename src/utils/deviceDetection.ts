export const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

export const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export const isIOSSafari = isIOS && isSafari;