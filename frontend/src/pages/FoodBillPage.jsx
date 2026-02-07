import React, { useEffect, useMemo, useState } from 'react';
import { getCurrentOrder } from '../store/orderStore';
import { Link } from 'react-router-dom';

export default function FoodBillPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setOrder(getCurrentOrder());
  }, []);

  const total = useMemo(() => {
    if (!order?.items) return 0;
    // If backend provides totalAmount, prefer that
    if (order.totalAmount) return order.totalAmount;
    return order.items.reduce((acc, it) => acc + Number(it.priceEach || 0) * Number(it.quantity || 0), 0);
  }, [order]);

  if (!order) return (
    <div className="alert alert-info">
      No current order to display. Go to <Link to="/food">Food</Link> to place an order, or view your <Link to="/food/history">order history</Link>.
    </div>
  );

  return (
    <div className="container" style={{maxWidth: 720}}>
      <div className="card my-3">
        <div className="card-body">
          <h4 className="card-title">Order Summary</h4>
          <div className="mb-2 text-muted">Order #{order.id} · Outlet: {order.outletName}</div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th className="text-end">Qty</th>
                  <th className="text-end">Price</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((it) => (
                  <tr key={it.itemId}>
                    <td>{it.name}</td>
                    <td className="text-end">{it.quantity}</td>
                    <td className="text-end">₹{Number(it.priceEach || 0).toFixed(2)}</td>
                    <td className="text-end">₹{(Number(it.priceEach || 0) * Number(it.quantity || 0)).toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} className="text-end"><strong>Total</strong></td>
                  <td className="text-end"><strong>₹{Number(total).toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-2 small text-muted">Placed at: {order.createdAt ? new Date(order.createdAt).toLocaleString() : '-'}</div>
          <div className="mt-3">
            <Link to="/food/history" className="btn btn-outline-secondary btn-sm">View Order History</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
