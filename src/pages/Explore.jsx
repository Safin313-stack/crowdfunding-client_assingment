import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { API_URL } from '../contexts/AuthContext';

const categories = ['All', 'Technology', 'Art', 'Community', 'Health'];

const Explore = () => {
  const [params, setParams] = useSearchParams();
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState('');
  const category = params.get('category') || 'All';

  useEffect(() => {
    const query = {};
    if (category !== 'All') query.category = category;
    if (search) query.search = search;
    axios.get(`${API_URL}/campaigns`, { params: query }).then((res) => setCampaigns(res.data)).catch(() => {});
  }, [category, search]);

  return (
    <div className="px-6 md:px-12 py-16 min-h-[70vh]">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Explore Campaigns</h1>

      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-10">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search campaigns..."
          className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none w-full md:w-80"
        />
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setParams(c === 'All' ? {} : { category: c })}
              className={`px-4 py-2 rounded-full text-sm cursor-hover transition ${category === c ? 'btn-primary' : 'glass hover:border-secondary'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {campaigns.map((c, i) => (
          <motion.div
            key={c._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 6) * 0.08 }}
            className="glass rounded-2xl overflow-hidden tilt-card cursor-hover flex flex-col"
          >
            <img src={c.campaign_image_url} alt={c.campaign_title} className="h-44 w-full object-cover" />
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-semibold text-lg mb-1">{c.campaign_title}</h3>
              <p className="text-sm text-gray-400 mb-1">by {c.creator_name}</p>
              <p className="text-sm text-gray-400 mb-3">Deadline: {c.deadline}</p>
              <div className="w-full bg-white/10 rounded-full h-2 mb-3">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                  style={{ width: `${Math.min(100, ((c.amount_raised || 0) / c.funding_goal) * 100)}%` }}
                />
              </div>
              <p className="text-sm text-secondary font-semibold mb-4">{c.amount_raised || 0} / {c.funding_goal} credits</p>
              <Link to={`/campaign/${c._id}`} className="btn-primary mt-auto text-center py-2 rounded-xl font-medium">View Details</Link>
            </div>
          </motion.div>
        ))}
        {campaigns.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">No campaigns found.</p>
        )}
      </div>
    </div>
  );
};

export default Explore;
