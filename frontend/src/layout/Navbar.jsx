import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">CU Campus</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
          <Link className="nav-link" to="/complaints/options">Complaints</Link>
          <Link className="nav-link" to="/food">Food</Link>
          <Link className="nav-link" to="/food/history">Order History</Link>
          <Link className="nav-link" to="/gatepass">Gatepass</Link>
          <Link className="nav-link" to="/profile">Profile</Link>
        </div>
        <div className="d-flex align-items-center gap-2 text-white">
          <span className="small">{user ? user.username : ''}</span>
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
