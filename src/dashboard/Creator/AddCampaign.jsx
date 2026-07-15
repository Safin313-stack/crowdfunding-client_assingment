import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

const AddCampaign = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const imageFile = form.campaign_image.files[0];

    try {
      setUploading(true);
      let campaign_image_url = '';
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData);
        campaign_image_url = res.data.data.display_url;
      }

      const campaign = {
        campaign_title: form.campaign_title.value,
        campaign_story: form.campaign_story.value,
        category: form.category.value,
        funding_goal: Number(form.funding_goal.value),
        minimum_Contribution: Number(form.minimum_Contribution.value),
        deadline: form.deadline.value,
        reward_info: form.reward_info.value,
        campaign_image_url,
        creator_name: user.displayName,
        creator_email: user.email,
      };

      await axiosSecure.post('/campaigns', campaign);
      toast.success('Campaign submitted for admin approval!');
      navigate('/dashboard/my-campaigns');
    } catch {
      toast.error('Failed to add campaign.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Campaign</h1>
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
        <input name="campaign_title" placeholder="Campaign Title" required className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none md:col-span-2" />
        <textarea name="campaign_story" placeholder="Campaign Story" required rows={4} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none md:col-span-2" />
        <select name="category" required className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none">
          <option value="">Category</option>
          <option>Technology</option>
          <option>Art</option>
          <option>Community</option>
          <option>Health</option>
        </select>
        <input name="deadline" type="date" required className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none" />
        <input name="funding_goal" type="number" placeholder="Funding Goal (credits)" required className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none" />
        <input name="minimum_Contribution" type="number" placeholder="Minimum Contribution" required className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none" />
        <input name="reward_info" placeholder="Reward Info" required className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none md:col-span-2" />
        <input name="campaign_image" type="file" accept="image/*" className="md:col-span-2 text-sm text-gray-400" />
        <button disabled={uploading} className="btn-primary md:col-span-2 py-3 rounded-xl font-semibold disabled:opacity-50">
          {uploading ? 'Submitting...' : 'Add Campaign'}
        </button>
      </form>
    </div>
  );
};

export default AddCampaign;
