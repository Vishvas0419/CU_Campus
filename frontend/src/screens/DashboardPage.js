import { Link } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <div>
      <h3>Dashboard</h3>
      <p className="text-muted">Welcome to CU Campus portal.</p>
      <div className="row g-3">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Complaints</h5>
              <p className="card-text">Raise and track complaints.</p>
              <Link className="btn btn-primary btn-sm" to="/complaints">Open</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Gate Pass</h5>
              <p className="card-text">Request and track gate passes.</p>
              <Link className="btn btn-primary btn-sm" to="/gatepass">Open</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Mess</h5>
              <p className="card-text">View mess menu.</p>
              <Link className="btn btn-primary btn-sm" to="/mess">Open</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Food</h5>
              <p className="card-text">Order from campus outlets.</p>
              <Link className="btn btn-primary btn-sm" to="/food">Open</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

