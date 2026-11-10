import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { register } from '../services/api';
import { UserRegistration } from '../types/userTypes';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const userRegister: UserRegistration = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    register(userRegister).then((response) => {
      if (response.ok) {
        navigate('/login');
      } else {
        alert(response.error);
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 pt-30">
      <Header pageTitle="Register" />

      <div className="flex flex-col bg-white p-8 rounded shadow-md w-full max-w-md">
        <form className="flex flex-col space-y-4" onSubmit={handleRegister}>
          <label className="font-medium text-gray-700" htmlFor="FirstName">
            First Name:
          </label>
          <input
            className="border border-gray-300 p-2 rounded"
            type="text"
            id="FirstName"
            name="FirstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="font-medium text-gray-700" htmlFor="LastName">
            Last Name:
          </label>
          <input
            className="border border-gray-300 p-2 rounded"
            type="text"
            id="LastName"
            name="LastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="font-medium text-gray-700" htmlFor="username">
            Username:
          </label>
          <input
            className="border border-gray-300 p-2 rounded"
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="font-medium text-gray-700" htmlFor="email">
            Email:
          </label>
          <input
            className="border border-gray-300 p-2 rounded"
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="font-medium text-gray-700" htmlFor="password">
            Password:
          </label>
          <input
            className="border border-gray-300 p-2 rounded"
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label
            className="font-medium text-gray-700"
            htmlFor="confirmPassword"
          >
            Confirm Password:
          </label>
          <input
            className="border border-gray-300 p-2 rounded"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded cursor-pointer"
          >
            Register
          </button>
        </form>

        <Link
          to="/login"
          className="text-gray-500 hover:underline hover:text-blue-500 mt-4 text-center"
        >
          Already have an account? Login here
        </Link>
      </div>
    </div>
  );
};

export default Register;
