import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SupporterPaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/payments/${user.email}`).then((res) => setPayments(res.data));
  }, [user.email]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Payment History</h1>
      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-white/10">
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Credits</th>
              <th className="p-4">Price</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="p-4">{p.transactionId}</td>
                <td className="p-4 text-secondary font-semibold">{p.credits}</td>
                <td className="p-4">${p.price}</td>
                <td className="p-4">{new Date(p.date).toLocaleDateString()}</td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr><td colSpan={4} className="p-6 text-center text-gray-500">No payments yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupporterPaymentHistory;
