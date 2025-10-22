import { VirtuosoMasonry } from '@virtuoso.dev/masonry';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
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
  isLoaded: boolean;
  onPhotoClick: (index: number) => void;
  onImageLoad: (id: string) => void;
}

// Memoized photo item component
const PhotoItem = memo(({ photo, index, isLoaded, onPhotoClick, onImageLoad }: PhotoItemProps) => {
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

// Hook to track window width for responsive column count
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

export const PhotoGrid = ({ photos, onPhotoClick, onClearPhotos }: PhotoGridProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = useCallback((id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  }, []);

  // Clear loaded images when photos change
  useEffect(() => {
    setLoadedImages(new Set());
  }, [photos]);

  const width = useWindowWidth();

  // Calculate responsive column count based on window width
  const columnCount = useMemo(() => {
    if (width < 500) {
      return 1;
    }
    if (width < 768) {
      return 2;
    }
    if (width < 1100) {
      return 3;
    }
    if (width < 1400) {
      return 4;
    }
    return 5;
  }, [width]);

  // Create context object that includes all item dependencies
  const itemContext = useMemo(
    () => ({
      loadedImages,
      onPhotoClick,
      onImageLoad: handleImageLoad,
    }),
    [loadedImages, onPhotoClick, handleImageLoad],
  );

  // ItemContent component for VirtuosoMasonry
  const ItemContent = useCallback(
    ({
      data: photo,
      index,
      context,
    }: {
      data: PhotoFile;
      index: number;
      context: typeof itemContext;
    }) => {
      return (
        <PhotoItem
          photo={photo}
          index={index}
          isLoaded={context.loadedImages.has(photo.id)}
          onPhotoClick={context.onPhotoClick}
          onImageLoad={context.onImageLoad}
        />
      );
    },
    [],
  );

  if (photos.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.masonaryGridContainer}>
        <div className={styles.masonaryGrid}>
          <VirtuosoMasonry
            columnCount={columnCount}
            data={photos}
            context={itemContext}
            useWindowScroll={false}
            initialItemCount={20}
            ItemContent={ItemContent}
            style={{
              height: '100%',
              maxWidth: '1400px',
              width: '100%',
              padding: 'var(--space-8)',
              boxSizing: 'border-box',
              gap: 'var(--space-4)',
              margin: 'auto',
            }}
          />
        </div>
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
