// Custom hook following Dependency Inversion Principle
// Now uses injected services instead of direct dependencies

import { useState, useCallback } from 'react';
import type { PhotoFile, FolderWithPhotos } from '../types';
import { isImageFile, createPhotoFile, cleanupPhotoUrls } from '../utils/fileUtils';
import toast from 'react-hot-toast';

export interface LoadingProgress {
  current: number;
  total: number;
  isLoading: boolean;
}

const BATCH_SIZE = Infinity;

export const useFileSystem = () => {
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [folders, setFolders] = useState<FolderWithPhotos[]>([]);

  const processBatches = useCallback(async (imageFiles: File[]) => {
    const allPhotoFiles: PhotoFile[] = [];

    // Process images in batches
    for (let i = 0; i < imageFiles.length; i += BATCH_SIZE) {
      const batch = imageFiles.slice(i, i + BATCH_SIZE);
      const batchPhotos = await Promise.all(batch.map((file) => createPhotoFile(file)));

      allPhotoFiles.push(...batchPhotos);

      // Update photos state incrementally to show progress
      setPhotos((prev) => [...prev, ...batchPhotos]);
    }

    return allPhotoFiles;
  }, []);

  // Recursively scan directories and collect files organized by folder
  const scanDirectoryRecursive = useCallback(
    async (
      dirHandle: FileSystemDirectoryHandle,
      basePath = '',
    ): Promise<{ path: string; files: File[] }[]> => {
      const folderFiles: { path: string; files: File[] }[] = [];
      const currentFolderFiles: File[] = [];

      for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file') {
          const file = await entry.getFile();
          if (isImageFile(file)) {
            currentFolderFiles.push(file);
          }
        } else if (entry.kind === 'directory') {
          // Recursively scan subdirectories
          const subPath = basePath ? `${basePath}/${entry.name}` : entry.name;
          const subFolders = await scanDirectoryRecursive(entry, subPath);
          folderFiles.push(...subFolders);
        }
      }

      // Add current folder if it has images
      if (currentFolderFiles.length > 0) {
        folderFiles.unshift({ path: basePath || 'Root', files: currentFolderFiles });
      }

      return folderFiles;
    },
    [],
  );

  const selectDirectory = useCallback(async () => {
    try {
      // Check if File System Access API is supported
      if (!('showDirectoryPicker' in window)) {
        toast.error(
          'Your browser does not support the File System Access API. Please use Chrome, Edge, or a compatible browser.',
        );
        return;
      }

      const dirHandle = await window.showDirectoryPicker();

      // Cleanup previous photos
      cleanupPhotoUrls(photos);

      // Clear photos and folders before loading new ones
      setPhotos([]);
      setFolders([]);

      // Recursively scan all folders
      const folderData = await scanDirectoryRecursive(dirHandle);

      // Handle no folders with images
      if (folderData.length === 0) {
        toast.error('No image files found in this folder or its subfolders');
        return;
      }

      // Process each folder's images
      const allFoldersWithPhotos: FolderWithPhotos[] = [];
      let totalImages = 0;

      for (const { path, files } of folderData) {
        const photoFiles = await Promise.all(files.map((file) => createPhotoFile(file)));

        allFoldersWithPhotos.push({
          path,
          name: path === 'Root' ? 'Root Folder' : path.split('/').pop() || path,
          photos: photoFiles,
          isExpanded: allFoldersWithPhotos.length === 0, // First folder expanded by default
        });

        totalImages += photoFiles.length;
      }

      setFolders(allFoldersWithPhotos);

      // Also set all photos in a flat array for backward compatibility
      const allPhotos = allFoldersWithPhotos.flatMap((folder) => folder.photos);
      setPhotos(allPhotos);

      const folderCount = allFoldersWithPhotos.length;
      toast.success(
        `Loaded ${totalImages} image${totalImages > 1 ? 's' : ''} from ${folderCount} folder${folderCount > 1 ? 's' : ''}`,
      );
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error selecting directory:', error);
        toast.error('Failed to load directory');
      }
    }
  }, [photos, scanDirectoryRecursive]);

  const selectFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      try {
        const fileArray = Array.from(files);
        const imageFiles = fileArray.filter(isImageFile);
        const nonImageCount = fileArray.length - imageFiles.length;

        if (imageFiles.length === 0) {
          toast.error('No image files selected');
          return;
        }

        if (nonImageCount > 0) {
          toast.error(`Skipped ${nonImageCount} non-image file${nonImageCount > 1 ? 's' : ''}`, {
            icon: 'ℹ️',
          });
        }

        // Cleanup previous photos
        cleanupPhotoUrls(photos);

        // Clear photos before loading new ones
        setPhotos([]);

        // Process images in batches
        const photoFiles = await processBatches(imageFiles);

        toast.success(`Loaded ${photoFiles.length} image${photoFiles.length > 1 ? 's' : ''}`);
      } catch (error) {
        console.error('Error loading files:', error);
        toast.error('Failed to load files');
      }
    },
    [photos, processBatches],
  );

  const clearPhotos = useCallback(() => {
    cleanupPhotoUrls(photos);
    setPhotos([]);
    setFolders([]);
  }, [photos]);

  return {
    photos,
    folders,
    selectDirectory,
    selectFiles,
    clearPhotos,
  };
};
