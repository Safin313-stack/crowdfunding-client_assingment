import { useEffect, useState } from 'react';
import { FiUsers, FiUserCheck, FiCreditCard, FiTrendingUp } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import StatCard from '../../components/StatCard';

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({});
  const [pendingCampaigns, setPendingCampaigns] = useState([]);

  const load = () => {
    axiosSecure.get('/admin/stats').then((res) => setStats(res.data));
    axiosSecure.get('/admin/campaigns/pending').then((res) => setPendingCampaigns(res.data));
  };
  useEffect(load, []);

  const handleStatus = async (id, status) => {
    await axiosSecure.patch(`/admin/campaigns/${id}/status`, { status });
    toast.success(`Campaign ${status}`);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard label="Total Supporters" value={stats.totalSupporters ?? '-'} icon={<FiUsers />} />
        <StatCard label="Total Creators" value={stats.totalCreators ?? '-'} icon={<FiUserCheck />} />
        <StatCard label="Total Credits" value={stats.totalCredits ?? '-'} icon={<FiCreditCard />} />
        <StatCard label="Payments Processed" value={stats.totalPayments ?? '-'} icon={<FiTrendingUp />} />
      </div>

      <h2 className="text-xl font-semibold mb-4">Campaign Approvals</h2>
      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-white/10">
              <th className="p-4">Title</th>
              <th className="p-4">Creator</th>
              <th className="p-4">Goal</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingCampaigns.map((c) => (
              <tr key={c._id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="p-4">{c.campaign_title}</td>
                <td className="p-4">{c.creator_name}</td>
                <td className="p-4">{c.funding_goal}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleStatus(c._id, 'approved')} className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs cursor-hover">Approve</button>
                  <button onClick={() => handleStatus(c._id, 'rejected')} className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs cursor-hover">Reject</button>
                </td>
              </tr>
            ))}
            {pendingCampaigns.length === 0 && (
              <tr><td colSpan={4} className="p-6 text-center text-gray-500">No pending campaigns.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
