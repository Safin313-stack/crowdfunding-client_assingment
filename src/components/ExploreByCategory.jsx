import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Technology', emoji: '💡' },
  { name: 'Art', emoji: '🎨' },
  { name: 'Community', emoji: '🤝' },
  { name: 'Health', emoji: '🏥' },
];

const ExploreByCategory = () => (
  <section className="px-6 md:px-12 py-20 bg-surface/40">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Explore by Category</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {categories.map((c, i) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
        >
          <Link
            to={`/explore?category=${c.name}`}
            className="glass rounded-2xl p-8 flex flex-col items-center gap-3 tilt-card cursor-hover"
          >
            <span className="text-4xl">{c.emoji}</span>
            <span className="font-semibold">{c.name}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  </section>
);

export default ExploreByCategory;
