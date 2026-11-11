import React from 'react';
import Header from '../components/Header';
import Inventory from '../components/Inventory';

const Shop: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 pt-24 font-mono">
      <Header pageTitle="Shop & Inventory" />
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl">
        <Inventory />
      </div>
    </div>
  );
};

export default Shop;
