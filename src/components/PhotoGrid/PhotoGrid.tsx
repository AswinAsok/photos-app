import { useState, useEffect } from 'react';
import styles from './PhotoGrid.module.css';
import type { PhotoFile } from '../../types';
import { cn } from '../../utils';
import Skeleton from 'react-loading-skeleton';

interface PhotoGridProps {
  photos: PhotoFile[];
  onPhotoClick: (index: number) => void;
  onClearPhotos: () => void;
}

export const PhotoGrid = ({ photos, onPhotoClick, onClearPhotos }: PhotoGridProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Reset loaded images when photos change
  useEffect(() => {
    setLoadedImages(new Set());
  }, [photos]);

  const handleImageLoad = (photoId: string) => {
    setLoadedImages((prev) => new Set(prev).add(photoId));
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {photos.map((photo, index) => {
          const isLoaded = loadedImages.has(photo.id);
          return (
            <div key={photo.id} className={styles.gridItem} onClick={() => onPhotoClick(index)}>
              {!isLoaded && (
                <div className={styles.skeletonWrapper}>
                  <Skeleton
                    height='100%'
                    width='100%'
                    borderRadius='var(--radius-xl)'
                    containerClassName={styles.skeletonContainer}
                  />
                </div>
              )}
              <img
                src={photo.url}
                alt={photo.name}
                className={cn(styles.image, { [styles.loaded]: isLoaded })}
                loading='lazy'
                onLoad={() => handleImageLoad(photo.id)}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2 className={styles.title}>{photos.length} Photos</h2>
          <button className={styles.clearButton} onClick={onClearPhotos}>
            Clear & Select New
          </button>
        </div>
      </div>
    </div>
  );
};
