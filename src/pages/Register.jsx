import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import { API_URL } from '../contexts/AuthContext';

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

const passwordValid = (pw) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/.test(pw);

const Register = () => {
  const { register, googleLogin, updateUserProfile } = useAuth();
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const saveUserToDb = async (user, role) => {
    await axios.post(`${API_URL}/users`, {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      role,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const imageFile = form.photo.files[0];

    if (!passwordValid(password)) {
      return setError('Password needs an uppercase, a lowercase letter, and at least 6 characters.');
    }

    try {
      setUploading(true);
      let photoURL = '';
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData);
        photoURL = res.data.data.display_url;
      }

      const result = await register(email, password);
      await updateUserProfile(name, photoURL);
      await saveUserToDb({ displayName: name, email, photoURL }, role);

      toast.success('Account created! Please log in.');
      navigate('/login');
    } catch (err) {
      setError(err.message.includes('email-already-in-use') ? 'This email is already registered.' : 'Registration failed. Try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await googleLogin();
      await saveUserToDb(result.user, 'supporter');
      toast.success('Account created with Google');
      navigate('/dashboard');
    } catch {
      setError('Google sign up failed.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-10">
      <motion.form
        onSubmit={handleRegister}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass w-full max-w-md rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Create Account</h2>
        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <label className="block text-sm mb-1 text-gray-400">Full Name</label>
        <input name="name" required className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none" />

        <label className="block text-sm mb-1 text-gray-400">Email</label>
        <input name="email" type="email" required className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none" />

        <label className="block text-sm mb-1 text-gray-400">Profile Picture</label>
        <input name="photo" type="file" accept="image/*" className="w-full mb-4 text-sm text-gray-400" />

        <label className="block text-sm mb-1 text-gray-400">Password</label>
        <input name="password" type="password" required className="w-full mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none" />

        <label className="block text-sm mb-1 text-gray-400">Register As</label>
        <select name="role" className="w-full mb-6 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none">
          <option value="supporter">Supporter (get 50 credits)</option>
          <option value="creator">Creator (get 20 credits)</option>
        </select>

        <button type="submit" disabled={uploading} className="btn-primary w-full py-3 rounded-xl font-semibold disabled:opacity-50">
          {uploading ? 'Creating...' : 'Register'}
        </button>

        <div className="flex items-center gap-3 my-6">
          <span className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-gray-500">OR</span>
          <span className="flex-1 h-px bg-white/10" />
        </div>

        <button type="button" onClick={handleGoogle} className="w-full py-3 rounded-xl border border-white/10 hover:border-secondary transition cursor-hover">
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account? <Link to="/login" className="text-secondary link-underline">Login</Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Register;
