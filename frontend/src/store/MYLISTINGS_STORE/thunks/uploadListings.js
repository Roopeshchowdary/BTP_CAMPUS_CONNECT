import { appendMyListing, removeMyListing } from "../myListingsSlice";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db } from "../../../Firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const uploadListingsAsync = createAsyncThunk(
  "myListingsData/uploadListings",
  async (data, { dispatch }) => {
    var listingId = uuid();

    console.log("Listing: ", data);

    dispatch(appendMyListing({ ...data, id: listingId }));

    try {
      const listingRef = doc(db, "listing", listingId);
      await setDoc(listingRef, data);
    } catch (error) {
      dispatch(removeMyListing(listingId));
      console.log(error.message);
    }
  }
);
