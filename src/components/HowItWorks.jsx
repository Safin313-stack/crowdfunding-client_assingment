import { motion } from 'framer-motion';
import { FiSearch, FiCreditCard, FiTrendingUp } from 'react-icons/fi';

const steps = [
  { icon: <FiSearch />, title: 'Discover', desc: 'Browse campaigns across categories that match your interests.' },
  { icon: <FiCreditCard />, title: 'Contribute', desc: 'Support projects instantly using platform credits.' },
  { icon: <FiTrendingUp />, title: 'Track Progress', desc: 'Follow updates and watch campaigns reach their goals.' },
];

const HowItWorks = () => (
  <section className="px-6 md:px-12 py-20">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {steps.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
          className="glass rounded-2xl p-8 text-center tilt-card cursor-hover"
        >
          <div className="text-4xl text-secondary mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 animate-float">
            {s.icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
          <p className="text-gray-400">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default HowItWorks;
