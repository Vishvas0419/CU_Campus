const KEY_CURRENT = 'food_current_order';
const KEY_HISTORY = 'food_orders_history';

export function setCurrentOrder(order) {
  try { localStorage.setItem(KEY_CURRENT, JSON.stringify(order)); } catch {}
}
export function getCurrentOrder() {
  try { const s = localStorage.getItem(KEY_CURRENT); return s ? JSON.parse(s) : null; } catch { return null; }
}
export function clearCurrentOrder() {
  try { localStorage.removeItem(KEY_CURRENT); } catch {}
}
export function pushHistory(order) {
  try {
    const s = localStorage.getItem(KEY_HISTORY);
    const arr = s ? JSON.parse(s) : [];
    arr.unshift(order);
    localStorage.setItem(KEY_HISTORY, JSON.stringify(arr));
  } catch {}
}
export function getHistory() {
  try { const s = localStorage.getItem(KEY_HISTORY); return s ? JSON.parse(s) : []; } catch { return []; }
}
