import React, { useState } from "react";
import Logo from "./Logo";
import Button from "./Button";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../Store/Slices/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import authService from "../Backend/auth";
import { login } from "../Store/Slices/authSlice";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loader = useSelector((state) => state.loader.isLoading);

  const onSubmit = async (data) => {
    setError(""); // Clear any previous errors
    dispatch(showLoading()); // Show loading spinner

    const { email, password } = data;

    try {
      const session = await authService.login({ email, password });
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData)); // Dispatch login action
          navigate("/home"); // Navigate to home page
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      dispatch(hideLoading()); // Hide loading spinner
    }
  };

  return (
    <div className="flex items-center justify-center w-full text-white/70">
      <div className="mx-auto w-full max-w-lg bg-black bg-opacity-50 rounded-xl p-10 border border-white/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block">
            <Logo />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                  message: "Email address must be valid",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}

            <Input
              label="Password: "
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message:
                    "Password must be 8+ characters, include 1 uppercase, 1 lowercase, and 1 number",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}

            <Button type="submit" className="w-full" disabled={loader}>
              {loader ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
