import React, { useContext, useEffect, useState } from "react";
import { Message } from "./Message";
import "./Messages.css";

export const Messages = ({ messages, otherPartipicant }) => {
  console.log("Component messages: ", messages);

  return (
    <div
      className="bg-purple-100 p-[10px]  overflow-scroll overflow-x-hidden"
      style={{ height: "calc(100% - 98px)" }}
    >
      {messages.map((m) => (
        <Message message={m} otherPartipicant={otherPartipicant} key={m.id} />
      ))}
    </div>
  );
};
