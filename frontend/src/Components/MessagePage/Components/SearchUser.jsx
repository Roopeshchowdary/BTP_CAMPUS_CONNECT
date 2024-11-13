import { useCallback, useState } from "react";
import useFirebase from "../../../hooks/useFirebase";
import { Button } from "flowbite-react";
import {
  createChatAction,
  findUser,
} from "../../../store/CHAT_STORE/chatActions";

export const SearchUser = () => {
  const { user } = useFirebase();
  const [query, setQuery] = useState("");
  const [otherUser, setOtherUser] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      if (!query || query.length === 0) return;

      const user = await findUser(query);

      setOtherUser(user);
    } catch (error) {
      setError(true);
    }
  }, [query]);

  const createChat = useCallback(() => {
    createChatAction([user.email, otherUser.email]);
    setOtherUser(null);
    setQuery("");
  }, [otherUser, setOtherUser, setQuery]);

  return (
    <div className="border-b border-gray-400 ">
      <div className="p-[10px] flex justify-between gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setError(false);
            setQuery(e.target.value);
          }}
          className="rounded-md bg-transparent border-none text-black focus:outline-none placeholder-gray-400 w-full"
          placeholder="Enter email"
        />
        <Button onClick={handleSubmit}>Find</Button>
      </div>
      {error && <h1>User not found</h1>}
      {otherUser && (
        <div
          onClick={createChat}
          className="flex p-[10px] gap-[10px] items-center text-black cursor-pointer hover:bg-purple-200"
        >
          <img
            src={otherUser.photoURL}
            alt="user"
            className="w-[50px] h-[50px] rounded-full  object-cover"
          />
          <div className="userChatInfo">
            <span>Chat with: {otherUser.name?.split(" ")[0]}</span>
          </div>
        </div>
      )}
    </div>
  );
};
