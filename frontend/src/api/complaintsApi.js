import axiosClient from './axiosClient';

export async function getCategories() {
  const res = await axiosClient.get('/api/complaints/categories');
  return res.data;
}

export async function createComplaint(payload) {
  const res = await axiosClient.post('/api/complaints', payload);
  return res.data;
}

export async function getMyComplaints() {
  const res = await axiosClient.get('/api/complaints/my');
  return res.data;
}

