/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from './Authentication'; 
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [hidden, setHidden] = useState(true);
    const navigate = useNavigate();
    const { createLogin, isLoggingIn } = useLogin();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const passwordType = hidden ? "password" : "text";

    async function onSubmit(data) {
        try {
            await createLogin(data);
            navigate('/feed');
        }
        catch(err) {
            throw new Error(err);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
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

                <button type="submit" disabled={isLoggingIn}>
                    {isLoggingIn ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <div>
                <p>Don't have an accout ?</p>
                <button type="button" onClick={() => {
                    navigate('/signup');
                }}>
                    SignUp
                </button>
            </div>
        </div>
    );
}
