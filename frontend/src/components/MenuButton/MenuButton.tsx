import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MenuButtonProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonBackground: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  buttonBackground,
}) => {
  const navigate = useNavigate();
  const [backgroundStyle, setBackgroundStyle] = useState<React.CSSProperties>(
    {}
  );

  useEffect(() => {
    const img = new Image();
    img.src = buttonBackground;

    img.onload = () => {
      setBackgroundStyle({
        backgroundImage: `url(${buttonBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      });
    };

    img.onerror = () => {
      const testEl = document.createElement('div');
      testEl.style.color = buttonBackground;
      if (testEl.style.color) {
        setBackgroundStyle({ backgroundColor: buttonBackground });
      } else {
        setBackgroundStyle({ backgroundColor: '#888' });
      }
    };
  }, [buttonBackground]);

  const handleClick = () => {
    navigate(buttonLink, { state: { title } });
  };

  return (
    <div
      className="flex flex-col justify-between p-6 rounded-lg shadow-lg cursor-pointer text-white"
      style={backgroundStyle}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-300">{description}</p>
      <div className="font-medium">{buttonText}</div>
    </div>
  );
};

export default MenuButton;
