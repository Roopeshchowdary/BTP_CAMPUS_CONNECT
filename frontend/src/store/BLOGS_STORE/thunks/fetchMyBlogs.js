import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  getCountFromServer,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../Firebase/firebase";

const MYBLOGS_PAGE_SIZE = 5;

export const fetchMyBlogsAsync = createAsyncThunk(
  "blogs/fetchMyBlogs",
  async (authorId, { getState }) => {
    try {
      const previousRecord = getState().blogsData.myBlogs.lastDocument;

      console.log(`Fetching blogs of author: ${authorId}`);
      console.log(`Previous record: `, previousRecord);

      let author = getState().userData.user;

      if (!author) {
        try {
          console.log(`Author not found, fetching author: ${authorId}`);
          const authorRef = doc(db, "users", authorId);
          const authorSnap = await getDoc(authorRef);
          author = { email: authorId, ...authorSnap.data() };
        } catch (error) {
          console.log(`Unable to fetch author ${authorId}: ${error.message}`);
        }
      }

      const blogCollection = collection(db, "blogs");

      let countQuery = null;

      if (!previousRecord) {
        countQuery = query(
          blogCollection,
          where("authorId", "==", authorId),
          orderBy("createdAt", "desc")
        );
      } else {
        countQuery = query(
          blogCollection,
          where("authorId", "==", authorId),
          orderBy("createdAt", "desc"),
          startAfter(previousRecord["createdAt"])
        );
      }

      const records = await getCountFromServer(countQuery);

      const hasNext = records.data().count > MYBLOGS_PAGE_SIZE;

      console.log("No of my blogs: ", records.data().count);

      let fetchQuery = null;

      if (!previousRecord) {
        fetchQuery = query(
          blogCollection,
          where("authorId", "==", authorId),
          orderBy("createdAt", "desc"),
          limit(MYBLOGS_PAGE_SIZE)
        );
      } else {
        fetchQuery = query(
          blogCollection,
          where("authorId", "==", authorId),
          orderBy("createdAt", "desc"),
          limit(MYBLOGS_PAGE_SIZE),
          startAfter(previousRecord["createdAt"])
        );
      }

      const snapshot = await getDocs(fetchQuery);
      const blogs = [];
      snapshot.docs.forEach((doc) =>
        blogs.push({ id: doc.id, ...doc.data(), author: author })
      );
      return { blogs, hasNext };
    } catch (error) {
      console.log("Error while fetching my blogs", error.message);
      throw error;
    }
  }
);
