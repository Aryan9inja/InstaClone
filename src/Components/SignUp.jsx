import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "./Logo";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import authService from "../Backend/auth";
import { login } from "../Store/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../Store/Slices/loaderSlice";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.loader.isLoading);

  const onSubmit = async (data) => {
    setError("");
    dispatch(showLoading());
    const { email, password, name } = data;

    try {
      const session = await authService.createAccount({ email, password, name });
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData)); // Dispatch login action
          navigate("/create"); // Navigate to the next step (create user profile)
        }
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Signup failed. Please try again.");
    } finally {
      dispatch(hideLoading());
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
          Sign up to create account
        </h2>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name"
              placeholder="Enter your Full Name"
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}

            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                  message: "Please enter a valid email",
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
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                validate: {
                  containsUppercase: (value) =>
                    /[A-Z]/.test(value) ||
                    "Password must contain at least one uppercase letter",
                  containsLowercase: (value) =>
                    /[a-z]/.test(value) ||
                    "Password must contain at least one lowercase letter",
                  containsNumber: (value) =>
                    /\d/.test(value) || "Password must contain at least one number",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loader}
            >
              {loader ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
