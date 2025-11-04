import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Logout: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return <></>;
};

export default Logout;
