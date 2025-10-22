import { memo, useCallback, useState } from 'react';
import Masonry from 'react-masonry-css';
import styles from './PhotoGrid.module.css';
import type { PhotoFile } from '../../types';
import { cn } from '../../utils';
import Skeleton from 'react-loading-skeleton';

interface PhotoGridProps {
  photos: PhotoFile[];
  onPhotoClick: (index: number) => void;
  onClearPhotos: () => void;
}

interface PhotoItemProps {
  photo: PhotoFile;
  index: number;
  onPhotoClick: (index: number) => void;
  isLoaded: boolean;
  onImageLoad: (id: string) => void;
}

// Memoized photo item to prevent unnecessary re-renders
const PhotoItem = memo(({ photo, index, onPhotoClick, isLoaded, onImageLoad }: PhotoItemProps) => {
  return (
    <div className={styles.gridItem} onClick={() => onPhotoClick(index)}>
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
        loading='lazy'
        className={cn(styles.image, { [styles.loaded]: isLoaded })}
        onLoad={() => onImageLoad(photo.id)}
      />
    </div>
  );
});

PhotoItem.displayName = 'PhotoItem';

export const PhotoGrid = ({ photos, onPhotoClick, onClearPhotos }: PhotoGridProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = useCallback((id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  }, []);

  // Responsive breakpoints for masonry columns
  const breakpointColumns = {
    default: 5,
    1400: 4,
    1100: 3,
    768: 2,
    500: 1,
  };

  if (photos.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.gridWrapper}>
        <Masonry
          breakpointCols={breakpointColumns}
          className={styles.masonryGrid}
          columnClassName={styles.masonryColumn}
        >
          {photos.map((photo, index) => (
            <PhotoItem
              key={photo.id}
              photo={photo}
              index={index}
              onPhotoClick={onPhotoClick}
              isLoaded={loadedImages.has(photo.id)}
              onImageLoad={handleImageLoad}
            />
          ))}
        </Masonry>
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
