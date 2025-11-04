import React, { useEffect, useState } from 'react';
import MenuButton from './MenuButton';

interface MenuProps {
  buttons: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    buttonBackground: string;
    width?: string;
    height?: string;
  }[];
  orientation?: 'horizontal' | 'vertical' | 'grid';
}

const Menu: React.FC<MenuProps> = ({
  buttons = [],
  orientation: propOrientation,
}) => {
  const [orientation, setOrientation] = useState<
    'horizontal' | 'vertical' | 'grid'
  >(propOrientation || 'horizontal');

  useEffect(() => {
    // Only apply responsive behavior if no propOrientation is provided
    if (!propOrientation) {
      const updateOrientation = () => {
        if (window.innerWidth < 600) {
          setOrientation('vertical');
        } else if (window.innerWidth < 900) {
          setOrientation('horizontal');
        } else {
          setOrientation('grid');
        }
      };

      updateOrientation();

      window.addEventListener('resize', updateOrientation);
      return () => {
        window.removeEventListener('resize', updateOrientation);
      };
    }
  }, [propOrientation]);

  // Use propOrientation if provided, else the internal state
  const effectiveOrientation = propOrientation || orientation;

  return (
    <div
      className={`${
        effectiveOrientation === 'grid'
          ? 'grid grid-cols-2 gap-8 justify-center items-center'
          : effectiveOrientation === 'horizontal'
            ? 'flex justify-center items-center space-x-8'
            : 'flex flex-col justify-center items-center space-y-8'
      }`}
    >
      {buttons.map((btn, index) => (
        <MenuButton
          key={index}
          title={btn.title}
          description={btn.description}
          buttonText={btn.buttonText}
          buttonLink={btn.buttonLink}
          buttonBackground={btn.buttonBackground}
          width={btn.width}
          height={btn.height}
        />
      ))}
    </div>
  );
};

export default Menu;
