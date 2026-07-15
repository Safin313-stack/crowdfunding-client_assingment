import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const DashboardRedirect = () => {
  const { role, loading } = useAuth();
  if (loading) return null;
  if (role === 'admin') return <Navigate to="/dashboard/admin-home" replace />;
  if (role === 'creator') return <Navigate to="/dashboard/creator-home" replace />;
  return <Navigate to="/dashboard/supporter-home" replace />;
};

export default DashboardRedirect;
