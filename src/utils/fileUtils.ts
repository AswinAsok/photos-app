// Utility functions following Single Responsibility Principle

import type { PhotoFile, PhotoMetadata } from '../types';

const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

export const isImageFile = (file: File): boolean => {
  return SUPPORTED_IMAGE_TYPES.includes(file.type);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString();
};

export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
};

export const createPhotoFile = async (file: File): Promise<PhotoFile> => {
  const url = URL.createObjectURL(file);
  let dimensions: { width?: number; height?: number } = {};

  try {
    const { width, height } = await getImageDimensions(file);
    dimensions = { width, height };
  } catch {
    // Dimensions are optional
  }

  return {
    id: `${file.name}-${file.lastModified}`,
    name: file.name,
    url,
    file,
    ...dimensions,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
  };
};

export const getPhotoMetadata = (photo: PhotoFile): PhotoMetadata => {
  return {
    name: photo.name,
    size: formatFileSize(photo.size),
    dimensions: photo.width && photo.height ? `${photo.width} × ${photo.height}` : undefined,
    type: photo.type,
    lastModified: formatDate(photo.lastModified),
  };
};

export const cleanupPhotoUrls = (photos: PhotoFile[]): void => {
  photos.forEach(photo => URL.revokeObjectURL(photo.url));
};
