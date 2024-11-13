import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../Firebase/firebase";
import { collection, getDocs, doc } from "firebase/firestore";

export const fetchMessages = createAsyncThunk(
  "chats/fetch-messages",
  async (groupId) => {
    try {
      console.log("Received parameters for messages fetching: ", groupId);

      const groupRef = doc(db, "groups", groupId);
      const messagesCollection = collection(groupRef, "messages");
      const messagesSnap = await getDocs(messagesCollection);
      const messages = messagesSnap.docs.map((message) => ({
        ...message.data(),
        id: message.id,
      }));

      console.log("Messages fetched: ", messages);

      return { messages, groupId };
    } catch (error) {
      console.log("Error while fetching messages from group: ", error.message);
      throw error;
    }
  }
);
