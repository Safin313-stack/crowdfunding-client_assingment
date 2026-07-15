import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
    <motion.h1
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-8xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
    >
      404
    </motion.h1>
    <p className="text-gray-400 mt-4 mb-8">This page wandered off the funding trail.</p>
    <Link to="/" className="btn-primary px-6 py-3 rounded-full font-semibold">Back to Home</Link>
  </div>
);

export default ErrorPage;
