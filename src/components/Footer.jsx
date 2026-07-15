import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer = () => (
  <footer className="glass mt-24 px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
    <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">FundRise</span>
    <p className="text-sm text-gray-400">© {new Date().getFullYear()} FundRise. Fund the future, one credit at a time.</p>
    <div className="flex gap-5 text-xl">
      <a href="https://github.com/your-username" target="_blank" rel="noreferrer" className="hover:text-secondary transition"><FaGithub /></a>
      <a href="https://linkedin.com/in/your-username" target="_blank" rel="noreferrer" className="hover:text-secondary transition"><FaLinkedin /></a>
      <a href="https://facebook.com/your-username" target="_blank" rel="noreferrer" className="hover:text-secondary transition"><FaFacebook /></a>
    </div>
  </footer>
);

export default Footer;
