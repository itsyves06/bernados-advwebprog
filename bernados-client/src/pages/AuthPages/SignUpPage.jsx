import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses = 
  'mt-2 w-full rounded-xl border border-[#C5D9A4] bg-white px-4 py-3 text-sm text-[#4A5D3A] outline-none transition placeholder:text-[#8A9A73]/50 focus:border-[#4A5D3A] focus:ring-1 focus:ring-[#4A5D3A]';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em] transition-colors';

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <>
      <div className="mb-8 flex flex-col items-center">
        <h1 className="text-3xl font-black tracking-tight text-[#4A5D3A] sm:text-4xl">Join the Journal</h1>
        <p className="mt-3 text-center text-sm leading-6 text-[#6B7C5C]">
          Create an account to start your <span className="font-bold text-[#8A9A73]">Botanical Journey.</span>
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSignUp}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-bold uppercase tracking-wider text-[#4A5D3A]">
              First Name
            </label>
            <input id="first-name" type="text" placeholder="Jane" className={inputClasses} />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-bold uppercase tracking-wider text-[#4A5D3A]">
              Last Name
            </label>
            <input id="last-name" type="text" placeholder="Doe" className={inputClasses} />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-bold uppercase tracking-wider text-[#4A5D3A]">
            Email
          </label>
          <input id="signup-email" type="email" placeholder="nature@example.com" className={inputClasses} />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-bold uppercase tracking-wider text-[#4A5D3A]">
            Password
          </label>
          <input id="signup-password" type="password" placeholder="••••••••" className={inputClasses} />
          <p className="mt-2 text-[10px] font-medium text-[#8A9A73]">
            MUST BE AT LEAST 8 CHARACTERS.
          </p>
        </div>

        <Button type="submit" className={`${actionButtonClassName} bg-[#4A5D3A] text-white hover:bg-[#3d4d30]`}>
          Create Account
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
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-bold text-[#4A5D3A] underline decoration-[#8A9A73] underline-offset-4 transition hover:text-[#8A9A73]">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;