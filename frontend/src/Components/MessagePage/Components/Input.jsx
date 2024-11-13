import React, { useCallback, useContext, useState } from "react";
import { sendMessageAction } from "../../../store/CHAT_STORE/chatActions";
import useFirebase from "../../../hooks/useFirebase";

export const Input = ({ group }) => {
  const [text, setText] = useState("");
  const { user } = useFirebase();

  const handleSend = useCallback(() => {
    sendMessageAction(group?.id, user.email, "text", text);
    setText("");
  }, [text]);

  return (
    <div className="h-[50px] bg-white p-[10px] flex items-center justify-between">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Type a messsage."
        className="w-full border-none outline-none text-[14px] rounded-md placeholder-gray-400  mr-[10px] bg-purple-100"
      />
      <div className=" flex items-center gap-[10px] ">
        <button
          className="border-none p-[7px] pl-[7px] pr-[7px] rounded-md bg-purple-500 hover:bg-purple-400 text-white"
          onClick={handleSend}
        >
          {" "}
          Send
        </button>
      </div>
    </div>
  );
};
