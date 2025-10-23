// ApiAvailabilityAlert - Displays File System Access API availability status

import { cn } from '../../utils/cn';
import { getFileSystemAccessFlagUrl } from '../../utils/flags';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import styles from './ApiAvailabilityAlert.module.css';

interface ApiAvailabilityAlertProps {
  isApiAvailable: boolean;
}

export const ApiAvailabilityAlert = ({ isApiAvailable }: ApiAvailabilityAlertProps) => {
  const { copied, copy } = useCopyToClipboard();

  if (isApiAvailable) {
    return null;
  }

  const flagUrl = getFileSystemAccessFlagUrl();

  return (
    <div
      className={cn(styles.apiPill, styles.apiUnavailable)}
      title="File System Access API is not available in this browser. Try using Chrome, Edge, or Opera with the feature enabled in browser settings."
    >
      <div>
        <span className={styles.apiDot}></span>
        <span className={styles.apiText}>File System Access API Unavailable</span>
      </div>

      <span className={styles.apiNote}>
        {flagUrl
          ? 'Kindly Copy the below URL and open in a new tab to enable it'
          : 'Enable in browser settings for full folder access'}
      </span>

      {typeof flagUrl === 'string' && (
        <button
          onClick={() => copy(flagUrl)}
          className={cn(styles.copyButton, copied && styles.copied)}
        >
          {copied ? 'Copied!' : 'Copy URL'}
        </button>
      )}
    </div>
  );
};
