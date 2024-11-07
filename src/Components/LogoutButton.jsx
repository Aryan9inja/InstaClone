import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../Store/Slices/authSlice";
import { useDispatch } from "react-redux";
import authService from "../Backend/auth";

function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await authService.logout();
    dispatch(logout());
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
