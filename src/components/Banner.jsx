import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const slides = [
  {
    title: 'Fund Ideas That Move the World',
    subtitle: 'Back bold creators. Watch small credits grow into big change.',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600',
  },
  {
    title: 'Launch Your Campaign in Minutes',
    subtitle: 'From concept to funded — tools built for modern creators.',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600',
  },
  {
    title: 'Community-Powered Progress',
    subtitle: 'Every contribution, big or small, moves a project forward.',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600',
  },
];

const Banner = () => (
  <Swiper
    modules={[Autoplay, EffectFade]}
    effect="fade"
    autoplay={{ delay: 4500 }}
    loop
    className="h-[70vh] rounded-b-[3rem] overflow-hidden"
  >
    {slides.map((s, i) => (
      <SwiperSlide key={i}>
        <div className="relative h-full w-full">
          <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/30" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-6xl font-bold max-w-3xl leading-tight"
            >
              {s.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-300 mt-4 max-w-xl"
            >
              {s.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link to="/explore" className="btn-primary inline-block mt-8 px-8 py-3 rounded-full font-semibold">
                Explore Campaigns
              </Link>
            </motion.div>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);

export default Banner;
