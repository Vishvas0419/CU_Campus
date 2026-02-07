import axiosClient from './axiosClient';

export async function getOutlets() {
  const res = await axiosClient.get('/api/food/outlets');
  return res.data;
}

export async function getOutletItems(outletId) {
  const res = await axiosClient.get(`/api/food/outlets/${outletId}/items`);
  return res.data;
}

export async function placeOrder(payload) {
  const res = await axiosClient.post('/api/food/orders', payload);
  return res.data;
}

export async function getMyOrders() {
  const res = await axiosClient.get('/api/food/orders/my');
  return res.data;
}

