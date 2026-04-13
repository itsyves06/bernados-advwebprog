import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses = 
  'mt-2 w-full rounded-xl border border-[#C5D9A4] bg-white px-4 py-3 text-sm text-[#4A5D3A] outline-none transition placeholder:text-[#8A9A73]/50 focus:border-[#4A5D3A] focus:ring-1 focus:ring-[#4A5D3A]';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em] transition-colors';

const SignInPage = () => {
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault(); 
    navigate('/'); 
  };

  return (
    <>
      <div className="mb-8 flex flex-col items-center">
        <h1 className="text-3xl font-black tracking-tight text-[#4A5D3A] sm:text-4xl">Welcome Back</h1>
        <p className="mt-3 text-center text-sm leading-6 text-[#6B7C5C]">
          Enter your details to access your <span className="font-bold text-[#8A9A73]">Modern Sanctuary.</span>
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleLogin}>
        <div>
          <label htmlFor="signin-email" className="text-sm font-bold uppercase tracking-wider text-[#4A5D3A]">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="nature@example.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signin-password" className="text-sm font-bold uppercase tracking-wider text-[#4A5D3A]">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            className={inputClasses}
          />
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-[#6B7C5C] cursor-pointer">
            <input 
              type="checkbox" 
              className="h-4 w-4 rounded border-[#C5D9A4] text-[#4A5D3A] focus:ring-[#4A5D3A]" 
            />
            <span>Remember me</span>
          </label>
          <button 
            type="button" 
            className="font-bold text-[#8A9A73] transition hover:text-[#4A5D3A]"
          >
            Forgot Password?
          </button>
        </div>

        <Button type="submit" className={`${actionButtonClassName} bg-[#4A5D3A] text-white hover:bg-[#3d4d30]`}>
          Log In
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" className={`${actionButtonClassName} border-2 border-[#C5D9A4] text-[#4A5D3A] hover:bg-[#F6F0D7]`}>
            Google
          </Button>
          <Button type="button" className={`${actionButtonClassName} border-2 border-[#C5D9A4] text-[#4A5D3A] hover:bg-[#F6F0D7]`}>
            Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-[#C5D9A4]/30 pt-6 text-sm text-[#6B7C5C] text-center">
        No account yet?{' '}
        <Link 
          to="/auth/signup" 
          className="font-bold text-[#4A5D3A] underline decoration-[#8A9A73] underline-offset-4 transition hover:text-[#8A9A73]"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;