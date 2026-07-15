import { useEffect, useState } from 'react';
import { FiFolder, FiActivity, FiDollarSign } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import StatCard from '../../components/StatCard';

const CreatorHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [campaigns, setCampaigns] = useState([]);
  const [pending, setPending] = useState([]);
  const [modalItem, setModalItem] = useState(null);

  const load = () => {
    axiosSecure.get(`/campaigns/creator/${user.email}`).then((res) => setCampaigns(res.data));
    axiosSecure.get(`/contributions/creator/${user.email}?status=pending`).then((res) => setPending(res.data));
  };

  useEffect(load, [user.email]);

  const activeCampaigns = campaigns.filter((c) => new Date(c.deadline) >= new Date()).length;
  const totalRaised = campaigns.reduce((sum, c) => sum + (c.amount_raised || 0), 0);

  const handleAction = async (id, status) => {
    try {
      await axiosSecure.patch(`/contributions/${id}/status`, { status });
      toast.success(`Contribution ${status}`);
      load();
    } catch {
      toast.error('Action failed.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome back, {user.displayName?.split(' ')[0]}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <StatCard label="Total Campaigns" value={campaigns.length} icon={<FiFolder />} />
        <StatCard label="Active Campaigns" value={activeCampaigns} icon={<FiActivity />} />
        <StatCard label="Total Raised" value={`${totalRaised} credits`} icon={<FiDollarSign />} />
      </div>

      <h2 className="text-xl font-semibold mb-4">Contributions To Review</h2>
      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-white/10">
              <th className="p-4">Supporter</th>
              <th className="p-4">Campaign</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Details</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {pending.map((c) => (
              <tr key={c._id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="p-4">{c.Supporter_name}</td>
                <td className="p-4">{c.campaign_title}</td>
                <td className="p-4 text-secondary font-semibold">{c.Contribution_amount}</td>
                <td className="p-4">
                  <button onClick={() => setModalItem(c)} className="text-primary link-underline">View</button>
                </td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleAction(c._id, 'approved')} className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs cursor-hover">Approve</button>
                  <button onClick={() => handleAction(c._id, 'rejected')} className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs cursor-hover">Reject</button>
                </td>
              </tr>
            ))}
            {pending.length === 0 && (
              <tr><td colSpan={5} className="p-6 text-center text-gray-500">No pending contributions.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {modalItem && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-6" onClick={() => setModalItem(null)}>
          <div className="glass rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-3">Contribution Detail</h3>
            <p className="text-gray-300"><b>Supporter:</b> {modalItem.Supporter_name}</p>
            <p className="text-gray-300"><b>Campaign:</b> {modalItem.campaign_title}</p>
            <p className="text-gray-300"><b>Amount:</b> {modalItem.Contribution_amount} credits</p>
            <p className="text-gray-300"><b>Date:</b> {new Date(modalItem.current_date).toLocaleString()}</p>
            <button onClick={() => setModalItem(null)} className="btn-primary w-full mt-6 py-2 rounded-xl">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorHome;
