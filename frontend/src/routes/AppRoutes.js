import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../layout/MainLayout';

import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';

import OptionsPage from '../pages/OptionsPage';
import ComplaintHistoryPage from '../pages/ComplaintHistoryPage';
import HostelComplaintPage from '../pages/HostelComplaintPage';
import MessComplaintPage from '../pages/MessComplaintPage';
import CampusComplaintPage from '../pages/CampusComplaintPage';
import Sq1ComplaintPage from '../pages/Sq1ComplaintPage';

import BaristaPage from '../pages/BaristaPage';
import SubwayPage from '../pages/SubwayPage';
import IndianPage from '../pages/IndianPage';
import GrabNGoPage from '../pages/GrabNGoPage';
import FoodBillPage from '../pages/FoodBillPage';
import GatePassPage from '../pages/GatePassPage';
import FoodHomePage from '../pages/FoodHomePage';
import FoodOrderHistoryPage from '../pages/FoodOrderHistoryPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/complaints/options" element={<OptionsPage />} />
        <Route path="/complaints/history" element={<ComplaintHistoryPage />} />
        <Route path="/complaints/hostel" element={<HostelComplaintPage />} />
        <Route path="/complaints/mess" element={<MessComplaintPage />} />
        <Route path="/complaints/campus" element={<CampusComplaintPage />} />
        <Route path="/complaints/sq1" element={<Sq1ComplaintPage />} />

        <Route path="/food" element={<FoodHomePage />} />
        <Route path="/food/barista" element={<BaristaPage />} />
        <Route path="/food/subway" element={<SubwayPage />} />
        <Route path="/food/indian" element={<IndianPage />} />
        <Route path="/food/grabngo" element={<GrabNGoPage />} />
        <Route path="/food/bill" element={<FoodBillPage />} />
        <Route path="/food/history" element={<FoodOrderHistoryPage />} />

        <Route path="/gatepass" element={<GatePassPage />} />
      </Route>
    </Routes>
  );
}

