import { Outlet } from 'react-router-dom';
import logoImg from '../../assets/logo.png';

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-[#F6F0D7] text-[#4A5D3A]">
      <div className="grid min-h-screen w-full lg:grid-cols-[1.1fr_0.9fr]">
        
        {/* LEFT SIDE: Branding Panel */}
        <div className="flex items-center justify-center border-b-2 border-[#C5D9A4] bg-[#F6F0D7] p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:border-[#C5D9A4] lg:p-16">
          <div className="flex flex-col items-center justify-center text-center">
            
            {/* Big Logo */}
            <img 
              src={logoImg} 
              alt="Plantlife Logo" 
              className="h-64 w-64 object-contain mb-6" 
            />

            {/* Web Name */}
            <h2 className="text-5xl font-black tracking-tighter text-[#4A5D3A]">
              PLANT<span className="text-[#8A9A73]">LIFE</span>
            </h2>

            {/* Tagline */}
            <p className="mt-2 text-lg font-medium text-[#8A9A73] tracking-wide uppercase">
              Your Modern Botanical Journey
            </p>

          </div>
        </div>

        {/* RIGHT SIDE: Form Area */}
        <main className="flex items-center bg-white px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;