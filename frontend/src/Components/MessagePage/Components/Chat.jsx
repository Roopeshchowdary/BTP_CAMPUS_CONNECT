import React, { useEffect } from "react";
import { Messages } from "./Messages";
import { Input } from "./Input";
import videocam from "./../assets/videocam.png";
import { useSelector } from "react-redux";
import { selectCurrentChat } from "../../../store/CHAT_STORE/chatSlice";
import { fetchMessagesAction } from "../../../store/CHAT_STORE/chatActions";

export const Chat = () => {
  const currentChat = useSelector((state) => selectCurrentChat(state.chatData));

  useEffect(() => {
    currentChat?.id && fetchMessagesAction(currentChat.id);
  }, [currentChat?.id]);

  if (!currentChat) return null;

  const otherParticipant =
    currentChat.otherParticipants[
      Object.keys(currentChat.otherParticipants)[0]
    ];

  return (
    <div className="flex-grow ">
      <div className=" p-[10px] flex h-[50px] bg-purple-200 items-center justify-between font-bold text-purple-900 ">
        <span> {otherParticipant.name?.split(" ")[0]}</span>
        <div className="flex gap-[10px] ">
          <img
            src={videocam}
            alt="cam"
            className="cursor-pointer w-[20px] mr-10 text-white"
            style={{ filter: "invert(1)" }}
          />
        </div>
      </div>
      <Messages
        messages={currentChat.messages || []}
        otherPartipicant={otherParticipant}
      />
      <Input group={currentChat} />
    </div>
  );
};
