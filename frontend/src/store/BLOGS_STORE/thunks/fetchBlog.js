import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Firebase/firebase";

export const fetchBlogAsync = createAsyncThunk(
  "blogs/fetchBlog",
  async (blogId) => {
    try {
      const blogRef = doc(db, "blogs", blogId);
      const blogSnap = await getDoc(blogRef);
      const blog = { ...blogSnap.data(), id: blogId };
      const authorRef = doc(db, "users", blog.authorId);

      try {
        const authorSnap = await getDoc(authorRef);
        const author = authorSnap.data();

        blog["author"] = author;
      } catch (error) {
        console.log(
          `Error while fetching author ${blog.authorId}: ${error.message}`
        );
      }

      console.log(`Blog Fetched for id: ${blogId}`, blog);

      return blog;
    } catch (error) {
      console.log(`Error while fetching blog ${blogId}: ${error.message}`);
      throw error;
    }
  }
);
