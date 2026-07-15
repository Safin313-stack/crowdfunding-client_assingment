import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  { name: 'Amelia Ross', photo: 'https://randomuser.me/api/portraits/women/44.jpg', quote: 'FundRise helped me launch my art collective in days. The dashboard makes tracking pledges effortless.' },
  { name: 'Daniel Chowdhury', photo: 'https://randomuser.me/api/portraits/men/32.jpg', quote: 'As a supporter, I love seeing exactly where my credits go. Transparent and simple.' },
  { name: 'Priya Nair', photo: 'https://randomuser.me/api/portraits/women/68.jpg', quote: 'Withdrew my first payout within a week of hitting the goal. Smooth process end to end.' },
  { name: 'Marcus Lee', photo: 'https://randomuser.me/api/portraits/men/12.jpg', quote: 'Best crowdfunding UI I have used. The notification system keeps me in the loop always.' },
];

const Testimonials = () => (
  <section className="px-6 md:px-12 py-20 bg-surface/40">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Community Says</h2>
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3500 }}
      pagination={{ clickable: true }}
      loop
      slidesPerView={1}
      breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      spaceBetween={24}
      className="pb-12"
    >
      {testimonials.map((t, i) => (
        <SwiperSlide key={i}>
          <div className="glass rounded-2xl p-6 h-full tilt-card cursor-hover">
            <div className="flex items-center gap-4 mb-4">
              <img src={t.photo} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-secondary" />
              <h4 className="font-semibold">{t.name}</h4>
            </div>
            <p className="text-gray-300 italic">"{t.quote}"</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

export default Testimonials;
