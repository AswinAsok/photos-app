// Main App component following Open/Closed Principle

import { Activity, useState } from "react";
import FileSelector from "../components/FileSelector";
import PhotoGrid from "../components/PhotoGrid";
import PhotoViewer from "../components/PhotoViewer";
import { useFileSystem } from "../hooks/useFileSystem";
import styles from "./App.module.css";

const App = () => {
    const { photos, isLoading, selectDirectory, selectFiles, clearPhotos } = useFileSystem();
    const [viewerIndex, setViewerIndex] = useState<number | null>(null);

    const handlePhotoClick = (index: number) => {
        setViewerIndex(index);
    };

    const handleCloseViewer = () => {
        setViewerIndex(null);
    };

    return (
        <div className={styles.mainContainer}>
            <Activity mode={photos.length === 0 ? "visible" : "hidden"}>
                <FileSelector
                    onSelectDirectory={selectDirectory}
                    onSelectFiles={selectFiles}
                    isLoading={isLoading}
                />
            </Activity>

            <Activity mode={photos.length > 0 ? "visible" : "hidden"}>
                <PhotoGrid
                    photos={photos}
                    onPhotoClick={handlePhotoClick}
                    onClearPhotos={clearPhotos}
                />
            </Activity>

            {viewerIndex !== null && (
                <PhotoViewer
                    photos={photos}
                    currentIndex={viewerIndex}
                    onClose={handleCloseViewer}
                />
            )}
        </div>
    );
};

export default App;
