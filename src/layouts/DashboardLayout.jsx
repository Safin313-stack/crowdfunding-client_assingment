import { NavLink, Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiX, FiHome } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';

const navByRole = {
  supporter: [
    { to: '/dashboard/supporter-home', label: 'Home' },
    { to: '/dashboard/explore', label: 'Explore Campaigns' },
    { to: '/dashboard/my-contributions', label: 'My Contributions' },
    { to: '/dashboard/purchase-credit', label: 'Purchase Credit' },
    { to: '/dashboard/payment-history', label: 'Payment History' },
  ],
  creator: [
    { to: '/dashboard/creator-home', label: 'Home' },
    { to: '/dashboard/add-campaign', label: 'Add New Campaign' },
    { to: '/dashboard/my-campaigns', label: 'My Campaigns' },
    { to: '/dashboard/withdrawals', label: 'Withdrawals' },
    { to: '/dashboard/payment-history', label: 'Payment History' },
  ],
  admin: [
    { to: '/dashboard/admin-home', label: 'Home' },
    { to: '/dashboard/manage-users', label: 'Manage Users' },
    { to: '/dashboard/manage-campaigns', label: 'Manage Campaigns' },
    { to: '/dashboard/withdrawal-requests', label: 'Withdrawal Requests' },
    { to: '/dashboard/reports', label: 'Reports' },
  ],
};

const DashboardLayout = () => {
  const { user, role, credits } = useAuth();
  const [open, setOpen] = useState(false);
  const links = navByRole[role] || [];

  return (
    <div className="min-h-screen flex bg-dark">
      {/* sidebar */}
      <aside className={`fixed md:static z-40 top-0 left-0 h-full w-64 glass p-6 flex flex-col gap-2 transition-transform ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <Link to="/" className="text-xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">FundRise</Link>
        <div className="flex items-center gap-3 mb-6 glass rounded-xl p-3">
          <img src={user?.photoURL || 'https://i.ibb.co/2n1s5m4/avatar.png'} className="w-10 h-10 rounded-full object-cover" alt="" />
          <div>
            <p className="text-sm font-semibold capitalize">{role}</p>
            <p className="text-xs text-gray-400">{user?.displayName}</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-4">Available Credits: <span className="text-secondary font-semibold">{credits}</span></p>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            onClick={() => setOpen(false)}
            className={({ isActive }) => `px-4 py-2 rounded-xl text-sm transition cursor-hover ${isActive ? 'btn-primary font-medium' : 'hover:bg-white/5 text-gray-300'}`}
          >
            {l.label}
          </NavLink>
        ))}
        <Link to="/" className="mt-auto flex items-center gap-2 text-sm text-gray-400 hover:text-secondary transition">
          <FiHome /> Back to Site
        </Link>
      </aside>

      <button className="md:hidden fixed top-4 right-4 z-50 glass p-2 rounded-full" onClick={() => setOpen(!open)}>
        {open ? <FiX /> : <FiMenu />}
      </button>

      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
