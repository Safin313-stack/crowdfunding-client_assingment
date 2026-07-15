import Banner from '../components/Banner';
import TopCampaigns from '../components/TopCampaigns';
import Testimonials from '../components/Testimonials';
import HowItWorks from '../components/HowItWorks';
import ExploreByCategory from '../components/ExploreByCategory';
import PlatformImpact from '../components/PlatformImpact';

const Home = () => (
  <div className="bg-grid-glow">
    <Banner />
    <TopCampaigns />
    <HowItWorks />
    <ExploreByCategory />
    <PlatformImpact />
    <Testimonials />
  </div>
);

export default Home;
