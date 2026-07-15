import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { login, googleLogin } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then(() => {
        toast.success('Logged in successfully');
        navigate(from, { replace: true });
      })
      .catch(() => setError('Invalid email or password.'));
  };

  const handleGoogle = () => {
    googleLogin()
      .then(() => {
        toast.success('Logged in with Google');
        navigate(from, { replace: true });
      })
      .catch(() => setError('Google login failed.'));
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6">
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass w-full max-w-md rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Welcome Back</h2>
        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
        <label className="block text-sm mb-1 text-gray-400">Email</label>
        <input name="email" type="email" required className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none" />
        <label className="block text-sm mb-1 text-gray-400">Password</label>
        <input name="password" type="password" required className="w-full mb-6 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none" />
        <button type="submit" className="btn-primary w-full py-3 rounded-xl font-semibold">Login</button>

        <div className="flex items-center gap-3 my-6">
          <span className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-gray-500">OR</span>
          <span className="flex-1 h-px bg-white/10" />
        </div>

        <button type="button" onClick={handleGoogle} className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-white/10 hover:border-secondary transition cursor-hover">
          <FcGoogle className="text-xl" /> Continue with Google
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          New here? <Link to="/register" className="text-secondary link-underline">Create an account</Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
