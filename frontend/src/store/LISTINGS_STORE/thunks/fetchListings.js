import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../Firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchListingsAsync = createAsyncThunk(
  "listingsData/fetchListings",
  async () => {
    try {
      const listingCollection = collection(db, "listing");
      const snapshot = await getDocs(listingCollection);
      const listings = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      return listings;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
