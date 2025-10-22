import { memo } from 'react';
import type { FolderWithPhotos } from '../../types';
import { BreadcrumbNavigation } from '../BreadcrumbNavigation/BreadcrumbNavigation';
import styles from './PhotoHeader.module.css';

export interface PhotoHeaderProps {
  photoCount: number;
  folderCount?: number;
  onClearPhotos: () => void;
  folders?: FolderWithPhotos[];
  onFolderClick?: (path: string) => void;
}

/**
 * PhotoHeader Component
 * Responsible for displaying photo count, folder information, and action buttons
 * Following Single Responsibility Principle
 */
export const PhotoHeader = memo(
  ({ photoCount, folderCount, onClearPhotos, folders, onFolderClick }: PhotoHeaderProps) => {
    // Generate title text
    const title = (() => {
      const photoText = `${photoCount} Photo${photoCount !== 1 ? 's' : ''}`;
      if (folderCount && folderCount > 0) {
        const folderText = `${folderCount} Folder${folderCount !== 1 ? 's' : ''}`;
        return `${photoText} in ${folderText}`;
      }
      return photoText;
    })();

    return (
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h2 className={styles.title}>{title}</h2>
            {folders && folders.length > 0 && (
              <BreadcrumbNavigation folders={folders} onFolderClick={onFolderClick} />
            )}
          </div>

          <button
            className={styles.clearButton}
            onClick={onClearPhotos}
            aria-label='Clear photos and select new ones'
          >
            Clear & Select New
          </button>
        </div>
      </div>
    );
  },
);

PhotoHeader.displayName = 'PhotoHeader';
