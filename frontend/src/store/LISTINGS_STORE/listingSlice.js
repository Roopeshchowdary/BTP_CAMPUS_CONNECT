import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { fetchListingsAsync } from "./thunks/fetchListings";

const listingAdaptor = createEntityAdapter({
  selectId: (state) => state.id,
  sortComparer: (a, b) => b.applicants?.length > a.applicants?.length,
});

const listingSlice = createSlice({
  name: "listingsData",
  initialState: listingAdaptor.getInitialState({ isLoading: false }),

  reducers: {
    setListings: (state, action) => {
      listingAdaptor.addMany(state, action.payload);
    },

    appendListing: (state, action) => {
      listingAdaptor.addOne(state, action.payload);
      const listingId = action.payload.id;
      const index = state.ids.indexOf(listingId);
      const temp = state.ids[index];
      state.ids[index] = state.ids[0];
      state.ids[0] = temp;
    },

    removeListing: (state, action) => {
      listingAdaptor.removeOne(state, action.payload);
    },

    removeAllListings: (state) => {
      listingAdaptor.removeAll(state);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchListingsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchListingsAsync.fulfilled, (state, action) => {
        if (action.payload) {
          listingAdaptor.addMany(state, action.payload);
        }
        state.isLoading = false;
      });
  },
});

export const { selectAll: selectAllListings, selectById: selectListingById } =
  listingAdaptor.getSelectors();

export const { setListings, appendListing, removeAllListings, removeListing } =
  listingSlice.actions;

export const selectListingLoadingStatus = createSelector(
  [(state) => state.isLoading],
  (isLoading) => isLoading === true
);

export const selectListingByUserId = createSelector(
  [(state) => state.entities, (_state, userId) => userId],
  (entities, userId) => {
    const listings = Object.values(entities);
    const myListings = listings.filter(
      (listing) => listing?.userId.localeCompare(userId) === 0
    );
    return myListings;
  }
);

export default listingSlice.reducer;
