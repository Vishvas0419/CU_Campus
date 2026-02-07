import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as complaintsApi from '../api/complaintsApi';

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    complaintsApi.getMyComplaints().then(setComplaints);
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3>My Complaints</h3>
        <Link className="btn btn-primary btn-sm" to="/complaints/new">New complaint</Link>
      </div>
      <div className="mt-3">
        {complaints.length === 0 ? (
          <div className="text-muted">No complaints yet.</div>
        ) : (
          <div className="list-group">
            {complaints.map((c) => (
              <div key={c.id} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="fw-semibold">{c.title}</div>
                    <div className="small text-muted">{c.categoryName}</div>
                  </div>
                  <span className="badge bg-secondary align-self-start">{c.status}</span>
                </div>
                <div className="mt-2">{c.description}</div>
                <div className="small text-muted mt-2">Created: {new Date(c.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

