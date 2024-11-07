import React from "react";

const BG_IMG = ({children}) => {
    return (
      <div className="bg-black h-screen bg-cover bg-center flex items-center justify-center overflow-hidden">
        {children}
      </div>
    );
  };
  
  export default BG_IMG;
  