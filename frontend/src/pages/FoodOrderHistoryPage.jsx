import React, { useEffect, useState } from 'react';
import { getMyOrders } from '../api/foodApi';
import { getHistory, setCurrentOrder } from '../store/orderStore';
import { Link, useNavigate } from 'react-router-dom';

export default function FoodOrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        let data = [];
        try {
          data = await getMyOrders();
        } catch (_) { /* fallback to local */ }
        if (!data || data.length === 0) {
          data = getHistory();
        } else {
          // Normalize possible API shape to our local shape minimally if needed
          data = data.map((o) => ({
            id: o.id,
            outletId: o.outletId,
            outletName: o.outletName,
            items: o.items || [],
            totalAmount: o.totalAmount,
            createdAt: o.createdAt,
          }));
        }
        setOrders(data || []);
      } catch (e) {
        setError('Failed to load order history.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onViewBill = (order) => {
    setCurrentOrder(order);
    navigate('/food/bill');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container" style={{maxWidth: 900}}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="mb-0">Order History</h3>
        <Link to="/food" className="btn btn-outline-secondary btn-sm">Back to Food</Link>
      </div>
      {orders.length === 0 ? (
        <div className="alert alert-info">No orders yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Outlet</th>
                <th>Date</th>
                <th className="text-end">Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.outletName}</td>
                  <td>{o.createdAt ? new Date(o.createdAt).toLocaleString() : '-'}</td>
                  <td className="text-end">₹{Number(o.totalAmount || 0).toFixed(2)}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-primary" onClick={() => onViewBill(o)}>View Bill</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
