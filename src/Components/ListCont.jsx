import React from "react";

function ListCont({children}) {
  return (
    <div className="flex px-10 items-center gap-2 cursor-pointer hover:text-gray-500">
        {children}
    </div>
  );
}

export default ListCont;
