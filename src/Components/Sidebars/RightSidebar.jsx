import React from "react";
import Container from "../Container/Container";
import Profile from "../Profile";
import Button from "../Button";
import LogoutButton from "../LogoutButton";
import { Link } from "react-router-dom";

function RightSidebar() {
  return (
    <div className="w-1/5 h-screen flex flex-col text-white border-l border-white/50 justify-evenly">
      <Container>
        <Profile />
      </Container>
      <Container classes={"flex flex-col gap-4"}>
        <Link to="/add">
          <Button children={"Add New Post"} bgColor="bg-green-500/20 w-full" />
        </Link>

        <LogoutButton />
      </Container>
    </div>
  );
}

export default RightSidebar;
