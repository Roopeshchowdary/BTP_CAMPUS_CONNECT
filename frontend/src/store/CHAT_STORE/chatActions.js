import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { store } from "../store";
import { createChat } from "./thunks/createChat";
import { fetchChats, fetchGroups } from "./thunks/fetchChats";
import { fetchMessages } from "./thunks/fetchMessages";
import { sendMessage } from "./thunks/sendMessage";
import { db } from "../../Firebase/firebase";
import { appendChats, appendMessages, setCurrentChat } from "./chatSlice";

export const setChatAction = (grouId) => {
  store.dispatch(setCurrentChat({ grouId }));
};

export const createChatAction = (emailIds) => {
  store.dispatch(createChat(emailIds));
};

export const fetchChatsAction = (email) => {
  const chatIds = store.getState().chatData.ids;

  if (chatIds.length === 0) store.dispatch(fetchChats(email));
};

export const fetchMessagesAction = (groupId) => {
  const isFetched = store.getState().chatData.entities[groupId]?.isFetched;

  if (!isFetched) store.dispatch(fetchMessages(groupId));
};

export const sendMessageAction = (groupId, email, type, message) => {
  store.dispatch(sendMessage({ groupId, email, type, message }));
};

export const subscribeToMessages = (groupIds, email) => {
  console.log("Subscription event received for messages: ", groupIds, email);

  const unsubs = groupIds.map((groupId) => {
    const groupRef = doc(db, "groups", groupId);
    const messageCollection = collection(groupRef, "messages");
    let firstEvent = true;

    return onSnapshot(messageCollection, (snapshot) => {
      if (snapshot.docChanges().length === 0 || firstEvent) {
        console.log("No messages..");
        firstEvent = false;
      } else {
        console.log("New Message notification.", snapshot.docChanges());

        const chats = snapshot
          .docChanges()
          .filter((e) => e.type === "added")
          .map((e) => ({ id: e.doc.id, ...e.doc.data() }))
          .filter((e) => e.senderId?.localeCompare(email) != 0);

        if (chats.length === 0) return;

        store.dispatch(appendMessages({ groupId, messages: chats }));
      }
    });
  });

  return () => {
    unsubs.forEach((unsub) => {
      unsub();
    });
  };
};

export const subscribeToChats = (email) => {
  console.log("Subscription event received for chats: ", email);

  const userChatsRef = doc(db, "userchats", email);

  let firstEvent = true;

  return onSnapshot(userChatsRef, async (snapshot) => {
    if (firstEvent) {
      console.log("No new chats..");
      firstEvent = false;
    } else {
      console.log("New chat notification received: ", snapshot.data());

      const newGroupId =
        snapshot.data().groups[snapshot.data().groups?.length - 1];

      const chat = await fetchGroups([newGroupId], email);

      store.dispatch(appendChats({ chats: chat }));
    }
  });
};

export const findUser = async (email) => {
  try {
    const userRef = doc(db, "users", email);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists) {
      throw new Error("User not found");
    }

    return { email, ...userSnap.data() };
  } catch (error) {
    console.log("Error while fetching user", error.message);
  }
};
