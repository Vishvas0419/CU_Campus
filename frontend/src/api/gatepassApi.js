import axiosClient from './axiosClient';

export async function createGatePass(payload) {
  const res = await axiosClient.post('/api/gatepass', payload);
  return res.data;
}

export async function getMyGatePasses() {
  const res = await axiosClient.get('/api/gatepass/my');
  return res.data;
}

