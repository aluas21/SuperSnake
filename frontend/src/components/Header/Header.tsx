import React from 'react';
import './Header.css';
import AppLogo from '../../assets/app-logo.png';
import UserIcon from '../../assets/user-icon.png';

interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  return (
    <header className="header">
      <div className="header__left">
        <img className="header__logo" src={AppLogo} alt="Logo" />
        <h1 className="header__title">Super Snake</h1>
      </div>

      <h2 className="header__page-title">{pageTitle}</h2>

      {/* future user icon */}
      <div className="header__right">
        <img className="header__user-icon" src={UserIcon} alt="User Icon" />
      </div>
    </header>
  );
};

export default Header;
