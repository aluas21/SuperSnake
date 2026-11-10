import React, { forwardRef } from 'react';
import AppLogo from '../assets/app-logo.png';
import UserIcon from '../assets/user-icon.png';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/userTypes';
import { Bell, Mail } from 'lucide-react';

export interface HeaderProps {
  pageTitle: string;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(({ pageTitle }, ref) => {
  const user: User | null = JSON.parse(
    sessionStorage.getItem('user') || 'null'
  );
  const profilePicture = user?.profilePicture || UserIcon;
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (user === null) {
      navigate('/login');
    } else {
      navigate('/home');
    }
  };

  const handleUserIconClick = () => {
    if (user === null) {
      return;
    } else {
      navigate('/profile');
    }
  };

  return (
    <header
      ref={ref}
      className="fixed top-0 left-0 w-full flex items-center justify-between bg-white p-4 shadow-md z-10 box-border h-16"
    >
      {/* Left: Logo & game name */}
      <div className="flex items-center w-[15vw] min-w-[150px]">
        <img
          className="w-12 h-12 rounded-full cursor-pointer mr-2"
          src={AppLogo}
          alt="Logo"
          onClick={handleLogoClick}
        />
        <span className="font-bold text-lg">Super Snake</span>
      </div>

      {/* Center: Page title */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h2 className="text-xl font-semibold text-center">{pageTitle}</h2>
      </div>

      {/* Right: Icons */}
      <div
        className={`flex items-center space-x-4 w-[15vw] min-w-[150px] justify-end ${
          user ? '' : 'invisible pointer-events-none'
        }`}
      >
        <Bell className="text-gray-500 hover:text-blue-500" size={32} />
        <Mail className="text-gray-500 hover:text-blue-500" size={32} />
        <img
          className="w-10 h-10 rounded-full cursor-pointer"
          src={profilePicture}
          alt="User Icon"
          onClick={handleUserIconClick}
        />
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
