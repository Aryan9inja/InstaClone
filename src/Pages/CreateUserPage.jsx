import React from "react";
import BG_IMG from "../Components/BgImg";
import CreateUser from "../Components/CreateUser";
import AuthCheck from "../Components/AuthCheck/AuthCheck";

function CreateUserPage() {
  return (
    <AuthCheck>
      <BG_IMG children={<CreateUser />} />
    </AuthCheck>
  );
}

export default CreateUserPage;
