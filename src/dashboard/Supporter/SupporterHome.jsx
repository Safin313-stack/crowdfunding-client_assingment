import { useEffect, useState } from 'react';
import { FiHeart, FiClock, FiDollarSign } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import StatCard from '../../components/StatCard';

const SupporterHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/contributions/supporter/${user.email}?limit=1000`).then((res) => setContributions(res.data.list));
  }, [user.email]);

  const total = contributions.length;
  const pending = contributions.filter((c) => c.status === 'pending').length;
  const approvedList = contributions.filter((c) => c.status === 'approved');
  const totalAmount = approvedList.reduce((sum, c) => sum + c.Contribution_amount, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome back, {user.displayName?.split(' ')[0]}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <StatCard label="Total Contributions" value={total} icon={<FiHeart />} />
        <StatCard label="Pending Contributions" value={pending} icon={<FiClock />} />
        <StatCard label="Total Amount Contributed" value={`${totalAmount} credits`} icon={<FiDollarSign />} />
      </div>

      <h2 className="text-xl font-semibold mb-4">Approved Contributions</h2>
      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-white/10">
              <th className="p-4">Campaign</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Creator</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {approvedList.map((c) => (
              <tr key={c._id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="p-4">{c.campaign_title}</td>
                <td className="p-4 text-secondary font-semibold">{c.Contribution_amount}</td>
                <td className="p-4">{c.creator_name}</td>
                <td className="p-4"><span className="px-3 py-1 rounded-full text-xs bg-secondary/20 text-secondary">approved</span></td>
              </tr>
            ))}
            {approvedList.length === 0 && (
              <tr><td colSpan={4} className="p-6 text-center text-gray-500">No approved contributions yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupporterHome;
