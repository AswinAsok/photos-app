// FileSelector component following Single Responsibility Principle

import { useRef } from 'react';
import styles from './FileSelector.module.css';

interface FileSelectorProps {
  onSelectDirectory: () => void;
  onSelectFiles: (files: FileList | null) => void;
  isLoading: boolean;
}

export const FileSelector = ({
  onSelectDirectory,
  onSelectFiles,
  isLoading,
}: FileSelectorProps) => {
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
      <div className={styles.content}>
        <h1 className={styles.title}>Photo Viewer</h1>
        <p className={styles.subtitle}>Select a folder or files to view your photos</p>

        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick={onSelectDirectory} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Select Folder'}
          </button>

          <button className={styles.button} onClick={handleSelectFilesClick} disabled={isLoading}>
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
    </div>
  );
};
