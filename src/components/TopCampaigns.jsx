import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { API_URL } from '../contexts/AuthContext';

const TopCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/campaigns/top`).then((res) => setCampaigns(res.data)).catch(() => {});
  }, []);

  return (
    <section className="px-6 md:px-12 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Top Funded Campaigns</h2>
      <p className="text-gray-400 text-center mb-12">Projects the community believed in most</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {campaigns.map((c, i) => (
          <motion.div
            key={c._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass rounded-2xl overflow-hidden tilt-card cursor-hover"
          >
            <img src={c.campaign_image_url} alt={c.campaign_title} className="h-48 w-full object-cover" />
            <div className="p-5">
              <h3 className="font-semibold text-lg mb-2">{c.campaign_title}</h3>
              <p className="text-secondary font-bold">{c.amount_raised} credits raised</p>
              <Link to={`/campaign/${c._id}`} className="link-underline text-sm text-primary mt-3 inline-block">View Details →</Link>
            </div>
          </motion.div>
        ))}
        {campaigns.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">No approved campaigns yet — be the first to launch one.</p>
        )}
      </div>
    </section>
  );
};

export default TopCampaigns;
