// Custom hook following Dependency Inversion Principle

import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import type { PhotoFile } from '../types';
import { isImageFile, createPhotoFile, cleanupPhotoUrls } from '../utils/fileUtils';

export interface LoadingProgress {
  current: number;
  total: number;
  isLoading: boolean;
}

const BATCH_SIZE = 20;

export const useFileSystem = () => {
  const [photos, setPhotos] = useState<PhotoFile[]>([]);

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

  const selectDirectory = useCallback(async () => {
    try {
      // Check if File System Access API is supported
      if (!('showDirectoryPicker' in window)) {
        toast.error(
          'Your browser does not support the File System Access API. Please use Chrome, Edge, or a compatible browser.',
        );
        return;
      }

      const dirHandle = await window.showDirectoryPicker(); //Async Iterator, has next();

      const imageFiles: File[] = [];
      let nonImageCount = 0;
      let totalFiles = 0;

      // Read all files from directory
      for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file') {
          totalFiles++;
          const file = await entry.getFile();
          if (isImageFile(file)) {
            imageFiles.push(file);
          } else {
            nonImageCount++;
          }
        }
      }

      // Handle empty directory
      if (totalFiles === 0) {
        toast.error('This folder is empty');
        setPhotos([]);
        return;
      }

      // Handle no images found
      if (imageFiles.length === 0) {
        toast.error('No image files found in this folder');
        setPhotos([]);
        return;
      }

      // Notify about non-image files
      if (nonImageCount > 0) {
        toast(`Skipped ${nonImageCount} non-image file${nonImageCount > 1 ? 's' : ''}`, {
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
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error selecting directory:', error);
        toast.error('Failed to load directory');
      }
    }
  }, [photos, processBatches]);

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
          toast(`Skipped ${nonImageCount} non-image file${nonImageCount > 1 ? 's' : ''}`, {
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
  }, [photos]);

  return {
    photos,
    selectDirectory,
    selectFiles,
    clearPhotos,
  };
};
