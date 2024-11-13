import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./BLOGS_STORE/blogSlice";
import userReducer from "./USER_STORE/userSlice";
import listingReducer from "./LISTINGS_STORE/listingSlice";
import recommendationReducer from "./RECOMMENDATION_STORE/recommendationSlice";
import myListingsData from "./MYLISTINGS_STORE/myListingsSlice";
import chatReducer from "./CHAT_STORE/chatSlice";

export const store = configureStore({
  reducer: {
    blogsData: blogsReducer,
    userData: userReducer,
    listingsData: listingReducer,
    recommendationData: recommendationReducer,
    myListingsData: myListingsData,
    chatData: chatReducer,
  },
});
