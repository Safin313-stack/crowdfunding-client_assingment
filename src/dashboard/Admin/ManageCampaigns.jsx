import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const statusColor = { pending: 'bg-yellow-500/20 text-yellow-400', approved: 'bg-secondary/20 text-secondary', rejected: 'bg-red-500/20 text-red-400' };

const ManageCampaigns = () => {
  const axiosSecure = useAxiosSecure();
  const [campaigns, setCampaigns] = useState([]);

  const load = () => axiosSecure.get('/admin/campaigns').then((res) => setCampaigns(res.data));
  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this campaign? Approved supporters will be refunded.')) return;
    await axiosSecure.delete(`/campaigns/${id}`);
    toast.success('Campaign deleted.');
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Campaigns</h1>
      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-white/10">
              <th className="p-4">Title</th>
              <th className="p-4">Creator</th>
              <th className="p-4">Raised / Goal</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c._id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="p-4">{c.campaign_title}</td>
                <td className="p-4">{c.creator_name}</td>
                <td className="p-4">{c.amount_raised || 0} / {c.funding_goal}</td>
                <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs ${statusColor[c.status]}`}>{c.status}</span></td>
                <td className="p-4">
                  <button onClick={() => handleDelete(c._id)} className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs cursor-hover">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCampaigns;
