import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

// Import your API creation service
import { createUser } from '../../services/userService';

const inputClasses = 
  'mt-2 w-full rounded-xl border border-[#C5D9A4] bg-white px-4 py-3 text-sm text-[#4A5D3A] outline-none transition placeholder:text-[#8A9A73]/50 focus:border-[#4A5D3A] focus:ring-1 focus:ring-[#4A5D3A]';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em] transition-colors';

const SignUpPage = () => {
  const navigate = useNavigate();

  // State structure matching backend requirements completely
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    address: '',
    username: '',      // Added custom username tracking state
    email: '',
    password: '',
    type: 'viewer',    
    isActive: true,    
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    
    const fieldMapping = {
      'first-name': 'firstName',
      'last-name': 'lastName',
      'signup-age': 'age',
      'signup-gender': 'gender',
      'signup-contact': 'contactNumber',
      'signup-address': 'address',
      'signup-username': 'username', // Added mapping for username input field
      'signup-email': 'email',
      'signup-password': 'password',
    };

    const targetStateKey = fieldMapping[id];

    if (targetStateKey) {
      setFormData((prev) => ({
        ...prev,
        [targetStateKey]: value,
        // Fallback: If user types email and hasn't customized username yet, duplicate it to username
        ...(targetStateKey === 'email' && !prev.username ? { username: value } : {})
      }));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Required fields check including the new username field
    if (!formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.password) {
      setError('Please fill in all required fields (Name, Username, Email, and Password).');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      setLoading(false);
      return;
    }

    try {
      await createUser(formData);
      navigate('/auth/signin'); 
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.response?.data?.message || 'An error occurred during sign-up. Please try again.');
    } finally {
      setLoading(false);
    }
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
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl font-medium">
            {error}
          </div>
        )}

        {/* Row 1: First Name & Last Name */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-bold uppercase tracking-wider text-[#4A5D3A]">
              First Name *
            </label>
            <input 
              id="first-name" type="text" placeholder="Jane" className={inputClasses} 
              value={formData.firstName} onChange={handleChange} required
            />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-bold uppercase tracking-wider text-[#4A5D3A]">
              Last Name *
            </label>
            <input 
              id="last-name" type="text" placeholder="Doe" className={inputClasses} 
              value={formData.lastName} onChange={handleChange} required
            />
          </div>
        </div>

        {/* Row 2: Age & Gender */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-age" className="text-sm font-bold uppercase tracking-wider text-[#4A5D3A]">
              Age
            </label>
            <input 
              id="signup-age" type="number" placeholder="25" className={inputClasses} 
              value={formData.age} onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="signup-gender" className="text-sm font-bold uppercase tracking-wider text-[#4A5D3A]">
              Gender
            </label>
            <select
              id="signup-gender" className={inputClasses}
              value={formData.gender} onChange={handleChange}
            >
              <option value="" disabled hidden>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        {/* Row 3: Mobile Number */}
        <div>
          <label htmlFor="signup-contact" className="text-sm font-bold uppercase tracking-wider text-[#4A5D3A]">
            Mobile Number
          </label>
          <input 
            id="signup-contact" type="text" placeholder="09123456789" className={inputClasses} 
            value={formData.contactNumber} onChange={handleChange}
          />
        </div>

        {/* Row 4: Address */}
        <div>
          <label htmlFor="signup-address" className="text-sm font-bold uppercase tracking-wider text-[#4A5D3A]">
            Address
          </label>
          <input 
            id="signup-address" type="text" placeholder="123 Greenhouse St, Manila" className={inputClasses} 
            value={formData.address} onChange={handleChange}
          />
        </div>

        {/* Row 5: Username */}
        <div>
          <label htmlFor="signup-username" className="text-sm font-bold uppercase tracking-wider text-[#4A5D3A]">
            Username *
          </label>
          <input 
            id="signup-username" type="text" placeholder="janedoe99" className={inputClasses} 
            value={formData.username} onChange={handleChange} required
          />
        </div>

        {/* Row 6: Email */}
        <div>
          <label htmlFor="signup-email" className="text-sm font-bold uppercase tracking-wider text-[#4A5D3A]">
            Email *
          </label>
          <input 
            id="signup-email" type="email" placeholder="nature@example.com" className={inputClasses} 
            value={formData.email} onChange={handleChange} required
          />
        </div>

        {/* Row 7: Password */}
        <div>
          <label htmlFor="signup-password" className="text-sm font-bold uppercase tracking-wider text-[#4A5D3A]">
            Password *
          </label>
          <input 
            id="signup-password" type="password" placeholder="••••••••" className={inputClasses} 
            value={formData.password} onChange={handleChange} required
          />
          <p className="mt-2 text-[10px] font-medium text-[#8A9A73]">
            MUST BE AT LEAST 8 CHARACTERS.
          </p>
        </div>

        <Button 
          type="submit" disabled={loading}
          className={`${actionButtonClassName} bg-[#4A5D3A] text-white hover:bg-[#3d4d30] disabled:opacity-50`}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
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