import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const WithdrawalRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  const load = () => axiosSecure.get('/admin/withdrawals/pending').then((res) => setRequests(res.data));
  useEffect(load, []);

  const handleApprove = async (id) => {
    await axiosSecure.patch(`/admin/withdrawals/${id}/approve`);
    toast.success('Payment marked as success.');
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Withdrawal Requests</h1>
      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-white/10">
              <th className="p-4">Creator</th>
              <th className="p-4">Credits</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Payment System</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((w) => (
              <tr key={w._id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="p-4">{w.creator_name}</td>
                <td className="p-4">{w.withdrawal_credit}</td>
                <td className="p-4 text-secondary font-semibold">${w.withdrawal_amount}</td>
                <td className="p-4">{w.payment_system}</td>
                <td className="p-4">
                  <button onClick={() => handleApprove(w._id)} className="btn-primary px-4 py-1 rounded-full text-xs">Payment Success</button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr><td colSpan={5} className="p-6 text-center text-gray-500">No pending withdrawal requests.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawalRequests;
