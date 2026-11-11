import React from 'react';

interface CarouselProps {
  title?: string;
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ title, images }) => {
  return (
    <div className="w-full mb-6">
      {title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
      <div className="flex flex-row overflow-x-auto gap-3 pb-4 snap-x">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${title || 'Carousel'} item ${index}`}
            className="h-16 w-16 object-cover flex-shrink-0 snap-start rounded border border-gray-200 shadow-sm"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;