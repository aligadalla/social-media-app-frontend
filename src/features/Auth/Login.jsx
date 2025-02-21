import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signIn } from "./Authentication";
import { useQueryClient } from "@tanstack/react-query";

export default function Login() {
  const [hidden, setHidden] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const passwordType = hidden ? "password" : "text";

  async function onSubmit(data) {
    try {
      setIsLoggingIn(true);
      await signIn(data.email, data.password);
      //await new Promise((resolve) => setTimeout(resolve, 500));
      await queryClient.invalidateQueries(["user"]);
      await queryClient.refetchQueries(["user"]);
      navigate("/feed");
    } catch (err) {
      console.log(err.message, err.data);
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className="mb-1 text-sm font-medium">Email</label>
          <input 
            className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <label htmlFor="password" className="mb-1 text-sm font-medium">Password</label>
          <input
            className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            type={passwordType}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <button 
            type="button" 
            onClick={() => setHidden(!hidden)} 
            className="text-blue-500 text-sm mb-4 hover:underline"
          >
            {hidden ? "Show Password" : "Hide Password"}
          </button>

          <button 
            type="submit" 
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">Don&apos;t have an account?</p>
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-500 text-sm hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}