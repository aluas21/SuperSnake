import React, { useRef, useState } from 'react';
import Header from '../components/Header';
import UserIcon from '../assets/user-icon.png';
import { UserWithToken } from '../types/userTypes';
import { changeProfilePicture, changePassword } from '../services/api';
import PersonalData from '../components/PersonalData';
import Inventory from '../components/Inventory';
import Dialog from '../components/DialogWindow';

const Profile: React.FC = () => {
  const user: UserWithToken = JSON.parse(
    sessionStorage.getItem('user') || '{}'
  );
  const profilePicture = user.profilePicture || UserIcon;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePictureChange = () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;

      user.profilePicture = base64String;
      sessionStorage.setItem('user', JSON.stringify(user));
      window.location.reload();

      changeProfilePicture(user.username, user.profilePicture, user.token).then(
        (response) => {
          if (response.ok) {
            console.log('Profile picture updated successfully');
          } else {
            alert(response.error);
          }
        }
      );
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelection = () => {
    fileInputRef.current?.click();
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert('Complete all fields!');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    changePassword(user.username, oldPassword, newPassword, user.token).then(
      (response) => {
        if (response.ok) {
          console.log('Password changed successfully');
          alert('Password changed successfully!');
        } else {
          alert(response.error);
          return;
        }
      }
    );

    clearDialog();
  };

  const clearDialog = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsDialogOpen(false);
    setIsSuccessDialogOpen(true);
  };

  const [infoPanelName, setInfoPanelName] = useState('Personal Data');

  return (
    <>
      <Header pageTitle="Profile" />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 h-screen p-8 box-border bg-[#f8f9fa] font-mono text-slate-700">
        <div className="flex flex-col items-center gap-4 bg-white rounded-2xl p-8 shadow-[0_0_10px_rgba(0,0,0,0.1)] h-fit">
          <div className="mb-2">
            <img 
              src={profilePicture} 
              alt="Profile picture" 
              className="w-32 h-32 rounded-full object-cover border-[3px] border-gray-500"
            />
          </div>
          <button 
            className="bg-gray-500 text-white border-none py-2.5 px-4 rounded-lg cursor-pointer font-bold hover:bg-green-400 hover:text-black transition-colors" 
            onClick={handleFileSelection}
          >
            Change Picture
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePictureChange}
            accept="image/*"
            style={{ display: 'none' }}
          />

          <button
            className="bg-gray-500 text-white border-none py-2.5 px-4 rounded-lg cursor-pointer font-bold hover:bg-green-400 hover:text-black transition-colors"
            onClick={() => setIsDialogOpen(true)}
          >
            Change Password
          </button>

          <Dialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            title="Change Password"
          >
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-2.5 mb-2.5 border border-gray-300 rounded-md outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2.5 mb-2.5 border border-gray-300 rounded-md outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2.5 mb-2.5 border border-gray-300 rounded-md outline-none focus:border-blue-500"
            />
            <button 
              onClick={handleChangePassword}
              className="bg-blue-500 text-white border-none rounded-md p-2.5 cursor-pointer w-full transition-colors hover:bg-blue-600 mt-2"
            >
              Save
            </button>
          </Dialog>

          <Dialog
            isOpen={isSuccessDialogOpen}
            onClose={() => setIsSuccessDialogOpen(false)}
            title="Success"
          >
            <p className="text-center">Password changed successfully!</p>
          </Dialog>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex gap-4 border-b border-gray-200 pb-2">
            <button
              className={`pb-2 px-2 font-bold border-b-2 transition-colors ${
                infoPanelName === 'Personal Data' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setInfoPanelName('Personal Data')}
            >
              Personal Data
            </button>
            <button
              className={`pb-2 px-2 font-bold border-b-2 transition-colors ${
                infoPanelName === 'Inventory' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setInfoPanelName('Inventory')}
            >
              Inventory
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-[0_0_10px_rgba(0,0,0,0.1)] overflow-y-auto">
            {infoPanelName === 'Personal Data' ? (
              <PersonalData />
            ) : (
              <Inventory />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;