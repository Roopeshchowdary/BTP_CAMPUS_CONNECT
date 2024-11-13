import React from "react";
import { Mnavbar } from "./Mnavbar";
import { SearchUser } from "./SearchUser";
import { Chats } from "./Chats";

export const Sidebar = () => {
  return (
    <div className="flex-initial w-1/4 border-r border-black">
      <Mnavbar />
      <SearchUser />
      <Chats />
    </div>
  );
};
