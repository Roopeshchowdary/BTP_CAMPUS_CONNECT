import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../Firebase/firebase";

export const fetchApplicants = createAsyncThunk(
  "listingsData/fetchApplicants",
  async (applicantIds, { getState }) => {
    try {
      console.log("Fetch applicants dispatch: ", applicantIds);

      const idSet = new Set(getState().myListingsData.applicants.ids);
      const getIds = applicantIds.filter((id) => !idSet.has(id));

      console.log("Applicants to be fetched: ", getIds);

      const applicantQuery = query(
        collection(db, "users"),
        where(documentId(), "in", getIds)
      );
      const applicantsSnap = await getDocs(applicantQuery);

      const applicants = [];

      for (const applicantDoc of applicantsSnap.docs) {
        applicants.push({ ...applicantDoc.data(), id: applicantDoc.id });
      }

      console.log("Applicants: ", applicants);

      return applicants;
    } catch (error) {
      console.log(
        `Error while fetching applicants for listingId: ${listingId} `,
        error.message
      );

      throw error;
    }
  }
);
