import { store } from "../store";
import { appendBlog, removeBlog, removeAllBlogs } from "./blogSlice";
import { fetchBlogAsync } from "./thunks/fetchBlog";
import { fetchBlogsAsync } from "./thunks/fetchBlogs";
import { fetchMyBlogsAsync } from "./thunks/fetchMyBlogs";
import { uploadBlogsAsync } from "./thunks/uploadBlog";

const BLOGS = function (data) {
  this.author = data.author;
  this.comments = data.comments;
  this.content = data.content;
  this.id = data.id;
  this.image = data.image;
  this.likes = data.likes;
  this.readtime = data.readtime;
  this.shortDescription = data.shortDescription;
  this.tags = data.tags;
  this.title = data.title;
  this.createdAt = data.createdAt;
};

BLOGS.fetchBlogs = () => {
  if (store.getState().blogsData.blogs.ids.length <= 1)
    store.dispatch(fetchBlogsAsync());
};

BLOGS.fetchMyBlogs = (authorId, hasToFetch) => {
  if (hasToFetch || store.getState().blogsData.myBlogs.ids.length <= 1)
    store.dispatch(fetchMyBlogsAsync(authorId));
};

BLOGS.fetchBlog = (id) => {
  if (!store.getState().blogsData.blogs.ids.includes(id))
    store.dispatch(fetchBlogAsync(id));
};

BLOGS.uploadBlog = (blogData) => {
  store.dispatch(uploadBlogsAsync(blogData));
};

BLOGS.appendBlog = (data) => {
  store.dispatch(appendBlog(data));
};

BLOGS.removeBlog = (id) => {
  store.dispatch(removeBlog(id));
};

BLOGS.removeAllBlogs = () => {
  store.dispatch(removeAllBlogs());
};

export { BLOGS };
