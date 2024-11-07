import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import userService from "../../Backend/user";
import postService from "../../Backend/post";

// Helper function to calculate time ago
const getTimeAgo = (creationTime) => {
  const postTime =
    typeof creationTime === "string" ? new Date(creationTime).getTime() : creationTime;
  const diffInSeconds = (Date.now() - postTime) / 1000;

  if (diffInSeconds < 60) return `${Math.floor(diffInSeconds)} seconds ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

function Post({ userId, postImage, likeCount, caption, creationTime }) {
  const [isLiked, setIsLiked] = useState(false);
  const [userData, setUserData] = useState({});
  const [timeAgo, setTimeAgo] = useState("Loading..."); // State to hold time ago

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const data = await userService.userData(userId);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    // Calculate and set time ago
    if (creationTime) {
      setTimeAgo(getTimeAgo(creationTime));
    }
  }, [userId, creationTime]); // Dependency on creationTime to set time once

  return (
    <div className="post-container flex flex-col w-full">
      {/* Header */}
      <div className="post-header flex items-center px-6 gap-4 cursor-pointer hover:text-gray-500 border border-white rounded-t-xl p-4 text-white">
        <img
          src={userService.userImagePreview(userData?.profileImage || "")}
          alt="Profile"
          className="rounded-full h-10 w-10 border-2 border-blue object-cover"
        />
        <h1 className="text-2xl font-bold">{userData?.username || "Loading..."}</h1>
      </div>

      {/* Image */}
      <div className="post-image-container h-128 w-full border border-white flex items-center justify-center">
        <img
          src={postService.postImagePreview(postImage || "")}
          alt="Post"
          className="object-contain w-full h-full"
        />
      </div>

      {/* Footer */}
      <div className="post-footer w-full border border-white rounded-b-xl px-6 p-4 flex flex-col justify-center items-start gap-2">
        <div onClick={() => setIsLiked(!isLiked)} className="like-button">
          <FontAwesomeIcon icon={isLiked ? faHeart : farHeart} size="2x" color={isLiked ? "red" : "white"} />
          <h2 className="text-white">{likeCount} likes</h2>
        </div>
        <h3 className="caption text-gray-400">{caption}</h3>
        <h5 className="time-ago text-gray-600">{timeAgo}</h5> {/* Display static time ago */}
      </div>
    </div>
  );
}

export default Post;
