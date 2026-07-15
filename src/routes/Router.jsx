import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Explore from '../pages/Explore';
import CampaignDetails from '../pages/CampaignDetails';
import ErrorPage from '../pages/ErrorPage';
import PrivateRoute from './PrivateRoute';
import RoleRoute from './RoleRoute';
import DashboardRedirect from '../dashboard/DashboardRedirect';
import useAuth from '../hooks/useAuth';

import SupporterHome from '../dashboard/Supporter/SupporterHome';
import MyContributions from '../dashboard/Supporter/MyContributions';
import PurchaseCredit from '../dashboard/Supporter/PurchaseCredit';
import SupporterPaymentHistory from '../dashboard/Supporter/SupporterPaymentHistory';

import CreatorHome from '../dashboard/Creator/CreatorHome';
import AddCampaign from '../dashboard/Creator/AddCampaign';
import MyCampaigns from '../dashboard/Creator/MyCampaigns';
import Withdrawals from '../dashboard/Creator/Withdrawals';
import CreatorPaymentHistory from '../dashboard/Creator/CreatorPaymentHistory';

import AdminHome from '../dashboard/Admin/AdminHome';
import ManageUsers from '../dashboard/Admin/ManageUsers';
import ManageCampaigns from '../dashboard/Admin/ManageCampaigns';
import WithdrawalRequests from '../dashboard/Admin/WithdrawalRequests';
import Reports from '../dashboard/Admin/Reports';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'explore', element: <Explore /> },
      { path: 'campaign/:id', element: <CampaignDetails /> },
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardRedirect /> },

      { path: 'explore', element: <Explore /> },
      { path: 'supporter-home', element: <RoleRoute allowed={['supporter']}><SupporterHome /></RoleRoute> },
      { path: 'my-contributions', element: <RoleRoute allowed={['supporter']}><MyContributions /></RoleRoute> },
      { path: 'purchase-credit', element: <RoleRoute allowed={['supporter']}><PurchaseCredit /></RoleRoute> },

      { path: 'creator-home', element: <RoleRoute allowed={['creator']}><CreatorHome /></RoleRoute> },
      { path: 'add-campaign', element: <RoleRoute allowed={['creator']}><AddCampaign /></RoleRoute> },
      { path: 'my-campaigns', element: <RoleRoute allowed={['creator']}><MyCampaigns /></RoleRoute> },
      { path: 'withdrawals', element: <RoleRoute allowed={['creator']}><Withdrawals /></RoleRoute> },

      { path: 'payment-history', element: (
        <RoleRoute allowed={['supporter', 'creator']}>
          <PaymentHistorySwitch />
        </RoleRoute>
      ) },

      { path: 'admin-home', element: <RoleRoute allowed={['admin']}><AdminHome /></RoleRoute> },
      { path: 'manage-users', element: <RoleRoute allowed={['admin']}><ManageUsers /></RoleRoute> },
      { path: 'manage-campaigns', element: <RoleRoute allowed={['admin']}><ManageCampaigns /></RoleRoute> },
      { path: 'withdrawal-requests', element: <RoleRoute allowed={['admin']}><WithdrawalRequests /></RoleRoute> },
      { path: 'reports', element: <RoleRoute allowed={['admin']}><Reports /></RoleRoute> },
    ],
  },
]);

// renders the right payment-history component depending on logged-in role
function PaymentHistorySwitch() {
  const { role } = useAuth();
  return role === 'creator' ? <CreatorPaymentHistory /> : <SupporterPaymentHistory />;
}

export default router;
