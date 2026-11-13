import React, { useState } from 'react';
import { updateUser } from '../services/api';
import { User } from '../types/userTypes';

const PersonalData: React.FC = () => {
  const userWithToken = sessionStorage.getItem('user');
  const user: User = {
    firstName: JSON.parse(userWithToken || '{}').firstName,
    lastName: JSON.parse(userWithToken || '{}').lastName,
    username: JSON.parse(userWithToken || '{}').username,
    email: JSON.parse(userWithToken || '{}').email,
    profilePicture: JSON.parse(userWithToken || '{}').profilePicture,
    phone: JSON.parse(userWithToken || '{}').phone,
    dateOfBirth: JSON.parse(userWithToken || '{}').dateOfBirth,
    userType: JSON.parse(userWithToken || '{}').userType,
  };
  const token = JSON.parse(userWithToken || '{}').token;

  const [newFirstName, setNewFirstName] = useState(user ? user.firstName : '');
  const [newLastName, setNewLastName] = useState(user ? user.lastName : '');
  const [newUsername, setNewUsername] = useState(user ? user.username : '');
  const [newEmail, setNewEmail] = useState(user ? user.email : '');
  const [newDateOfBirth, setNewDateOfBirth] = useState(
    user ? user.dateOfBirth : ''
  );
  const [newPhone, setNewPhone] = useState(user ? user.phone : '');

  const handleUpdateProfile = () => {
    // Here you would typically send the updated data to the server
    const updatedUser: User = {
      ...user,
      firstName: newFirstName,
      lastName: newLastName,
      username: newUsername,
      email: newEmail,
      dateOfBirth: newDateOfBirth,
      phone: newPhone,
      userType: user.userType,
    };

    // For demonstration, we'll just log it and update sessionStorage
    const oldUsername = user.username;
    updateUser(oldUsername, updatedUser, token).then((response) => {
      if (response.ok) {
        alert('Profile updated successfully!');
        sessionStorage.setItem(
          'user',
          JSON.stringify({ ...updatedUser, token })
        );
      } else {
        alert(response.error);
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Personal Data</h2>
      {user ? (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">First Name:</label>
            <input
              type="text"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-md outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Last Name:</label>
            <input
              type="text"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-md outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Username:</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-md outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Email:</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-md outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Date of Birth:</label>
            <input
              type="date"
              value={newDateOfBirth}
              onChange={(e) => setNewDateOfBirth(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-md outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Phone:</label>
            <input
              type="tel"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-md outline-none focus:border-blue-500"
            />
          </div>

          <button
            className="self-start mt-2 px-3 py-2 bg-blue-500 text-white border-none rounded cursor-pointer hover:bg-blue-600 transition-colors"
            onClick={handleUpdateProfile}
          >
            Update Profile
          </button>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default PersonalData;