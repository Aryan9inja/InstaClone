import LeftSidebar from "../Components/Sidebars/LeftSidebar";
import RightSidebar from "../Components/Sidebars/RightSidebar";
import MainContent from "../Components/main/mainContent";
import Container from "../Components/Container/Container";
import React from "react";
import AuthCheck from "../Components/AuthCheck/AuthCheck";

function MainPage() {
  return (
    <AuthCheck>
      <Container classes={"flex"}>
        <LeftSidebar />
        <MainContent />
        <RightSidebar />
      </Container>
    </AuthCheck>
  );
}

export default MainPage;
