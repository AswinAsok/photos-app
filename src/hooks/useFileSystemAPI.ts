// Hook for checking File System Access API availability

import { useEffect, useState } from 'react';

export const useFileSystemAPI = () => {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    setIsAvailable('showDirectoryPicker' in window);
  }, []);

  return isAvailable;
};
