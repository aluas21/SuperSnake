import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuButton.css';

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
      className="menu-button-card"
      style={backgroundStyle}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="menu-button-label">{buttonText}</div>
    </div>
  );
};

export default MenuButton;
