// Keyboard navigation hook following Single Responsibility Principle
// Separates keyboard event handling from UI rendering logic

import { useEffect } from 'react';

export interface KeyboardNavigationConfig {
  onEscape?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onKeyI?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
}

/**
 * Hook for handling keyboard navigation
 * Provides a reusable way to handle keyboard events
 *
 * @param config - Configuration object with keyboard event handlers
 */
export const useKeyboardNavigation = (config: KeyboardNavigationConfig) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          config.onEscape?.();
          break;
        case 'ArrowLeft':
          config.onArrowLeft?.();
          break;
        case 'ArrowRight':
          config.onArrowRight?.();
          break;
        case 'ArrowUp':
          config.onArrowUp?.();
          break;
        case 'ArrowDown':
          config.onArrowDown?.();
          break;
        case 'i':
        case 'I':
          config.onKeyI?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [config]);
};
