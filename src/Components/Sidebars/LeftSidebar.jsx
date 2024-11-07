import React from "react";
import Container from "../Container/Container";
import Logo from "../Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import ListCont from "../ListCont";
import Profile from "../Profile";

function LeftSidebar() {
  return (
    <div className="w-1/5 h-screen flex flex-col text-white justify-evenly border-r border-white/50">
      <Container children={<Logo />} />

      <Container classes={"flex flex-col gap-4 justify-center"}>
        <ListCont>
          <FontAwesomeIcon icon={faHouse} />
          <h1 className="text-2xl font-bold">Home</h1>
        </ListCont>

        <ListCont>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <h1 className="text-2xl font-bold">Search</h1>
        </ListCont>

        <ListCont>
          <FontAwesomeIcon icon={faMessage} />
          <h1 className="text-2xl font-bold">Messages</h1>
        </ListCont>
      </Container>
      <Container>
        <Profile />
      </Container>
    </div>
  );
}

export default LeftSidebar;
