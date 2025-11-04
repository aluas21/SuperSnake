import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Logout: React.FC = () => {
  const { logout } = useContext(AuthContext)!;

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return <></>;
};

export default Logout;
