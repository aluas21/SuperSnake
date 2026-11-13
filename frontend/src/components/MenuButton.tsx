import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MenuButtonProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonBackground: string;
  width?: string;
  height?: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  buttonBackground,
  width = 'w-full',
  height = 'h-48',
}) => {
  const navigate = useNavigate();
  const [backgroundStyle, setBackgroundStyle] = useState<React.CSSProperties>({});
  const [backgroundClass, setBackgroundClass] = useState<string>('');

  useEffect(() => {
    if (buttonBackground.startsWith('bg-')) {
      setBackgroundClass(buttonBackground);
      return;
    }

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
    if (buttonLink === 'handleLogout') {
      console.log('Logout function called');
      return;
    }
    navigate(buttonLink, { state: { title } });
  };

  return (
    <div
      className={`flex flex-col justify-center items-center text-center p-6 rounded-lg shadow-lg cursor-pointer text-white transition-transform transform hover:scale-105 hover:shadow-2xl ${backgroundClass} ${width} ${height} mb-4`}
      style={backgroundClass ? {} : backgroundStyle}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <h2 className="text-xl font-bold break-words">{title}</h2>
      <p className="text-gray-300 text-base break-words my-2">{description}</p>
      <div className="text-lg font-semibold break-words">{buttonText}</div>
    </div>
  );
};

export default MenuButton;