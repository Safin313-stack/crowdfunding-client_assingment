import { motion } from 'framer-motion';

const StatCard = ({ label, value, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass rounded-2xl p-6 tilt-card cursor-hover"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-3xl font-bold mt-1 text-secondary">{value}</p>
      </div>
      <span className="text-3xl text-primary">{icon}</span>
    </div>
  </motion.div>
);

export default StatCard;
