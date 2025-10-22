import { VirtuosoMasonry } from '@virtuoso.dev/masonry';
import { memo, useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react';
import styles from './PhotoGrid.module.css';
import type { PhotoFile, FolderWithPhotos } from '../../types';
import { cn } from '../../utils';
import Skeleton from 'react-loading-skeleton';
import { FolderAccordion } from '../FolderAccordion/FolderAccordion';
import { PhotoHeader } from '../PhotoHeader/PhotoHeader';

interface PhotoGridProps {
  photos: PhotoFile[];
  onPhotoClick: (index: number) => void;
  onClearPhotos: () => void;
  folders?: FolderWithPhotos[];
}

interface PhotoItemProps {
  photo: PhotoFile;
  index: number;
  isLoaded: boolean;
  onPhotoClick: (index: number) => void;
  onImageLoad: (id: string) => void;
}

// Common masonry styles
const BASE_MASONRY_STYLE: CSSProperties = {
  maxWidth: '1400px',
  width: '100%',
  boxSizing: 'border-box',
  gap: 'var(--space-4)',
  margin: 'auto',
};

const FOLDER_MASONRY_STYLE: CSSProperties = {
  ...BASE_MASONRY_STYLE,
  padding: 'var(--space-4)',
};

const SINGLE_MASONRY_STYLE: CSSProperties = {
  ...BASE_MASONRY_STYLE,
  height: '100%',
  padding: 'var(--space-8)',
};

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

export const PhotoGrid = ({ photos, onPhotoClick, onClearPhotos, folders }: PhotoGridProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [folderStates, setFolderStates] = useState<FolderWithPhotos[]>(folders || []);

  // Update folder states when folders prop changes
  useEffect(() => {
    if (folders) {
      setFolderStates(folders);
    }
  }, [folders]);

  const handleImageLoad = useCallback((id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  }, []);

  const handleFolderToggle = useCallback((path: string) => {
    setFolderStates((prev) =>
      prev.map((folder) =>
        folder.path === path
          ? { ...folder, isExpanded: !folder.isExpanded }
          : { ...folder, isExpanded: false },
      ),
    );
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

  // Unified function to create ItemContent renderer with optional index offset
  const createItemRenderer = useCallback(
    (indexOffset: number = 0) =>
      ({
        data: photo,
        index,
        context,
      }: {
        data: PhotoFile;
        index: number;
        context: typeof itemContext;
      }) => {
        if (!photo) return null;

        return (
          <PhotoItem
            photo={photo}
            index={indexOffset + index}
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

  // Render folders with accordions
  if (folderStates && folderStates.length > 0) {
    return (
      <div className={styles.container}>
        <PhotoHeader
          photoCount={photos.length}
          folderCount={folderStates.length}
          onClearPhotos={onClearPhotos}
          folders={folderStates}
          onFolderClick={handleFolderToggle}
        />
        <div className={styles.foldersContainer}>
          {folderStates.map((folder) => {
            // Calculate global photo indices for this folder
            const folderStartIndex = folderStates
              .slice(0, folderStates.indexOf(folder))
              .reduce((sum, f) => sum + f.photos.length, 0);

            return (
              <FolderAccordion key={folder.path} folder={folder} onToggle={handleFolderToggle}>
                <VirtuosoMasonry
                  columnCount={columnCount}
                  data={folder.photos}
                  context={itemContext}
                  useWindowScroll={false}
                  initialItemCount={20}
                  ItemContent={createItemRenderer(folderStartIndex)}
                  style={FOLDER_MASONRY_STYLE}
                />
              </FolderAccordion>
            );
          })}
        </div>
      </div>
    );
  }

  // Render single masonry grid (backward compatibility)
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
            ItemContent={createItemRenderer(0)}
            style={SINGLE_MASONRY_STYLE}
          />
        </div>
      </div>
      <PhotoHeader photoCount={photos.length} onClearPhotos={onClearPhotos} />
    </div>
  );
};
