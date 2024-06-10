import React from "react";

const Header = () => {
  return (
    <div className="bg-black text-2xl	  w-100 h-12 p-3 border-b bordered-box flex flex-row justify-between border-b-[#9fadbc29]">
      <div className="left justify-center items-center flex">
        <h1 className="text-slate-50  ">My Trello App</h1>
      </div>

      <div className="right flex items-center space-x-4">
        <span>Remote dev</span>
      </div>
    </div>
  );
};

export default Header;
