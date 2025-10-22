/**
 * Utility functions for folder path operations
 * Following Single Responsibility Principle
 */

/**
 * Parse a folder path into hierarchical parts
 * @param path - The folder path to parse (e.g., "/photos/vacation/2024")
 * @returns Array of path parts (e.g., ["photos", "vacation", "2024"])
 */
export const parseFolderPath = (path: string): string[] => {
  // Remove leading slash and split by separator
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return cleanPath.split('/').filter(Boolean);
};

/**
 * Get the last segment of a folder path (folder name)
 * @param path - The folder path (e.g., "/photos/vacation/2024")
 * @returns The last segment (e.g., "2024")
 */
export const getFolderName = (path: string): string => {
  const parts = parseFolderPath(path);
  return parts[parts.length - 1] || '';
};

/**
 * Build a partial path up to a specific index
 * @param parts - Array of path parts
 * @param index - Index to build up to (inclusive)
 * @returns Partial path string (e.g., "/photos/vacation")
 */
export const buildPartialPath = (parts: string[], index: number): string => {
  return '/' + parts.slice(0, index + 1).join('/');
};

/**
 * Get the parent path of a given folder path
 * @param path - The folder path
 * @returns The parent path or empty string if no parent
 */
export const getParentPath = (path: string): string => {
  const parts = parseFolderPath(path);
  if (parts.length <= 1) return '';
  return '/' + parts.slice(0, -1).join('/');
};

/**
 * Format folder path for display (truncate if too long)
 * @param path - The folder path
 * @param maxLength - Maximum length before truncation
 * @returns Formatted path string
 */
export const formatFolderPathForDisplay = (path: string, maxLength: number = 50): string => {
  if (path.length <= maxLength) return path;

  const parts = parseFolderPath(path);
  if (parts.length === 1) {
    return parts[0].length > maxLength ? `${parts[0].slice(0, maxLength - 3)}...` : parts[0];
  }

  // Show first and last parts with ellipsis in middle
  const first = parts[0];
  const last = parts[parts.length - 1];
  return `${first}/.../${last}`;
};
