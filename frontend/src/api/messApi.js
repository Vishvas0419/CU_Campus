import axiosClient from './axiosClient';

export async function getTodayMenu() {
  const res = await axiosClient.get('/api/mess/menu/today');
  return res.data;
}

export async function getMenuByDate(date) {
  const res = await axiosClient.get('/api/mess/menu', { params: { date } });
  return res.data;
}

