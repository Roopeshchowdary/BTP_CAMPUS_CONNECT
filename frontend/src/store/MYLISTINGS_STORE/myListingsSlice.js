import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { fetchApplicants } from "./thunks/fetchApplicants";
import { fetchMyListingsAsync } from "./thunks/fetchMyListings";

const myListingAdaptor = createEntityAdapter({
  selectId: (state) => state.id,
  sortComparer: (a, b) => b.applicants?.length > a.applicants?.length,
});

const applicantsAdaptor = createEntityAdapter({
  selectId: (state) => state.id,
  sortComparer: (a, b) => a.name?.localeCompare(b.name),
});

const myListingSlice = createSlice({
  name: "myListingsData",
  initialState: {
    listings: myListingAdaptor.getInitialState({
      isLoading: false,
      lastDocument: null,
      hasNext: false,
    }),
    applicants: applicantsAdaptor.getInitialState({ isLoading: false }),
  },

  reducers: {
    setMyListings: (state, action) => {
      if (action.payload.listing?.length == 0) return;

      state.listings.lastDocument = action.payload.listings[-1];
      state.listings.hasNext = action.payload.hasNext;
      myListingAdaptor.addMany(state.listings, action.payload);
    },

    appendMyListing: (state, action) => {
      myListingAdaptor.addOne(state.listings, action.payload);
    },

    removeMyListing: (state, action) => {
      myListingAdaptor.removeOne(state.listings, action.payload);
    },

    removeAllMyListings: (state) => {
      myListingAdaptor.removeAll(state.listings);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMyListingsAsync.pending, (state) => {
        state.listings.isLoading = true;
      })
      .addCase(fetchMyListingsAsync.fulfilled, (state, action) => {
        state.listings.isLoading = false;
        state.listings.isFetched = true;

        console.log("Payload received: ", action.payload);

        if (action.payload.listings?.length == 0) return;

        myListingAdaptor.addMany(state.listings, action.payload.listings);
        state.listings.lastDocument =
          action.payload.listings[action.payload.listings.length - 1];
        state.listings.hasNext = action.payload.hasNext;
      })
      .addCase(fetchApplicants.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          console.log("Payload recevied: ", action.payload);
          applicantsAdaptor.addMany(state.applicants, action.payload);
        }
      });
  },
});

export const {
  selectAll: selectAllMyListings,
  selectById: selectMyListingById,
} = myListingAdaptor.getSelectors();

export const {
  setMyListings,
  appendMyListing,
  removeMyListing,
  removeAllMyListings,
} = myListingSlice.actions;

export const selectMyListingInfo = createSelector(
  [(state) => state],
  (state) => ({ isLoading: state.isLoading, hasNext: state.hasNext })
);

export const selectApplicantsByIds = createSelector(
  [(state) => state, (_state, ids) => ids],
  (applicants, ids) => {
    const set = new Set(ids);
    return Object.values(applicants.entities).filter((applicant) =>
      set.has(applicant.id)
    );
  }
);

export default myListingSlice.reducer;
