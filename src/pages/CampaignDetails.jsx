import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { API_URL } from '../contexts/AuthContext';

const CampaignDetails = () => {
  const { id } = useParams();
  const { user, role, credits, setCredits } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/campaigns/${id}`).then((res) => setCampaign(res.data)).catch(() => {});
  }, [id]);

  const handleContribute = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('Please login to contribute.');
    if (role !== 'supporter') return toast.error('Only supporters can contribute.');

    const value = Number(amount);
    if (!value || value < campaign.minimum_Contribution) {
      return toast.error(`Minimum contribution is ${campaign.minimum_Contribution} credits.`);
    }
    if (value > credits) return toast.error('Insufficient credits.');

    try {
      setSubmitting(true);
      await axiosSecure.post('/contributions', {
        campaign_id: campaign._id,
        campaign_title: campaign.campaign_title,
        Contribution_amount: value,
        Supporter_email: user.email,
        Supporter_name: user.displayName,
        creator_name: campaign.creator_name,
        creator_email: campaign.creator_email,
      });
      // optimistic local credit deduction; source of truth is DB
      setCredits((prev) => prev - value);
      toast.success('Contribution submitted! Awaiting creator approval.');
      setAmount('');
    } catch {
      toast.error('Failed to contribute. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!campaign) {
    return <div className="min-h-[70vh] flex items-center justify-center"><span className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="px-6 md:px-12 py-16 max-w-5xl mx-auto">
      <motion.img
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        src={campaign.campaign_image_url} alt={campaign.campaign_title}
        className="w-full h-80 object-cover rounded-3xl mb-8"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <span className="text-xs uppercase tracking-wider text-secondary">{campaign.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{campaign.campaign_title}</h1>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">{campaign.campaign_story}</p>
          <div className="glass rounded-2xl p-5 mt-8">
            <h3 className="font-semibold mb-2">Reward</h3>
            <p className="text-gray-400">{campaign.reward_info}</p>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 h-fit">
          <p className="text-sm text-gray-400 mb-1">by {campaign.creator_name}</p>
          <p className="text-2xl font-bold text-secondary mb-1">{campaign.amount_raised || 0} credits</p>
          <p className="text-sm text-gray-400 mb-4">raised of {campaign.funding_goal} goal</p>
          <div className="w-full bg-white/10 rounded-full h-2 mb-6">
            <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: `${Math.min(100, ((campaign.amount_raised || 0) / campaign.funding_goal) * 100)}%` }} />
          </div>
          <p className="text-sm text-gray-400 mb-6">Deadline: {campaign.deadline}</p>

          {user ? (
            role === 'supporter' ? (
              <form onSubmit={handleContribute} className="space-y-3">
                <input
                  type="number"
                  min={campaign.minimum_Contribution}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`Min ${campaign.minimum_Contribution} credits`}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none"
                  required
                />
                <button disabled={submitting} className="btn-primary w-full py-3 rounded-xl font-semibold disabled:opacity-50">
                  {submitting ? 'Submitting...' : 'Contribute'}
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    const reason = prompt('Why are you reporting this campaign?');
                    if (!reason) return;
                    await axiosSecure.post('/reports', {
                      campaign_id: campaign._id,
                      campaign_title: campaign.campaign_title,
                      reporter_name: user.displayName,
                      reporter_email: user.email,
                      reason,
                    });
                    toast.success('Report submitted to admin.');
                  }}
                  className="w-full text-xs text-gray-500 hover:text-red-400 transition"
                >
                  Report this campaign
                </button>
              </form>
            ) : (
              <p className="text-sm text-gray-500 text-center">Only supporter accounts can contribute.</p>
            )
          ) : (
            <Link to="/login" className="btn-primary w-full block text-center py-3 rounded-xl font-semibold">Login to Contribute</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
