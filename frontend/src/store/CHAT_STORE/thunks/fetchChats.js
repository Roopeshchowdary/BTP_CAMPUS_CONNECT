import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../Firebase/firebase";
import {
  collection,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";

export const fetchGroups = async (groupIds, email) => {
  try {
    if (!groupIds || groupIds.length === 0) return [];

    const groupCollection = collection(db, "groups");
    const usersCollection = collection(db, "users");

    const groupQuery = query(
      groupCollection,
      where(documentId(), "in", groupIds)
    );

    const groupsSnap = await getDocs(groupQuery);

    const chats = groupsSnap.docs.map((group) => ({
      ...group.data(),
      id: group.id,
      messages: [],
    }));

    const otherParticipantsEmails = chats.map((chat) => {
      if (email.localeCompare(chat.members[0]) === 0) return chat.members[1];
      return chat.members[0];
    });

    const otherParticipantsQuery = query(
      usersCollection,
      where(documentId(), "in", otherParticipantsEmails)
    );

    const otherParticipantsSnap = await getDocs(otherParticipantsQuery);

    const otherParticipants = {};

    for (const participant of otherParticipantsSnap.docs) {
      otherParticipants[participant.id] = {
        ...participant.data(),
        id: participant.id,
      };
    }

    console.log("Other participants fetched: ", otherParticipants);

    for (const group of chats) {
      const otherGroupParticipants = {};
      group.members.forEach((member) => {
        if (member.localeCompare(email) != 0) {
          otherGroupParticipants[member] = otherParticipants[member];
        }
      });
      group["otherParticipants"] = otherGroupParticipants;
      delete group["members"];
    }

    return chats;
  } catch (error) {
    console.log(error.message);

    throw error;
  }
};

export const fetchChats = createAsyncThunk(
  "chats/fetch-chats",
  async (email) => {
    try {
      console.log("Received parameters for chats fetching: ", email);

      const chatSpaceRef = doc(db, "userchats", email);
      const chatSpaceSnap = await getDoc(chatSpaceRef);

      if (!chatSpaceSnap.exists()) {
        console.log("Chat space doesn't exist");
        return { chats: [] };
      }

      const groupIds = chatSpaceSnap.data().groups;

      const chats = await fetchGroups(groupIds, email);

      console.log("Chats processed: ", chats);

      return { chats };
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
);
