import defaultProductPhoto from "/vite.svg";
import { useState } from "react";

interface PhotosGalleryComponentProps {
  photos: string[];
}

const PhotosGalleryComponent = ({ photos }: PhotosGalleryComponentProps) => {
  const [currentPhotoId, setCurrentPhoto] = useState<number>(0);
  const len = photos.length;
  if (len === 0) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
        <div className="space-y-4">
          <img
            src={defaultProductPhoto}
            className="w-full h-96 object-contain rounded-md"
          />
          <h3 className="text-gray-600 text-sm">
            No se han proporcionado imágenes para este producto
          </h3>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <img
          src={photos[currentPhotoId]}
          className="w-full h-96 object-contain rounded-md"
        ></img>
      </div>
      {len > 1 && (
        <div className="flex flex-wrap justify-center gap-2">
          {photos.map((photo, index) => {
            return (
              <img
                key={index}
                src={photo}
                onClick={() => setCurrentPhoto(index)}
                className={`w-[20%] max-w-[64px] h-auto object-contain rounded-md cursor-pointer border-2 transition ${currentPhotoId === index ? "border-blue-600" : "border-transparent hover:border-gray-400"}`}
              ></img>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PhotosGalleryComponent;
