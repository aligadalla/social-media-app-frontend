import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from './Authentication';

export default function SignUp() {
  const [hidden, setHidden] = useState(true);
  const navigate = useNavigate();
  const { createSignUp, isSigningUp, isError, error } = useSignUp();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const passwordType = hidden ? 'password' : 'text';

  async function onSubmit(data) {
    try {
      await createSignUp(data);
      navigate('/login');
    } catch (err) {
      console.log(err.message, err.data);
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username" className="mb-1 text-sm font-medium">Username</label>
          <input
            className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
            type="text"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

          <label htmlFor="email" className="mb-1 text-sm font-medium">Email</label>
          <input
            className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                message: 'Invalid email format'
              }
            })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <label htmlFor="password" className="mb-1 text-sm font-medium">Password</label>
          <input
            className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            type={passwordType}
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <button
            type="button"
            onClick={() => setHidden(!hidden)}
            className="text-blue-500 text-sm mb-4 hover:underline"
          >
            {hidden ? 'Show Password' : 'Hide Password'}
          </button>

          <button 
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all"
            disabled={isSigningUp}
          >
            {isSigningUp ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">Already have an account?</p>
          <button
            onClick={() => navigate('/login')}
            className="text-blue-500 text-sm hover:underline"
          >
            Login
          </button>
        </div>

        {isError && <p className="text-red-500 text-sm mt-4">{error.message} {error.data}</p>}
      </div>
    </div>
  );
}