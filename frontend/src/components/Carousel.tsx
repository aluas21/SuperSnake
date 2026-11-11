import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  title?: string;
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ title, images }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const itemsToShow = 6;

  return (
    <div>
      <h3>{title}</h3>
      <div className="carousel-container">
        <ChevronLeft
          size={48}
          onClick={() => {
            if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
          }}
        />
        <div className="carousel">
          {images
            .slice(currentIndex, currentIndex + itemsToShow)
            .map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`Carousel item ${index + currentIndex}`}
              />
            ))}
        </div>
        <ChevronRight
          size={48}
          onClick={() => {
            if (currentIndex < images.length - itemsToShow)
              setCurrentIndex(currentIndex + 1);
          }}
        />
      </div>
    </div>
  );
};

export default Carousel;
