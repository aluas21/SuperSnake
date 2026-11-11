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
      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-picture">
            <img src={profilePicture} alt="Profile picture" />
          </div>
          <button className="profile-action" onClick={handleFileSelection}>
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
            className="profile-action"
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
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleChangePassword}>Save</button>
          </Dialog>

          <Dialog
            isOpen={isSuccessDialogOpen}
            onClose={() => setIsSuccessDialogOpen(false)}
            title="Success"
          >
            <p>Password changed successfully!</p>
          </Dialog>
        </div>

        <div className="profile-main">
          <div className="profile-tabs">
            <button
              className={`profile-tab ${
                infoPanelName === 'Personal Data' ? 'active' : ''
              }`}
              onClick={() => setInfoPanelName('Personal Data')}
            >
              Personal Data
            </button>
            <button
              className={`profile-tab ${
                infoPanelName === 'Inventory' ? 'active' : ''
              }`}
              onClick={() => setInfoPanelName('Inventory')}
            >
              Inventory
            </button>
          </div>

          <div className="profile-panel">
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
