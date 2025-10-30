import React from 'react';
import AppLogo from '../../assets/app-logo.png';
import UserIcon from '../../assets/user-icon.png';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/userTypes';
import { Bell, Mail } from 'lucide-react';

interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  const user: User = JSON.parse(sessionStorage.getItem('user') || '{}');
  const profilePicture = user.profilePicture || UserIcon;
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/home');
  };

  const handleUserIconClick = () => {
    navigate('/profile');
  };

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between bg-white p-4 shadow-md mb-6">
      {/* Logo and title on the left */}
      <div className="flex items-center">
        <img
          className="w-20 h-20 rounded-full cursor-pointer"
          src={AppLogo}
          alt="Logo"
          onClick={handleLogoClick}
        />
        <h1 className="text-xl font-bold">Super Snake</h1>
      </div>
      <h2 className="text-lg font-semibold">{pageTitle}</h2>

      {/* future user icon */}
      <div className="flex items-center space-x-4">
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
};

export default Header;

// const Header = forwardRef<HTMLDivElement, HeaderProps>(({ pageTitle }, ref) => (
//   <header className="header" ref={ref}>
//     {/* Logo and title on the left */}
//     <div className="header__left">
//       <img className="header__logo" src={AppLogo} alt="Logo" />
//       <h1 className="header__title">Super Snake</h1>
//     </div>

//     <h2 className="header__page-title">{pageTitle}</h2>

//     {/* future user icon */}
//     <div className="header__right">
//       <img className="header__user-icon" src={UserIcon} alt="User Icon" />
//     </div>
//   </header>
// ));
