import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

const initialState = {
  user: null,
  email: null,
};

const fetchUserAsync = createAsyncThunk(
  "user/fetchUser",
  async (_, { getState }) => {
    const storeUser = getState().userData.user;
    const storeEmail = getState().userData.email;

    if (storeUser) {
      return;
    }

    try {
      const docRef = doc(db, "users", storeEmail);
      const docSnap = await getDoc(docRef);
      const data = { email: storeEmail, ...docSnap.data() };
      return data;
    } catch (error) {
      console.log(error);
      return;
    }
  }
);

const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (data, { getState }) => {
    const storeEmail = getState().userData.email;

    try {
      const docRef = doc(db, "users", storeEmail);
      await updateDoc(docRef, data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }

  }
)

const userSlice = createSlice({
  name: "userdata",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    removeUser: (state) => {
      state.user = null;
      state.email = null;
    },

    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
    })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        if (action.payload) {
          const user = state.user;
          state.user = { ...user, ...action.payload };
        }
      })
  },
});

export const selectUser = createSelector(
  [(state) => state.user],
  (state) => state
);

export const { setUser, removeUser, setUserEmail } = userSlice.actions;
export { fetchUserAsync, updateUserAsync };
export default userSlice.reducer;
