import { useEffect, useState } from 'react';
import * as messApi from '../api/messApi';

export default function MessPage() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    messApi.getTodayMenu().then(setMenu);
  }, []);

  return (
    <div>
      <h3>Mess Menu (Today)</h3>
      {menu.length === 0 ? (
        <div className="text-muted mt-2">No menu configured for today.</div>
      ) : (
        <div className="row g-3 mt-1">
          {menu.map((m) => (
            <div key={m.id} className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <div className="fw-semibold">{m.mealType}</div>
                  <div className="text-muted small">{m.menuDate}</div>
                  <div className="mt-2">{m.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

