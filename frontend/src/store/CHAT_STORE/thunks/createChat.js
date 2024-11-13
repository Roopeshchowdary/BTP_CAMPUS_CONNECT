import { createAsyncThunk } from "@reduxjs/toolkit";
import { runTransaction, doc } from "firebase/firestore";
import { db } from "../../../Firebase/firebase";

const getChatSpace = async (transaction, email) => {
  try {
    const userRef = doc(db, "userchats", email);
    const userChatSnap = await transaction.get(userRef);
    return userChatSnap;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const getGroup = async (transaction, emailIds) => {
  try {
    const groupId = emailIds.sort().join("_");

    const groupDocRef = doc(db, "groups", groupId);

    const groupSnap = await transaction.get(groupDocRef);

    return groupSnap;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const setGroup = async (transaction, groupSnap, group) => {
  try {
    const res = await transaction.set(groupSnap.ref, group);
    return res;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const notifyUser = async (transaction, userChatSnap, groupSnap) => {
  try {
    let res = null;

    console.log(userChatSnap.data());

    if (!userChatSnap.exists() || !userChatSnap.data().groups) {
      res = await transaction.set(userChatSnap.ref, {
        groups: [groupSnap.id],
      });

      return res;
    } else {
      res = await transaction.update(userChatSnap.ref, {
        groups: [...userChatSnap.data().groups, groupSnap.id],
      });
    }

    console.log(res);

    return res;
  } catch (error) {
    console.log(error.message);

    throw error;
  }
};

export const createChat = createAsyncThunk(
  "chats/create-chat",
  async (emailIds) => {
    try {
      console.log("Email ids received: ", emailIds);

      if (!emailIds) return;

      const res = await runTransaction(db, async (transaction) => {
        try {
          const groupSnap = await getGroup(transaction, emailIds);

          const userChatSnap = [];

          for (const email of emailIds) {
            const chatSnap = await getChatSpace(transaction, email);
            userChatSnap.push(chatSnap);
          }

          console.log("Users and chats details: ", groupSnap, userChatSnap);

          if (groupSnap.exists()) {
            console.log("Group already exist..");
            throw new Error("Group already exists");
          }

          await setGroup(transaction, groupSnap, {
            messages: [],
            members: emailIds,
            timestamp: Date.now(),
          });

          for (const user of userChatSnap) {
            await notifyUser(transaction, user, groupSnap);
          }

          console.log("Create group transcation complete");

          return { id: groupSnap.id, ...groupSnap.data() };
        } catch (error) {
          console.log(error.message);

          return Promise.reject(error.message);
        }
      });

      console.log("Group created: ", res);

      return res;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);
