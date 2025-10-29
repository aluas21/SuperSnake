import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Login.css';
import { login as loginApi } from '../../services/api';
import { UserLogin } from '../../types/userTypes';
import { useAuth } from '../../components/Routes/AuthContext';

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
        // ✅ update context and sessionStorage
        authLogin(response.data);

        // ✅ navigate to home
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
    <div className="login">
      <Header pageTitle="Login" />

      <div className="login__container">
        <form className="login__form" onSubmit={handleLogin}>
          <label htmlFor="Identifier">Username or Email:</label>
          <input
            type="text"
            id="Identifier"
            name="Identifier"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <label htmlFor="Password">Password:</label>
          <input
            type="password"
            id="Password"
            name="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login__button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <Link to="/register" className="login__register-link">
          Don’t have an account? Register here
        </Link>
      </div>
    </div>
  );
};

export default Login;
