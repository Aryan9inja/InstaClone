import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "./Logo";
import Input from "./Input";
import Button from "./Button";
import userService from "../Backend/user";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../Store/Slices/loaderSlice";

function CreateUser() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.userData);
  const loader = useSelector((state) => state.loader.isLoading);

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setError(""); // Reset error
    dispatch(showLoading());

    const { name, username } = data;
    const userId = authData?.$id;

    try {
      // Step 1: Upload profile image if selected
      let profileImageId = null;
      if (selectedImage) {
        const profileImageUrl = await userService.uploadUserImage(selectedImage);
        profileImageId = profileImageUrl?.$id;
      }

      // Step 2: Create user profile
      await userService.createUser({
        userId,
        username,
        name,
        profileImage: profileImageId || "",
      });

      // Step 3: Navigate to the home page on success
      navigate("/home");
    } catch (err) {
      // Handle error and display message
      setError("Failed to create account. Please try again.");
      console.error(err);
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <div className="flex items-center justify-center w-full text-white/70">
      <div className="mx-auto w-full max-w-lg bg-black bg-opacity-50 rounded-xl p-10 border border-white/10">
        <div className="mb-1 flex justify-center">
          <span className="inline-block">
            <Logo />
          </span>
        </div>
        <h3 className="text-center text-2xl font-bold leading-tight mb-4">
          Enter info to create new Account
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            {/* Name Input */}
            <Input
              label="Enter your name:"
              placeholder="Enter your full name"
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && <p className="text-red-600">{errors.name.message}</p>}

            {/* Username Input */}
            <Input
              label="Enter username:"
              placeholder="Enter preferred username"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[a-z][a-z0-9_]*$/,
                  message:
                    "Username must start with a letter and contain only letters, numbers, and underscores",
                },
              })}
            />
            {errors.username && <p className="text-red-600">{errors.username.message}</p>}

            {/* Error Message */}
            {error && <p className="text-red-600">{error}</p>}

            {/* Profile Picture Upload */}
            <h2>Upload profile picture:</h2>
            {imagePreview ? (
              <div className="mx-auto h-56 w-56 rounded-full border border-white flex items-center justify-center">
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="object-cover h-56 w-56 rounded-full"
                />
              </div>
            ) : (
              <div
                className="mx-auto h-56 w-56 rounded-full border border-white flex items-center justify-center cursor-pointer"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <p className="text-gray-500">Upload an image</p>
              </div>
            )}

            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={loader} // Disable button when loading
              children={loader ? "Creating Account..." : "Create Account"}
            />

            {/* Change Image Button */}
            {imagePreview && (
              <Button
                type="button"
                onClick={() => document.getElementById("fileInput").click()}
                className="bg-gray-300 text-black p-2 rounded w-full"
              >
                Change Image
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
