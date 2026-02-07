import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <main className="container mt-4">
        <Outlet />
      </main>
    </div>
  );
}

