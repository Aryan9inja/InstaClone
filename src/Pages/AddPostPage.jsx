import React from "react";
import BgImg from "../Components/BgImg";
import AddPost from "../Components/AddPost";
import AuthCheck from "../Components/AuthCheck/AuthCheck";

function AddPostPage() {
  return (
    <AuthCheck>
      <BgImg children={<AddPost />} />
    </AuthCheck>
  );
}

export default AddPostPage;
