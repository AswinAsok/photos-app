import { memo } from 'react';
import type { FolderWithPhotos } from '../../types';
import { parseFolderPath } from '../../utils';
import styles from './BreadcrumbNavigation.module.css';
import { FaChevronRight } from 'react-icons/fa';

export interface BreadcrumbNavigationProps {
  folders: FolderWithPhotos[];
  onFolderClick?: (path: string) => void;
}

export const BreadcrumbNavigation = memo(
  ({ folders, onFolderClick }: BreadcrumbNavigationProps) => {
    if (!folders || folders.length === 0) {
      return null;
    }

    return (
      <div className={styles.breadcrumb}>
        {folders.map((folder, folderIndex) => {
          const pathParts = parseFolderPath(folder.path);

          return (
            <div key={folder.path} className={styles.folderBreadcrumb}>
              {folderIndex > 0 && (
                <span className={styles.folderSeparator}>
                  <FaChevronRight size={10} />
                </span>
              )}

              {pathParts.map((part, partIndex) => (
                <div key={`${folder.path}-${partIndex}`} className={styles.pathSegment}>
                  {partIndex > 0 && <span className={styles.pathSeparator}>›</span>}

                  <button
                    className={styles.breadcrumbItem}
                    onClick={() => onFolderClick?.(folder.path)}
                    title={`${folder.isExpanded ? 'Collapse' : 'Expand'} ${folder.path}`}
                    aria-label={`${folder.isExpanded ? 'Collapse' : 'Expand'} folder: ${part}`}
                  >
                    {part}
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  },
);

BreadcrumbNavigation.displayName = 'BreadcrumbNavigation';
