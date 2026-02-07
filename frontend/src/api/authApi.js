import axiosClient from './axiosClient';

export async function login(payload) {
  const res = await axiosClient.post('/api/auth/login', payload);
  return res.data;
}

export async function register(payload) {
  const res = await axiosClient.post('/api/auth/register', payload);
  return res.data;
}

export async function getMe() {
  const res = await axiosClient.get('/api/user/me');
  return res.data;
}

export async function updateMe(payload) {
  const res = await axiosClient.put('/api/user/me', payload);
  return res.data;
}

