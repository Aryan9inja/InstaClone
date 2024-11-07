import React, { useEffect } from "react";
import AllPosts from "./AllPosts";
import authService from "../../Backend/auth"
import { useDispatch } from "react-redux";
import { login } from "../../Store/Slices/authSlice";

function MainContent() {
  const dispatch=useDispatch()

  useEffect(() => {
    (async () => {
      const user = await authService.getCurrentUser();
      if (user) dispatch(login(user));
    })();
  }, [dispatch]);
  

  return (
    <div className="h-screen w-3/5 p-12 px-36 overflow-y-auto flex flex-col gap-10">
      <AllPosts/>
    </div>
  );
}

export default MainContent;
