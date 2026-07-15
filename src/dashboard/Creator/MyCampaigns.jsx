import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const statusColor = { pending: 'bg-yellow-500/20 text-yellow-400', approved: 'bg-secondary/20 text-secondary', rejected: 'bg-red-500/20 text-red-400' };

const MyCampaigns = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [campaigns, setCampaigns] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = () => axiosSecure.get(`/campaigns/creator/${user.email}`).then((res) => setCampaigns(res.data));
  useEffect(load, [user.email]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this campaign? Approved supporters will be refunded.')) return;
    await axiosSecure.delete(`/campaigns/${id}`);
    toast.success('Campaign deleted, supporters refunded.');
    load();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    await axiosSecure.patch(`/campaigns/${editing._id}`, {
      campaign_title: form.campaign_title.value,
      campaign_story: form.campaign_story.value,
      reward_info: form.reward_info.value,
    });
    toast.success('Campaign updated.');
    setEditing(null);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Campaigns</h1>
      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-white/10">
              <th className="p-4">Title</th>
              <th className="p-4">Deadline</th>
              <th className="p-4">Raised / Goal</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c._id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="p-4">{c.campaign_title}</td>
                <td className="p-4">{c.deadline}</td>
                <td className="p-4">{c.amount_raised || 0} / {c.funding_goal}</td>
                <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs ${statusColor[c.status]}`}>{c.status}</span></td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => setEditing(c)} className="px-3 py-1 rounded-full glass text-xs cursor-hover hover:border-secondary">Update</button>
                  <button onClick={() => handleDelete(c._id)} className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs cursor-hover">Delete</button>
                </td>
              </tr>
            ))}
            {campaigns.length === 0 && (
              <tr><td colSpan={5} className="p-6 text-center text-gray-500">No campaigns yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-6" onClick={() => setEditing(null)}>
          <form onSubmit={handleUpdate} className="glass rounded-2xl p-6 max-w-md w-full space-y-3" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">Update Campaign</h3>
            <input name="campaign_title" defaultValue={editing.campaign_title} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none" />
            <textarea name="campaign_story" defaultValue={editing.campaign_story} rows={3} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none" />
            <input name="reward_info" defaultValue={editing.reward_info} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none" />
            <button className="btn-primary w-full py-2 rounded-xl font-semibold">Save Changes</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyCampaigns;
