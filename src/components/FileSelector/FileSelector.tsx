// FileSelector component following Single Responsibility Principle

import { useRef, useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import styles from './FileSelector.module.css';
import { cn } from '../../utils/cn';
import { getFileSystemAccessFlagUrl } from '../../utils/flags';

interface FileSelectorProps {
  onSelectDirectory: () => void;
  onSelectFiles: (files: FileList | null) => void;
  isLoadingDirectory: boolean;
}

export const FileSelector = ({
  onSelectDirectory,
  onSelectFiles,
  isLoadingDirectory,
}: FileSelectorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isApiAvailable, setIsApiAvailable] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if File System Access API is available
    setIsApiAvailable('showDirectoryPicker' in window);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectFiles(e.target.files);
    // Reset input so the same files can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSelectFilesClick = () => {
    fileInputRef.current?.click();
  };

  const handleCopyFlagUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className={styles.fileSelector}>
      {/* Hero Section */}
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleGreen}>Safe home</span>
            <br />
            for your photos
          </h1>
          <p className={styles.heroSubtitle}>
            Not End-to-end encrypted. Not Cross-platform. But Open-source.
          </p>

          <div className={styles.buttonGroup}>
            <button
              className={cn(styles.button, styles.buttonPrimary, styles.buttonRow, {
                [styles.textDisabled]: isLoadingDirectory || !isApiAvailable,
              })}
              onClick={onSelectDirectory}
              disabled={isLoadingDirectory || !isApiAvailable}
            >
              {isLoadingDirectory ? <MoonLoader size={20} color='#ffffff' /> : 'Select Folder'}
            </button>

            <button
              className={cn(styles.button, styles.buttonSecondary, styles.buttonRow)}
              onClick={handleSelectFilesClick}
            >
              Select Files
            </button>
          </div>

          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            multiple
            onChange={handleFileInputChange}
            className={styles.hiddenInput}
          />
        </div>
      </main>

      {!isApiAvailable && (
        <div
          className={cn(
            styles.apiPill,
            isApiAvailable ? styles.apiAvailable : styles.apiUnavailable,
          )}
          title="'File System Access API is not available in this browser. Try using Chrome, Edge, or Opera with the feature enabled in browser settings.'"
        >
          <div>
            <span className={styles.apiDot}></span>
            <span className={styles.apiText}>File System Access API Unavailable</span>
          </div>

          {(() => {
            const flagUrl = getFileSystemAccessFlagUrl();
            return (
              <>
                <span className={styles.apiNote}>
                  {flagUrl
                    ? 'Kindly Copy the below URL and open in a new tab to enable it'
                    : 'Enable in browser settings for full folder access'}
                </span>
                {typeof flagUrl === 'string' && (
                  <button
                    onClick={() => handleCopyFlagUrl(flagUrl)}
                    className={cn(styles.copyButton, copied && styles.copied)}
                  >
                    {copied ? 'Copied!' : 'Copy URL'}
                  </button>
                )}
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};
