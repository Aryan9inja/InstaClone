import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../Backend/user";

function Profile({ className }) {
  const [userData, setUserData] = useState({});
  const userInfo = useSelector((state) => state.auth.userData);
  const userId = userInfo?.$id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await userService.userData(userId);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <div className={`w-full flex items-center px-10 gap-2 cursor-pointer hover:text-gray-500 ${className}`}>
      <img
        src={userService.userImagePreview(String(userData?.profileImage || ""))}
        alt="Profile"
        className="rounded-full h-10 w-10 border-2 border-blue object-cover"
      />
      <h1 className="text-2xl font-bold">{userData?.username || "Loading..."}</h1>
    </div>
  );
}

export default Profile;
