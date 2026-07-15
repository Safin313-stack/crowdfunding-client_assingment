import { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const googleLogin = () => signInWithPopup(auth, googleProvider);
  const logOut = () => {
    localStorage.removeItem('access-token');
    return signOut(auth);
  };
  const updateUserProfile = (name, photo) => updateProfile(auth.currentUser, { displayName: name, photoURL: photo });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        // fetch jwt
        const { data } = await axios.post(`${API_URL}/jwt`, { email: currentUser.email });
        localStorage.setItem('access-token', data.token);
        // fetch role + credits
        const res = await axios.get(`${API_URL}/users/role/${currentUser.email}`, {
          headers: { authorization: `Bearer ${data.token}` },
        });
        setRole(res.data.role);
        setCredits(res.data.credits);
      } else {
        localStorage.removeItem('access-token');
        setRole(null);
        setCredits(0);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user, role, credits, loading, setLoading, setCredits,
    register, login, googleLogin, logOut, updateUserProfile,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
