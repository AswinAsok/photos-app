import { memo, useEffect, useState } from 'react';
import type { LoadingProgress } from '../../hooks/useFileSystem';
import './ProgressIndicator.css';
import { cn } from '../../utils/cn';

interface ProgressIndicatorProps {
  progress: LoadingProgress;
}

export const ProgressIndicator = memo(({ progress }: ProgressIndicatorProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    // Show when loading starts
    if (progress.isLoading && progress.total > 0) {
      setIsVisible(true);
      setIsHiding(false);
    }

    // Hide after completion with a delay
    if (!progress.isLoading && progress.current > 0 && progress.current === progress.total) {
      // Start fade out animation
      const fadeTimeout = setTimeout(() => {
        setIsHiding(true);
      }, 1500); // Wait 1.5 seconds before starting fade

      // Remove from DOM after animation completes
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
        setIsHiding(false);
      }, 2000); // Total: 2 seconds

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(hideTimeout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.isLoading, progress.current, progress.total]);

  if (!isVisible) {
    return null;
  }

  const percentage = progress.total > 0 ? (progress.current / progress.total) * 100 : 0;

  return (
    <div className={cn('progress-indicator', { hiding: isHiding })}>
      <div className='progress-indicator-content'>
        <div className='progress-indicator-header'>
          <span className='progress-indicator-title'>Loading Images</span>
          <span className='progress-indicator-count'>
            {progress.current} / {progress.total}
          </span>
        </div>
        <div className='progress-bar'>
          <div className='progress-bar-fill' style={{ width: `${percentage}%` }} />
        </div>
        {!progress.isLoading && <div className='progress-indicator-complete'>Complete!</div>}
      </div>
    </div>
  );
});

ProgressIndicator.displayName = 'ProgressIndicator';
