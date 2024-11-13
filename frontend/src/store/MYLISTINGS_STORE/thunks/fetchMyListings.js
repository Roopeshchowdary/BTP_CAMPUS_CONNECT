import {
  collection,
  query,
  getCountFromServer,
  getDocs,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../../Firebase/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";

const LISTING_PAGE_SIZE = 5;

export const fetchMyListingsAsync = createAsyncThunk(
  "listingsData/fetchMyListings",
  async (userId, { getState }) => {
    try {
      const listingCollection = collection(db, "listing");
      const previousRecord = getState().myListingsData.listings.lastDocument;

      console.log("Fetch My listings dispatch: ");
      console.log("Previous Record: ", previousRecord);

      const countQuery = query(
        listingCollection,
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        startAfter(previousRecord ? previousRecord.createdAt : Infinity)
      );

      const records = await getCountFromServer(countQuery);

      console.log("No of Records: ", records.data().count);

      const hasNext = records.data().count > LISTING_PAGE_SIZE;

      const fetchQuery = query(
        listingCollection,
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(LISTING_PAGE_SIZE),
        startAfter(previousRecord ? previousRecord.createdAt : Infinity)
      );

      const snapshot = await getDocs(fetchQuery);
      const listings = [];
      snapshot.docs.forEach((doc) =>
        listings.push({ id: doc.id, ...doc.data() })
      );

      console.log("Fetched listings: ", listings, hasNext);
      return { listings, hasNext };
    } catch (error) {
      console.log("Error while fetching myListings: ", error.message);
      throw error;
    }
  }
);
