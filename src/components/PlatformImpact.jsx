import { motion } from 'framer-motion';

const stats = [
  { value: '1,200+', label: 'Campaigns Launched' },
  { value: '38,000+', label: 'Contributions Made' },
  { value: '$420K+', label: 'Total Funds Raised' },
  { value: '95%', label: 'Supporter Satisfaction' },
];

const PlatformImpact = () => (
  <section className="px-6 md:px-12 py-20">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Platform Impact in Numbers</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <p className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{s.value}</p>
          <p className="text-gray-400 mt-2">{s.label}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default PlatformImpact;
