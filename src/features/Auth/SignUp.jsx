import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSignUp } from './Authentication'; 
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [hidden, setHidden] = useState(true);
    const navigate = useNavigate();
    const { createSignUp, isSigningUp } = useSignUp();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const passwordType = hidden ? "password" : "text";

    async function onSubmit(data) {
        try {
            await createSignUp(data);
            navigate('/login');
        } catch(err) {
            throw new Error(err);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        {...register('username', { required: 'Username is required' })}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
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
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type={passwordType}
                        {...register('password', { required: 'Password is required' })}
                    />
                    <button type="button" onClick={() => setHidden(!hidden)}>
                        Toggle
                    </button>
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <button type="submit" disabled={isSigningUp}>
                    {isSigningUp ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
}
