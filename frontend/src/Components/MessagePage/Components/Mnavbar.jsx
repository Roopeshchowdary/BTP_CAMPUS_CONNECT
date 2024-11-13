import React from "react";
import { useSelector } from "react-redux";

export const Mnavbar = () => {
  const user = useSelector((state) => state.userData.user);

  return (
    <div
      className="flex items-center h-[50px] px-5 
    justify-between bg-[#9F70FD] text-white "
    >
      <span className="font-bold">Messages</span>

      <div className="flex gap-2 ">
        <img
          src={user?.photoURL}
          alt="profile photo"
          className=" object-cover bg-white h-[24px] w-[24px] rounded-full"
        />
        <span>{user?.name?.split(" ")[0]}</span>
        <button className="pointer ">&</button>
      </div>
    </div>
  );
};
