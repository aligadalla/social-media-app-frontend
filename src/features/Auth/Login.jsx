/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { useLogin } from "./Authentication";
import { useNavigate } from "react-router-dom";
import { signIn } from "./Authentication";
import Button from "../../ui/Button";

const inputStyles="border-2 border-black rounded-md mx-2 w-80 p-1"

export default function Login() {
  const [hidden, setHidden] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  //   const { isLoading: isLoggingIn, isError, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const passwordType = hidden ? "password" : "text";

  async function onSubmit(data) {
    try {
      // await createLogin(data);
      setIsLoggingIn(true);
      await signIn(data.email, data.password);
      navigate("/feed");
    } catch (err) {
      console.log(err.message, err.data);
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <div className="bg-secondary h-screen w-screen flex flex-col items-center justify-center">
      <div className="bg-yellow-300 rounded-md w-96 flex flex-col gap-10 items-center ">
        <h2 className="font-heading rounded-lg text-3xl">Login</h2>
        <form className="flex flex-col items-center w-96" onSubmit={handleSubmit(onSubmit)}>
          <div className="py-6 flex flex-col items-center justify-between bg-red-500 size-full">
            <label className="mb-3" htmlFor="email">Email</label>
            <input 
              className={inputStyles}
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
            {errors.email && <p>{errors.email.message}</p>}
              <label className="my-3" htmlFor="password">Password</label>
              <input
                className={inputStyles}
                id="password"
                type={passwordType}
                {...register("password", { required: "Password is required" })}
                />
                {/* <button type="button" onClick={() => setHidden(!hidden)}>
                  Toggle
                </button> */}
                {/* {errors.password && <p>{errors.password.message}</p>} */}
          </div>

          <Button size='h-10 w-10 text-md'  disabled={isLoggingIn} >
            {isLoggingIn ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="flex flex-col items-center">
          <p>Don't have an accout ?</p>
          <Button
            size="h-7 h-7 text-sm"
            onClick={() => {
              navigate("/signup");
            }}
          >
            SignUp
          </Button>
        </div>
        {/* 
      {isError && (
        <p>
        {error.message} {error.data}
        </p>
        )} */}
      </div>
    </div>
  );
}
