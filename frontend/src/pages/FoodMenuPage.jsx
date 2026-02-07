import React, { useEffect, useMemo, useState } from 'react';
import styles from './FoodMenuPage.module.css';
import { getOutlets, getOutletItems, placeOrder } from '../api/foodApi';
import { dummyOutlets, dummyItemsByOutlet, findOutletByNameLike } from '../data/foodData';
import { setCurrentOrder, pushHistory } from '../store/orderStore';
import { useNavigate } from 'react-router-dom';

export default function FoodMenuPage({ preferredOutletName }) {
  const navigate = useNavigate();
  const [outlets, setOutlets] = useState([]);
  const [selectedOutletId, setSelectedOutletId] = useState('');
  const [items, setItems] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        let data = [];
        try {
          data = await getOutlets();
        } catch (_) { /* ignore API failure */ }
        if (!data || data.length === 0) {
          data = dummyOutlets;
        }
        setOutlets(data || []);
        if (data && data.length > 0) {
          let initial = data[0];
          if (preferredOutletName) {
            const found = data.find(o => (o.name || '').toLowerCase().includes(preferredOutletName.toLowerCase()));
            if (found) initial = found;
            else {
              const fallback = findOutletByNameLike(preferredOutletName);
              if (fallback) initial = fallback;
            }
          }
          setSelectedOutletId(String(initial.id));
        }
      } catch (e) {
        setMessage('Failed to load outlets');
      }
    })();
  }, []);

useEffect(() => {
  if (!selectedOutletId) return;

  setLoading(true);
  setMessage('');

  try {
    const data = dummyItemsByOutlet[Number(selectedOutletId)] || [];
    setItems(data);
    setCounts({});
  } catch (e) {
    setMessage('Failed to load items');
  } finally {
    setLoading(false);
  }

}, [selectedOutletId]);


  const totalCount = useMemo(() => Object.values(counts).reduce((a, b) => a + (b || 0), 0), [counts]);

  const inc = (id) => setCounts((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const dec = (id) => setCounts((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) - 1) }));

  const onViewBill = async () => {
    const itemsToOrder = Object.entries(counts)
      .filter(([, qty]) => qty > 0)
      .map(([itemId, qty]) => ({ itemId: Number(itemId), quantity: qty }));

    if (!selectedOutletId || itemsToOrder.length === 0) {
      setMessage('No items added to order.');
      return;
    }
    try {
      setLoading(true);
      setMessage('');
      let apiOrder = null;
      try {
        apiOrder = await placeOrder({ outletId: Number(selectedOutletId), items: itemsToOrder });
      } catch (_) { /* allow local fallback */ }

      const outlet = outlets.find(o => String(o.id) === String(selectedOutletId)) || {};
      const enrichedItems = itemsToOrder.map(({ itemId, quantity }) => {
        const meta = items.find(i => Number(i.id) === Number(itemId)) || {};
        const priceEach = Number(meta.price || 0);
        return {
          itemId,
          name: meta.name,
          priceEach,
          quantity,
          lineTotal: priceEach * quantity,
        };
      });
      const totalAmount = enrichedItems.reduce((acc, it) => acc + it.lineTotal, 0);
      const order = {
        id: apiOrder?.id || Date.now(),
        outletId: Number(selectedOutletId),
        outletName: outlet.name,
        items: enrichedItems,
        totalAmount,
        createdAt: apiOrder?.createdAt || new Date().toISOString(),
      };

      setCurrentOrder(order);
      pushHistory(order);
      setCounts({});
      navigate('/food/bill');
    } catch (e) {
      setMessage('Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <img src="https://logodix.com/logo/395941.png" width="300" height="200" alt="Grab & Go Logo" />
        <h1 className={styles.menuText}>MENU</h1>
      </header>

      <main className="container">
        <div className="barista">
          <div className={styles.outletSelect}>
            <select
              className="form-select"
              value={selectedOutletId}
              onChange={(e) => setSelectedOutletId(e.target.value)}
            >
              {outlets.map((o) => (
                <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </select>
          </div>

          {message && <p>{message}</p>}
          {loading && <p>Loading...</p>}

          <ul className="list-group menu-items">
            {items.map((item) => {
              const qty = counts[item.id] || 0;
              return (
                <li key={item.id} className={styles.menuItem}>
                  <div className="d-flex align-items-center">
                    <img src={item.imageUrl} alt={item.name} className={styles.coffeeImage} />
                    <div>
                      <h5>{item.name}</h5>
                      <p className="mb-0">₹{Number(item.price).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className={styles.itemControls}>
                    {qty > 0 && (
                      <button className="btn btn-danger btn-sm" onClick={() => dec(item.id)}>-</button>
                    )}
                    <span className={styles.itemCount}>{qty > 0 ? `x ${qty}` : ''}</span>
                    <button className="btn btn-danger btn-sm" onClick={() => inc(item.id)}>Add +</button>
                  </div>
                </li>
              );
            })}
          </ul>

          <button id="view-bill-btn" className={styles.viewBillBtn} onClick={onViewBill} disabled={loading || totalCount === 0}>
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </main>
    </div>
  );
}
