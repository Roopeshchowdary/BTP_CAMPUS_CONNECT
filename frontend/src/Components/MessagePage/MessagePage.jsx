import React, { useContext } from "react";
import { Chat } from "./Components/Chat";
import { Sidebar } from "./Components/Sidebar";

import { FirebaseContext } from "./../../Context/FirebaseContext";

export const MessagePage = () => {
  const { user } = useContext(FirebaseContext);

  return (
    <div style={{ height: "calc(100vh - 97px)" }}>
      <div className=" flex m-2 rounded-lg overflow-hidden  h-[100%]  ">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};
