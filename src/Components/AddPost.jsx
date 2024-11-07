import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import Input from "./Input";
import postService from "../Backend/post";
import { useSelector } from "react-redux";
import userService from "../Backend/user";
import { showLoading, hideLoading } from "../Store/Slices/loaderSlice";

function AddPost() {
  // State management
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit, watch, reset } = useForm();
  const caption = watch("caption");
  const userInfo = useSelector((state) => state.auth.userData);
  const userId = userInfo?.$id;
  const loader = useSelector((state) => state.loader.isLoading);

  useEffect(() => {
    const fetchUser = async () => {
      showLoading();
      try {
        const user = await userService.userData(userId);
        setUserData(user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        hideLoading();
        setIsLoading(false); // User data fetched or failed
      }
    };
    fetchUser();
  }, [userId]);

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit post handler
  const onSubmit = async (data) => {
    try {
      // Upload image to the backend
      const uploadedImageUrl = await postService.uploadPostImage(image);

      // Create the post data object with the uploaded image URL
      const postData = {
        postImage: uploadedImageUrl.$id,
        caption: data.caption,
        userId,
        likeCount: 0,
        creationTime: new Date().toISOString(),
      };

      await postService.createPost(postData)
      console.log("Post Data:", postData);

      // Reset form and image preview
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  if (isLoading) {
    return <p>Loading user data...</p>; // Placeholder while fetching user data
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-2/5">
      <div className="w-full flex items-center px-6 gap-4 cursor-pointer hover:text-gray-500 border border-white rounded-t-xl p-4">
        <img
          src={loader ? "" : userService.userImagePreview(userData?.profileImage)}
          alt="Profile"
          className="rounded-full h-10 w-10 border-2 border-blue object-cover"
        />
        <h1 className="text-xl font-semibold text-white">{userData?.username}</h1>
      </div>

      {imagePreview ? (
        <div className="h-128 w-full border border-white flex items-center justify-center">
          <img
            src={imagePreview}
            alt="Post Preview"
            className="object-contain h-full w-full"
          />
        </div>
      ) : (
        <div
          className="h-128 w-full border border-white flex items-center justify-center cursor-pointer"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <p className="text-gray-500">Upload an image</p>
        </div>
      )}

      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      <div className="w-full border border-white rounded-b-xl px-6 p-4 flex flex-col justify-center items-start">
        <div className="flex items-center gap-2">
          <div onClick={() => setIsLiked(!isLiked)}>
            {isLiked ? (
              <FontAwesomeIcon icon={faHeart} size="2x" color="red" />
            ) : (
              <FontAwesomeIcon icon={farHeart} size="2x" color="white" />
            )}
          </div>
          <h2 className="text-white">0 likes</h2>
        </div>

        <Input
          {...register("caption", { required: true })}
          placeholder="Write a caption..."
          className="w-full border border-gray-300 p-2 rounded text-white/60"
        />

        <h5 className="text-gray-600">0 seconds ago</h5>
      </div>

      <div className="flex justify-between px-6 mt-4">
        {imagePreview && (
          <button
            type="button"
            onClick={() => document.getElementById("fileInput").click()}
            className="bg-gray-300 text-black p-2 rounded"
          >
            Change Image
          </button>
        )}
        {imagePreview && caption && (
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        )}
      </div>
    </form>
  );
}

export default AddPost;
