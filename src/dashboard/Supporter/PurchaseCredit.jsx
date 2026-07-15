import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const packages = [
  { credits: 100, price: 10 },
  { credits: 300, price: 25 },
  { credits: 800, price: 60 },
  { credits: 1500, price: 110 },
];

const PurchaseCredit = () => {
  const { user, setCredits } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [processing, setProcessing] = useState(null);

  // NOTE: For a production Stripe flow, use @stripe/react-stripe-js <CardElement>
  // and confirm the PaymentIntent client secret returned from /create-payment-intent.
  // This handler demonstrates the full data flow with a simplified confirm step.
  const handlePurchase = async (pkg) => {
    setProcessing(pkg.credits);
    try {
      await axiosSecure.post('/create-payment-intent', { price: pkg.price });
      // In production: collect card details via Stripe Elements here, then confirm.
      const transactionId = `TXN-${Date.now()}`;
      await axiosSecure.post('/payments', {
        email: user.email,
        price: pkg.price,
        credits: pkg.credits,
        transactionId,
        date: new Date(),
      });
      setCredits((prev) => prev + pkg.credits);
      toast.success(`${pkg.credits} credits added!`);
    } catch {
      toast.error('Payment failed. Try again.');
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Purchase Credit</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((p) => (
          <motion.div
            key={p.credits}
            whileHover={{ y: -6 }}
            className="glass rounded-2xl p-6 text-center cursor-hover"
          >
            <p className="text-3xl font-bold text-secondary mb-2">{p.credits}</p>
            <p className="text-gray-400 mb-4">credits</p>
            <p className="text-xl font-semibold mb-6">${p.price}</p>
            <button
              onClick={() => handlePurchase(p)}
              disabled={processing === p.credits}
              className="btn-primary w-full py-2 rounded-xl font-medium disabled:opacity-50"
            >
              {processing === p.credits ? 'Processing...' : 'Buy Now'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseCredit;
