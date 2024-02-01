// ImageSlider.tsx
import Image from "next/image";
import React from "react";

interface ImageSliderProps {
  urls: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ urls }) => {
  return (
    <div className="relative  w-full overflow-hidden rounded-t-2xl transform transition-transform hover:scale-105">
      <div className="w-full overflow-hidden h-44">
        {urls.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={`Image ${index + 1}`}
            loading="lazy"
            className="object-cover w-full h-full"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
