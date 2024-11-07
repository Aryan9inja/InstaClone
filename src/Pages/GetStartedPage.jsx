import React from "react";
import BG_IMG from "../Components/BgImg";
import Button from "../Components/Button";
import { Link } from "react-router-dom";

function GetStartedPage() {
  return (
    <BG_IMG>
      <div>
        <Link to="/signup">
          <Button children={"Get Started"} />
        </Link>
        <Link to="/login">
          <Button children={"Login"} />
        </Link>
      </div>
    </BG_IMG>
  );
}

export default GetStartedPage;
