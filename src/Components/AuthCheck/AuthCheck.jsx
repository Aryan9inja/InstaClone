import React, { useState, useEffect } from "react";
import authService from "../../Backend/auth";
import { Link } from "react-router-dom";

function AuthCheck({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        setIsAuthenticated(user !== "No user");
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // Render a loading state while authentication is being checked
  if (isAuthenticated === null) return <h1>Loading...</h1>;

  return isAuthenticated ? (
    children
  ) : (
    <div className="bg-black text-white h-screen w-full flex flex-col items-center justify-center gap-3">
      <h1 className="text-4xl">You are not authorized</h1>
      <div className="flex text-2xl">
        <h2>Sign Up Here--</h2>{" "}
        <Link to="/signup" className="hover:underline text-blue-300">
          SignUp
        </Link>
      </div>
      <div className="flex text-2xl">
        <h2>Login Here--</h2>{" "}
        <Link to="/login" className="hover:underline text-blue-300">
          Login
        </Link>
      </div>
    </div>
  );
}

export default AuthCheck;
