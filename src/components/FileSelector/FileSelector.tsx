// FileSelector component following Single Responsibility Principle

import { useRef } from 'react';
import styles from './FileSelector.module.css';
import { cn } from '../../utils/cn';

interface FileSelectorProps {
  onSelectDirectory: () => void;
  onSelectFiles: (files: FileList | null) => void;
}

export const FileSelector = ({ onSelectDirectory, onSelectFiles }: FileSelectorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
              className={cn(styles.button, styles.buttonPrimary, styles.buttonRow)}
              onClick={onSelectDirectory}
            >
              Select Folder
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
    </div>
  );
};
