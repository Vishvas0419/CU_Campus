import { useEffect, useMemo, useState } from 'react';
import * as foodApi from '../api/foodApi';

export default function FoodPage() {
  const [outlets, setOutlets] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]); // [{item, qty}]
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    foodApi.getOutlets().then(setOutlets);
  }, []);

  useEffect(() => {
    if (!selectedOutlet) return;
    setCart([]);
    foodApi.getOutletItems(selectedOutlet.id).then(setItems);
  }, [selectedOutlet]);

  const total = useMemo(() => {
    return cart.reduce((sum, c) => sum + Number(c.item.price) * c.qty, 0);
  }, [cart]);

  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find((x) => x.item.id === item.id);
      if (existing) return prev.map((x) => x.item.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { item, qty: 1 }];
    });
  }

  async function placeOrder() {
    setMsg(null);
    const payload = {
      outletId: selectedOutlet.id,
      items: cart.map((c) => ({ itemId: c.item.id, quantity: c.qty }))
    };
    const res = await foodApi.placeOrder(payload);
    setCart([]);
    setMsg(`Order placed (#${res.id}), total ₹${res.totalAmount}`);
  }

  return (
    <div>
      <h3>Food Ordering</h3>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="fw-semibold mb-2">Outlets</div>
              {outlets.length === 0 ? (
                <div className="text-muted">No outlets configured.</div>
              ) : (
                <div className="list-group">
                  {outlets.map((o) => (
                    <button
                      key={o.id}
                      className={`list-group-item list-group-item-action ${selectedOutlet?.id === o.id ? 'active' : ''}`}
                      onClick={() => setSelectedOutlet(o)}
                    >
                      {o.name}
                      {o.location ? <div className="small opacity-75">{o.location}</div> : null}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <div className="fw-semibold mb-2">Menu</div>
              {!selectedOutlet ? (
                <div className="text-muted">Select an outlet.</div>
              ) : items.length === 0 ? (
                <div className="text-muted">No items configured for this outlet.</div>
              ) : (
                <div className="list-group">
                  {items.map((i) => (
                    <div key={i.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-semibold">{i.name}</div>
                        <div className="small text-muted">₹{i.price}</div>
                      </div>
                      <button className="btn btn-outline-primary btn-sm" onClick={() => addToCart(i)}>Add</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <div className="fw-semibold mb-2">Cart</div>
              {cart.length === 0 ? (
                <div className="text-muted">Cart is empty.</div>
              ) : (
                <>
                  <ul className="list-group mb-2">
                    {cart.map((c) => (
                      <li key={c.item.id} className="list-group-item d-flex justify-content-between">
                        <div>
                          <div className="fw-semibold">{c.item.name}</div>
                          <div className="small text-muted">{c.qty} × ₹{c.item.price}</div>
                        </div>
                        <div className="fw-semibold">₹{Number(c.item.price) * c.qty}</div>
                      </li>
                    ))}
                  </ul>
                  <div className="d-flex justify-content-between mb-2">
                    <div className="fw-semibold">Total</div>
                    <div className="fw-semibold">₹{total}</div>
                  </div>
                  <button className="btn btn-success w-100" onClick={placeOrder}>Place order</button>
                </>
              )}
              {msg && <div className="alert alert-success py-2 mt-3">{msg}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

