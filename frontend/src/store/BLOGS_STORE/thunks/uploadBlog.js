import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { appendBlog, removeBlog } from "../blogSlice";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../Firebase/firebase";

export const uploadBlogsAsync = createAsyncThunk(
  "blogs/uploadBlogs",
  async (blogData, { dispatch }) => {
    try {
      var blogId = uuid();

      dispatch(appendBlog({ ...blogData, id: blogId }));

      const blog = { ...blogData, id: blogId };

      if (blog?.author) {
        delete blog.author;
      }

      const blogRef = doc(db, "blogs", blogId);
      await setDoc(blogRef, blog);
    } catch (error) {
      dispatch(removeBlog(blogId));
      console.log(error);
      return;
    }
  }
);
