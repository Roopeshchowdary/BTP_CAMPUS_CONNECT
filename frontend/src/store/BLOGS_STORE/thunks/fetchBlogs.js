import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../../Firebase/firebase";

export const fetchBlogsAsync = createAsyncThunk(
  "blogs/fetchBlogs",
  async () => {
    try {
      const blogsCollection = collection(db, "blogs");
      const data = await getDocs(blogsCollection);
      const res = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      for (const blog of res) {
        try {
          const authorRef = doc(db, "users", blog.authorId);
          const authorSnap = await getDoc(authorRef);
          if (authorSnap.exists()) {
            const author = authorSnap.data();

            blog["author"] = {
              photoURL: author.photoURL,
              name: author.name,
              email: authorSnap.id,
            };
          }
        } catch (error) {
          console.log(
            `Error while fetching author: ${blog.authorId}: `,
            error.message
          );
        }
      }

      return res;
    } catch (error) {
      toast("Unable to fetch the blogs");
      console.log(error.message);
      return;
    }
  }
);
