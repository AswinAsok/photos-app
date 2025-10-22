// Main App component following Open/Closed Principle

import { Activity, useState } from 'react';
import { useFileSystem } from '../hooks/useFileSystem';
import styles from './App.module.css';
import { FileSelector, PhotoGrid, PhotoViewer } from '../components';

const App = () => {
  const { photos, folders, selectDirectory, selectFiles, clearPhotos } = useFileSystem();
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const handlePhotoClick = (index: number) => {
    setViewerIndex(index);
  };

  const handleCloseViewer = () => {
    setViewerIndex(null);
  };

  return (
    <div className={styles.mainContainer}>
      {/* Header - Consistent across all views */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            ente
            <span>alla</span>
          </div>
          <nav className={styles.nav}>
            <a href='#' className={styles.navLink}>
              Aswin Asok's Submission
            </a>
          </nav>
        </div>
      </header>

      <Activity mode={photos.length === 0 ? 'visible' : 'hidden'}>
        <FileSelector onSelectDirectory={selectDirectory} onSelectFiles={selectFiles} />
      </Activity>

      <Activity mode={photos.length > 0 ? 'visible' : 'hidden'}>
        <PhotoGrid
          photos={photos}
          folders={folders}
          onPhotoClick={handlePhotoClick}
          onClearPhotos={clearPhotos}
        />
      </Activity>

      {viewerIndex !== null && (
        <PhotoViewer photos={photos} currentIndex={viewerIndex} onClose={handleCloseViewer} />
      )}
    </div>
  );
};

export default App;
