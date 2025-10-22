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
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>ente</div>
          <nav className={styles.nav}>
            <a href='#' className={styles.navLink}>
              Pricing
            </a>
            <a href='#' className={styles.navLink}>
              Blog
            </a>
            <a href='#' className={styles.navLink}>
              About
            </a>
            <a href='#' className={styles.navLink}>
              Download
            </a>
            <a href='#' className={styles.navLink}>
              Help
            </a>
          </nav>
          <div className={styles.headerActions}>
            <a
              href='https://github.com'
              className={styles.githubLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              <svg className={styles.githubIcon} viewBox='0 0 16 16' fill='currentColor'>
                <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z' />
              </svg>
              <span className={styles.githubCount}>22k</span>
            </a>
            <button className={styles.headerButton}>Sign up</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleGreen}>Safe home</span>
            <br />
            for your photos
          </h1>
          <p className={styles.heroSubtitle}>End-to-end encrypted. Cross-platform. Open-source.</p>

          <div className={styles.buttonGroup}>
            <button
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={onSelectDirectory}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Select Folder'}
            </button>

            <button
              className={`${styles.button} ${styles.buttonSecondary}`}
              onClick={handleSelectFilesClick}
              disabled={isLoading}
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
