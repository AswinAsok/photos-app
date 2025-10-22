import type { FolderWithPhotos } from '../../types';
import styles from './FolderAccordion.module.css';

interface FolderAccordionProps {
  folder: FolderWithPhotos;
  onToggle: (path: string) => void;
  children: React.ReactNode;
}

export const FolderAccordion = ({ folder, onToggle, children }: FolderAccordionProps) => {
  const handleToggle = () => {
    onToggle(folder.path);
  };

  return (
    <div className={styles.accordionContainer}>
      <button className={styles.accordionHeader} onClick={handleToggle}>
        <span className={styles.accordionIcon}>{folder.isExpanded ? '▼' : '▶'}</span>
        <h2 className={styles.accordionTitle}>
          {folder.name}
          <span className={styles.photoCount}>({folder.photos.length} photos)</span>
        </h2>
      </button>
      {folder.isExpanded && <div className={styles.accordionContent}>{children}</div>}
    </div>
  );
};
