import { NavLink } from 'react-router-dom';
import logoImg from '../assets/logo.png';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-full',
    isActive
      ? 'bg-[#C5D9A4] text-[#4A5D3A] shadow-sm' 
      : 'text-[#6B7C5C] hover:bg-[#C5D9A4]/30 hover:text-[#4A5D3A]',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#C5D9A4]/30 bg-[#F6F0D7]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
      
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="overflow-hidden transition-transform group-hover:scale-105">
            <img 
              src={logoImg} 
              alt="PlantLife Logo" 
              className="h-8 w-auto object-contain" 
            />
          </div>
          <span className="text-xl font-black tracking-tighter text-[#4A5D3A]">
            PLANT<span className="text-[#8A9A73]">LIFE</span>
          </span>
        </NavLink>


        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

      
        <button className="flex flex-col gap-1 md:hidden group p-2">
          <span className="h-0.5 w-5 bg-[#4A5D3A] transition-all group-hover:w-6"></span>
          <span className="h-0.5 w-5 bg-[#4A5D3A]"></span>
        </button>
      </div>
    </header>
  );
};

export default NavBar;