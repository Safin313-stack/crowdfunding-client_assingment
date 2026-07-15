import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const statusColor = { pending: 'bg-yellow-500/20 text-yellow-400', approved: 'bg-secondary/20 text-secondary' };

const CreatorPaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/withdrawals/creator/${user.email}`).then((res) => setWithdrawals(res.data));
  }, [user.email]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Payment History</h1>
      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-white/10">
              <th className="p-4">Credits</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Payment System</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((w) => (
              <tr key={w._id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="p-4">{w.withdrawal_credit}</td>
                <td className="p-4 text-secondary font-semibold">${w.withdrawal_amount}</td>
                <td className="p-4">{w.payment_system}</td>
                <td className="p-4">{new Date(w.withdraw_date).toLocaleDateString()}</td>
                <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs ${statusColor[w.status]}`}>{w.status}</span></td>
              </tr>
            ))}
            {withdrawals.length === 0 && (
              <tr><td colSpan={5} className="p-6 text-center text-gray-500">No withdrawals yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreatorPaymentHistory;
