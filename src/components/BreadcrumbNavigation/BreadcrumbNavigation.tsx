import type { FolderWithPhotos } from '../../types';
import styles from './BreadcrumbNavigation.module.css';
import { FaChevronRight } from 'react-icons/fa';

export interface BreadcrumbNavigationProps {
  folders: FolderWithPhotos[];
  onFolderClick?: (path: string) => void;
}

export const BreadcrumbNavigation = ({ folders, onFolderClick }: BreadcrumbNavigationProps) => {
  if (!folders || folders.length === 0) {
    return null;
  }

  return (
    <div className={styles.breadcrumb}>
      {folders.map((folder, folderIndex) => {
        return (
          <div key={folder.path} className={styles.folderBreadcrumb}>
            {folderIndex > 0 && (
              <span className={styles.folderSeparator}>
                <FaChevronRight size={10} />
              </span>
            )}

            <div key={`${folder.path}-${folder.name}`} className={styles.pathSegment}>
              <button
                className={styles.breadcrumbItem}
                onClick={() => onFolderClick?.(folder.path)}
                title={`${folder.isExpanded ? 'Collapse' : 'Expand'} ${folder.name}`}
                aria-label={`${folder.isExpanded ? 'Collapse' : 'Expand'} folder: ${folder.name}`}
              >
                {folder.name}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

BreadcrumbNavigation.displayName = 'BreadcrumbNavigation';
