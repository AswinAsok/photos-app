// Type definitions following Interface Segregation Principle

export interface PhotoFile {
  id: string;
  name: string;
  url: string;
  file: File;
  width?: number;
  height?: number;
  size: number;
  type: string;
  lastModified: number;
}

export interface PhotoMetadata {
  name: string;
  size: string;
  dimensions?: string;
  type: string;
  lastModified: string;
}

export interface PhotoGridProps {
  photos: PhotoFile[];
  onPhotoClick: (index: number) => void;
}

export interface PhotoViewerProps {
  photos: PhotoFile[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export interface FileSelectorProps {
  onFilesSelected: (files: PhotoFile[]) => void;
}
