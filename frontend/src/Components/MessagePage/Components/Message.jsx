import React, { useEffect, useRef } from "react";
import "./Message.css";
import useFirebase from "../../../hooks/useFirebase";
import { useSelector } from "react-redux";

export const Message = ({ message, otherPartipicant }) => {
  const user = useSelector((state) => state.userData.user);
  const ref = useRef();

  return (
    <div
      ref={ref}
      className={`message flex gap-[20px] mb-[20px] ${
        message.senderId === user.email && "owner"
      }`}
    >
      <div className="messageInfo flex flex-col text-gray-500 font-medium">
        <img
          src={
            message.senderId === user.email
              ? user.photoURL
              : otherPartipicant.photoURL
          }
          alt=""
          className="w-[20px] h-[20px] rounded-full object-cover"
        />
      </div>
      <div className="messageContent owner_mc">
        <p
          className={` p-[5px] px-[10px]  max-w-max-content mb-[5px]  owner_p ${
            message.senderId === user.uid ? "owner_p" : "friend_p"
          }`}
        >
          {message.message}
        </p>
      </div>
    </div>
  );
};
