import axios from 'axios';
import { UserRegistration } from '../types/userTypes';
import { UserLogin } from '../types/userTypes';
import { User } from '../types/userTypes';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const register = async (user: UserRegistration) => {
  try {
    const response = await api.post('/auth/register', user);
    return { ok: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const messageError = error.response?.data?.error || 'An error occurred';
      return { ok: false, error: messageError };
    } else {
      return { ok: false, error: 'An unexpected error occurred' };
    }
  }
};

export const login = async (user: UserLogin) => {
  try {
    const response = await api.post('/auth/login', user);
    return { ok: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const messageError = error.response?.data?.error || 'An error occurred';
      return { ok: false, error: messageError };
    } else {
      return { ok: false, error: 'An unexpected error occurred' };
    }
  }
};

export const changeProfilePicture = async (
  username: string,
  base64Image: string,
  token: string
) => {
  try {
    const response = await api.put(
      `/users/${username}/profile-picture`,
      base64Image,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { ok: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const messageError = error.response?.data?.error || 'An error occurred';
      return { ok: false, error: messageError };
    } else {
      return { ok: false, error: 'An unexpected error occurred' };
    }
  }
};

export const updateUser = async (
  oldUsername: string,
  newUser: User,
  token: string
) => {
  try {
    console.log('Updating user:', oldUsername, newUser, token);
    const response = await api.put(`/users/${oldUsername}`, newUser, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return { ok: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const messageError = error.response?.data?.error || 'An error occurred';
      return { ok: false, error: messageError };
    } else {
      return { ok: false, error: 'An unexpected error occurred' };
    }
  }
};
