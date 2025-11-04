import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { login as loginApi } from '../services/api';
import { UserLogin } from '../types/userTypes';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth(); // get login function from context

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier || !password) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    const userLogin: UserLogin = { identifier, password };

    try {
      const response = await loginApi(userLogin);

      if (response.ok) {
        // update context and sessionStorage
        authLogin(response.data);

        // navigate to home
        navigate('/home', { replace: true });
      } else {
        alert(response.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Header pageTitle="Login" />

      <div className="flex flex-col bg-white p-8 rounded shadow-md w-full max-w-md">
        <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
          <label className="font-medium text-gray-700" htmlFor="Identifier">
            Username or Email:
          </label>
          <input
            className="border border-gray-300 p-2 rounded"
            type="text"
            id="Identifier"
            name="Identifier"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <label className="font-medium text-gray-700" htmlFor="Password">
            Password:
          </label>
          <input
            className="border border-gray-300 p-2 rounded"
            type="password"
            id="Password"
            name="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <Link
          to="/register"
          className="text-gray-500 hover:underline hover:text-blue-500 mt-4 text-center"
        >
          Don’t have an account? Register here
        </Link>
      </div>
    </div>
  );
};

export default Login;
