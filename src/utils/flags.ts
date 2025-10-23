// /home/aswinasok/photo-app/src/utils/flags.ts
/**
 * Detect current browser and return the appropriate flags URL
 * prefilled with "#file-system-access-api".
 *
 * Returns null when the browser has no flags page or no known flags scheme.
 */

export function getFileSystemAccessFlagUrl(): string | null {
  if (typeof navigator === 'undefined') return null;

  const ua = navigator.userAgent || '';
  const vendor = navigator.vendor || '';

  // Edge (Chromium)
  if (/Edg\//i.test(ua)) {
    return 'edge://flags/#file-system-access-api';
  }

  // Opera
  if (/OPR\//i.test(ua) || /Opera/i.test(ua)) {
    return 'opera://flags/#file-system-access-api';
  }

  // Vivaldi
  if (/Vivaldi\//i.test(ua)) {
    return 'vivaldi://flags/#file-system-access-api';
  }

  // Brave (identifies similarly to Chrome; navigator.brave may be present)
  if (navigator && 'brave' in navigator) {
    return 'brave://flags/#file-system-access-api';
  }
  // Brave (identifies similarly to Chrome; navigator.brave may be present)
  // Use a runtime property check without any type assertions
  if ('brave' in navigator) {
    return 'brave://flags/#file-system-access-api';
  }
  // Chrome / Chromium (includes most Chromium-based browsers that didn't match above)
  if (/Chrome\//i.test(ua) && /Google Inc/.test(vendor)) {
    return 'chrome://flags/#file-system-access-api';
  }

  // Generic Chromium fallback (when vendor isn't Google but UA contains Chrome)
  if (/Chrome\//i.test(ua)) {
    return 'chrome://flags/#file-system-access-api';
  }

  // Firefox, Safari and other browsers generally don't expose a flags page for this feature
  return null;
}
