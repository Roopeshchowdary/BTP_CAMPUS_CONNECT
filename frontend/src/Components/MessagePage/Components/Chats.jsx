import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../../Context/FirebaseContext";
import { useSelector } from "react-redux";
import {
  selectAllChats,
  selectCurrentChat,
} from "../../../store/CHAT_STORE/chatSlice";
import {
  fetchChatsAction,
  setChatAction,
  subscribeToChats,
  subscribeToMessages,
} from "../../../store/CHAT_STORE/chatActions";

export const Chats = () => {
  const { user } = useContext(FirebaseContext);
  const chats = useSelector((state) => selectAllChats(state.chatData)) || [];
  const currentChat = useSelector((state) => selectCurrentChat(state.chatData));

  useEffect(() => {
    fetchChatsAction(user.email);
  }, []);

  useEffect(() => {
    subscribeToChats(user.email);
  }, []);

  useEffect(() => {
    if (!currentChat) return;

    const unsub = subscribeToMessages(
      chats.map((chat) => chat.id),
      user.email
    );

    return unsub;
  }, [currentChat?.id]);

  const displayChats = chats?.map((chat) => {
    return {
      ...chat,
      info: chat.otherParticipants[Object.keys(chat.otherParticipants)[0]],
    };
  });

  return (
    <div>
      {displayChats &&
        displayChats.map((chat) => (
          <div
            key={chat.id}
            className={`flex p-[10px] gap-[10px] items-center text-black cursor-pointer hover:bg-purple-50 ${
              chat.id.localeCompare(currentChat?.id) === 0
                ? "bg-purple-100"
                : null
            }`}
            onClick={() => setChatAction(chat.id)}
          >
            <img
              src={chat.info.photoURL}
              alt="user"
              className="w-[50px] h-[50px] rounded-full  object-cover"
            />
            <div className="userChatInfo">
              <span className="text-[18px] font-medium">{chat.info.name}</span>
            </div>
            {chat.unseen && chat.unseen > 0 ? (
              <span>{chat.unseen} unread messages</span>
            ) : null}
          </div>
        ))}
    </div>
  );
};
