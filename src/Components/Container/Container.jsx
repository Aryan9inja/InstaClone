import React from "react";

function Container({ children,classes }) {
  return (
    <div className={`w-full mx-auto bg-black ${classes}`}>
      {children}
    </div>
  );
}

export default Container;
