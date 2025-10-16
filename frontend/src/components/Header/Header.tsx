import React, { forwardRef, use } from 'react';
import './Header.css';
import AppLogo from '../../assets/app-logo.png';
import UserIcon from '../../assets/user-icon.png';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/userTypes';

interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  const user: User = JSON.parse(sessionStorage.getItem("user") || "{}");
  const profilePicture = user.profilePicture || UserIcon;
  const navigate = useNavigate(); 

  const handleLogoClick = () => {
    navigate('/home');
  };

  const handleUserIconClick = () => {
    navigate('/profile');
  };

  return (
    <header className="header">
     {/* Logo and title on the left */}
     <div className="header__left">
       <img className="header__logo" src={AppLogo} alt="Logo" onClick={handleLogoClick} />
       <h1 className="header__title">Super Snake</h1>
     </div>
     <h2 className="header__page-title">{pageTitle}</h2>

     {/* future user icon */}
     <div className="header__right">
       <img className="header__user-icon" src={profilePicture} alt="User Icon" onClick={handleUserIconClick} />
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
