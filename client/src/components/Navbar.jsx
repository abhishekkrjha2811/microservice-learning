import React from "react";

const Navbar = () => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex items-center justify-between h-14">
        <h1 className="font-bold">Devxpat</h1>
        <button className="p-2 rounded bg-sky-600 text-white ">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
