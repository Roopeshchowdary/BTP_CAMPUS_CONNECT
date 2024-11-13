import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchBlogAsync } from "./thunks/fetchBlog";
import { fetchMyBlogsAsync } from "./thunks/fetchMyBlogs";
import { fetchBlogsAsync } from "./thunks/fetchBlogs";
import { uploadBlogsAsync } from "./thunks/uploadBlog";

export const blogAdaptor = createEntityAdapter({
  selectId: (state) => state.id,
});

export const myBlogAdaptor = createEntityAdapter({
  selectId: (state) => state.id,
});

const blogSlice = createSlice({
  name: "blogsdata",
  initialState: {
    blogs: blogAdaptor.getInitialState(),
    myBlogs: myBlogAdaptor.getInitialState({
      isLoading: false,
      hasNext: false,
      lastDocument: null,
    }),
  },

  reducers: {
    appendBlog: (state, action) => {
      blogAdaptor.addOne(state.myBlogs, action.payload);
      const blogId = action.payload.id;
      const index = state.myBlogs.ids.indexOf(blogId);
      const temp = state.myBlogs.ids[index];
      state.myBlogs.ids[index] = state.myBlogs.ids[0];
      state.myBlogs.ids[0] = temp;
    },

    removeBlog: (state, action) => {
      blogAdaptor.removeOne(state.myBlogs, action.payload);
    },

    setBlogs: (state, action) => {
      blogAdaptor.addAll(state.blogs, action.payload);
    },

    removeAllBlogs: (state) => {
      blogAdaptor.removeAll(state.blogs);
      myBlogAdaptor.removeAll(state.myBlogs);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogsAsync.fulfilled, (state, action) => {
        if (action.payload.length > 0)
          blogAdaptor.addMany(state.blogs, action.payload);
      })
      .addCase(uploadBlogsAsync.fulfilled, () => {
        toast("Blog uploaded successfully");
      })
      .addCase(uploadBlogsAsync.rejected, () => {
        toast("Unable to upload the blog");
      })
      .addCase(fetchBlogAsync.fulfilled, (state, action) => {
        if (action.payload) blogAdaptor.addOne(state.blogs, action.payload);
      })
      .addCase(fetchMyBlogsAsync.pending, (state) => {
        state.myBlogs.isLoading = true;
      })
      .addCase(fetchMyBlogsAsync.fulfilled, (state, action) => {
        console.log("Payload received: ", action.payload);

        state.myBlogs.lastDocument =
          action.payload.blogs[action.payload.blogs.length - 1];
        state.myBlogs.hasNext = action.payload.hasNext;

        if (action.payload.blogs.length > 0)
          myBlogAdaptor.addMany(state.myBlogs, action.payload.blogs);

        state.myBlogs.isLoading = false;
      })
      .addCase(fetchMyBlogsAsync.rejected, (state, action) => {
        console.log(action.error);
        toast("Unable to fetch blogs");
        state.myBlogs.isLoading = false;
      });
  },
});

export const { appendBlog, removeBlog, setBlogs, removeAllBlogs } =
  blogSlice.actions;

export const { selectAll: selectAllBlogs, selectById: selectBlogById } =
  blogAdaptor.getSelectors();

export const { selectAll: selectAllMyBlogs, selectById: selectMyBlogById } =
  myBlogAdaptor.getSelectors();

export const selectMyBlogsInfo = createSelector([(state) => state], (state) => {
  return { isLoading: state.isLoading, hasNext: state.hasNext };
});

export default blogSlice.reducer;
