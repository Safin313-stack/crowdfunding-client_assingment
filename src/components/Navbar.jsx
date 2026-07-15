import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiX, FiBell } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const GITHUB_CLIENT_REPO = 'https://github.com/your-username/crowdfunding-client';

const Navbar = () => {
  const { user, credits, logOut } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logOut().then(() => toast.success('Logged out'));
  };

  const navLink = ({ isActive }) =>
    `link-underline transition-colors ${isActive ? 'text-secondary' : 'text-gray-200 hover:text-secondary'}`;

  return (
    <nav className="sticky top-0 z-50 glass px-6 md:px-12 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        FundRise
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <NavLink to="/explore" className={navLink}>Explore Campaigns</NavLink>
        {user ? (
          <>
            <NavLink to="/dashboard" className={navLink}>Dashboard</NavLink>
            <span className="text-secondary font-semibold">{credits} Credits</span>
            <FiBell className="text-xl cursor-hover hover:text-secondary transition" />
            <img src={user.photoURL || 'https://i.ibb.co/2n1s5m4/avatar.png'} alt="" className="w-9 h-9 rounded-full border-2 border-primary object-cover" />
            <button onClick={handleLogout} className="btn-primary px-4 py-2 rounded-full text-sm font-medium">Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={navLink}>Login</NavLink>
            <Link to="/register" className="btn-primary px-4 py-2 rounded-full text-sm font-medium">Register</Link>
          </>
        )}
        <a href={GITHUB_CLIENT_REPO} target="_blank" rel="noreferrer" className="text-sm text-gray-400 hover:text-secondary transition">Join as Developer</a>
      </div>

      <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
        {open ? <FiX /> : <FiMenu />}
      </button>

      {open && (
        <div className="absolute top-full left-0 w-full glass flex flex-col items-center gap-4 py-6 md:hidden">
          <NavLink to="/explore" onClick={() => setOpen(false)}>Explore Campaigns</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" onClick={() => setOpen(false)}>Dashboard</NavLink>
              <span className="text-secondary">{credits} Credits</span>
              <button onClick={handleLogout} className="btn-primary px-4 py-2 rounded-full">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setOpen(false)}>Login</NavLink>
              <NavLink to="/register" onClick={() => setOpen(false)}>Register</NavLink>
            </>
          )}
          <a href={GITHUB_CLIENT_REPO} target="_blank" rel="noreferrer">Join as Developer</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
