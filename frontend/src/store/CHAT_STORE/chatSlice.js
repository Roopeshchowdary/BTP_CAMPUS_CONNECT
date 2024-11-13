import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { createChat } from "./thunks/createChat";
import { sendMessage } from "./thunks/sendMessage";
import { fetchChats } from "./thunks/fetchChats";
import { fetchMessages } from "./thunks/fetchMessages";
import { toast } from "react-toastify";

const chatAdaptor = createEntityAdapter({
  selectId: (a) => a.id,
  sortComparer: (a, b) => a.timestamp > b.timestamp,
});

const chatSlice = createSlice({
  name: "chatData",
  initialState: chatAdaptor.getInitialState({
    currentChatId: null,
  }),

  reducers: {
    appendChats: (state, action) => {
      console.log("Parameters received: ", action.payload.chats);

      if (action.payload.chats?.length === 0) {
        return;
      }

      state.currentChatId = action.payload.chats[0].id;

      const currentChatIndex = state.ids.findIndex(
        (e) => e.localeCompare(state.currentChatId) === 0
      );
      const tm = state.ids[0];

      state.ids[0] = state.ids[currentChatIndex];
      state.ids[currentChatIndex] = tm;

      chatAdaptor.addMany(state, action.payload.chats);
    },

    appendMessages: (state, action) => {
      const groupId = action.payload.groupId;

      const messages = action.payload.messages;

      console.log("Parameters received: ", groupId, messages);

      chatAdaptor.updateOne(state, {
        id: groupId,
        changes: {
          messages: [...state.entities[groupId].messages, ...messages],
          unseen: (state.entities[groupId]?.unseen || 0) + 1,
        },
      });
    },

    setCurrentChat: (state, action) => {
      state.currentChatId = action.payload.grouId;
      chatAdaptor.updateOne(state, {
        id: state.currentChatId,
        changes: {
          unseen: 0,
        },
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createChat.rejected, (_state, action) => {
        console.log("Error while creating chat: ", action.error);
        toast("Unable to create chat");
      })
      .addCase(createChat.fulfilled, (state, action) => {
        console.log("Parameters received: ", action.payload);
      })
      .addCase(sendMessage.rejected, (_state, action) => {
        console.log("Error while sending message: ", action.error);
        toast("Unable to send message");
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        console.log("Parameters received: ", action.payload);

        if (!state.entities[action.payload.groupId]) {
          console.log("Group doesn't exist to get messages");
          return;
        }

        chatAdaptor.updateOne(state, {
          id: action.payload.groupId,
          changes: {
            messages: [
              ...state.entities[action.payload.groupId].messages,
              action.payload.message,
            ],
          },
        });
      })
      .addCase(fetchChats.rejected, (_state, action) => {
        console.log("Error while fetching chats: ", action.error);
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        console.log("Parameters received: ", action.payload);

        if (action.payload.chats.length === 0) return;

        if (!state.currentChatId) {
          state.currentChatId = action.payload.chats[0].id;
        }
        chatAdaptor.addMany(state, action.payload.chats);
      })
      .addCase(fetchMessages.rejected, (_state, action) => {
        console.log("Error while fetching messages: ", action.error);
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        console.log("Parameters received: ", action.payload);

        if (!state.entities[action.payload.groupId]) {
          console.log("Group doesn't exist to get messages");
          return;
        }

        const messages = [
          ...state.entities[action.payload.groupId].messages,
          ...action.payload.messages,
        ];

        messages.sort((a, b) => a.timestamp < b.timestamp);

        chatAdaptor.updateOne(state, {
          id: action.payload.groupId,
          changes: {
            messages,
            isFetched: true,
          },
        });
      });
  },
});

export const { selectAll: selectAllChats, selectById: selectChatById } =
  chatAdaptor.getSelectors();

export const selectCurrentChat = createSelector([(state) => state], (state) => {
  const currentChatId = state.currentChatId;
  const currentChat = state.entities[currentChatId];
  return currentChat;
});

export const { appendChats, appendMessages, setCurrentChat } =
  chatSlice.actions;

export default chatSlice.reducer;
