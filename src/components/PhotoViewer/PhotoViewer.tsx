// PhotoViewer component following Single Responsibility Principle
// Now uses keyboard navigation hook for better separation of concerns

import { useState, useCallback } from 'react';
import type { PhotoFile } from '../../types';
import { getPhotoMetadata } from '../../utils/fileUtils';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import styles from './PhotoViewer.module.css';
import { cn } from '../../utils/cn';

interface PhotoViewerProps {
  photos: PhotoFile[];
  currentIndex: number;
  onClose: () => void;
}

export const PhotoViewer = ({ photos, currentIndex, onClose }: PhotoViewerProps) => {
  const [index, setIndex] = useState(currentIndex);
  const [showMetadata, setShowMetadata] = useState(true);

  const currentPhoto = photos[index];
  const metadata = getPhotoMetadata(currentPhoto);

  const navigatePrev = useCallback(() => {
    setIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  }, [photos.length]);

  const navigateNext = useCallback(() => {
    setIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  }, [photos.length]);

  const toggleMetadata = useCallback(() => {
    setShowMetadata((prev) => !prev);
  }, []);

  useKeyboardNavigation({
    onEscape: onClose,
    onArrowLeft: navigatePrev,
    onArrowRight: navigateNext,
    onKeyI: toggleMetadata,
  });

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.viewer} onClick={handleBackdropClick}>
      <button className={styles.closeButton} onClick={onClose} title='Close (Esc)'>
        ✕
      </button>

      <button
        className={cn(styles.navButton, styles.prevButton)}
        onClick={navigatePrev}
        title='Previous (←)'
      >
        ‹
      </button>

      <button
        className={cn(styles.navButton, styles.nextButton)}
        onClick={navigateNext}
        title='Next (→)'
      >
        ›
      </button>

      <div className={styles.imageContainer}>
        <img src={currentPhoto.url} alt={currentPhoto.name} className={styles.image} />
      </div>

      <button className={styles.infoButton} onClick={toggleMetadata} title='Toggle metadata (I)'>
        i
      </button>

      {showMetadata && (
        <div className={styles.metadata}>
          <div className={styles.metadataHeader}>
            <h3 className={styles.metadataTitle}>Image Info</h3>
            <span className={styles.imageCounter}>
              {index + 1} / {photos.length}
            </span>
          </div>

          <div className={styles.metadataContent}>
            <div className={styles.metadataRow}>
              <span className={styles.metadataLabel}>Name:</span>
              <span className={styles.metadataValue}>{metadata.name}</span>
            </div>

            {metadata.dimensions && (
              <div className={styles.metadataRow}>
                <span className={styles.metadataLabel}>Dimensions:</span>
                <span className={styles.metadataValue}>{metadata.dimensions}</span>
              </div>
            )}

            <div className={styles.metadataRow}>
              <span className={styles.metadataLabel}>Size:</span>
              <span className={styles.metadataValue}>{metadata.size}</span>
            </div>

            <div className={styles.metadataRow}>
              <span className={styles.metadataLabel}>Type:</span>
              <span className={styles.metadataValue}>{metadata.type}</span>
            </div>

            <div className={styles.metadataRow}>
              <span className={styles.metadataLabel}>Modified:</span>
              <span className={styles.metadataValue}>{metadata.lastModified}</span>
            </div>
          </div>

          <div className={styles.keyboardHints}>
            <span>← → Navigate</span>
            <span>ESC Close</span>
            <span>I Toggle info</span>
          </div>
        </div>
      )}
    </div>
  );
};
