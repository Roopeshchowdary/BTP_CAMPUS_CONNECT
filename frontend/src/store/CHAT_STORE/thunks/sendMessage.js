import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../Firebase/firebase";
import { addDoc, collection, doc } from "firebase/firestore";

export const sendMessage = createAsyncThunk(
  "chat/send-message",
  async ({ groupId, email, type, message }) => {
    try {
      console.log("Received: ", groupId, email, type, message);

      const groupRef = doc(db, "groups", groupId);
      const groupMessageCollection = collection(groupRef, "messages");

      const messageData = {
        type,
        message,
        timestamp: Date.now(),
        senderId: email,
      };

      const res = await addDoc(groupMessageCollection, messageData);

      console.log("Message send: ", res.id);

      return { message: { id: res.id, ...messageData }, groupId };
    } catch (error) {
      console.log(
        "Error while sending message in group: ",
        groupId,
        error.message
      );
      throw error;
    }
  }
);
