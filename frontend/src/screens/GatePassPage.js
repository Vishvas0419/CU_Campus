import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as gatepassApi from '../api/gatepassApi';

export default function GatePassPage() {
  const [passes, setPasses] = useState([]);

  useEffect(() => {
    gatepassApi.getMyGatePasses().then(setPasses);
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3>Gate Pass</h3>
        <Link className="btn btn-primary btn-sm" to="/gatepass/new">New request</Link>
      </div>
      <div className="mt-3">
        {passes.length === 0 ? (
          <div className="text-muted">No gate pass requests yet.</div>
        ) : (
          <div className="list-group">
            {passes.map((p) => (
              <div key={p.id} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <div className="fw-semibold">{p.reason}</div>
                  <span className="badge bg-secondary">{p.status}</span>
                </div>
                <div className="small text-muted mt-1">
                  From: {new Date(p.fromDatetime).toLocaleString()} | To: {new Date(p.toDatetime).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

