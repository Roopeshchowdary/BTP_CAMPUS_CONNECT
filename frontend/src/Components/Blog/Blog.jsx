import BlogComponent from "./BlogComponent";
import AbsoluteSpinner from "../Utils/AbsoluteSpinner";
import { useSelector } from "react-redux";
import { selectBlogById } from "../../store/BLOGS_STORE/blogSlice";
import { useParams } from "react-router-dom";
import useStatus from "../../hooks/useStatus";
import { useEffect } from "react";
import { BLOGS } from "../../store/BLOGS_STORE/blogActions";

const Blog = () => {
  const { id } = useParams();
  const blog = useSelector((state) =>
    selectBlogById(state.blogsData.blogs, id)
  );

  const { isLoading, setLoading, setIdle } = useStatus();

  useEffect(() => {
    if (blog) {
      setIdle();
      return;
    }

    setLoading();
    BLOGS.fetchBlog(id);
  }, [blog]);

  if (isLoading) {
    return <AbsoluteSpinner />;
  }

  return blog ? <BlogComponent blog={blog} /> : <AbsoluteSpinner />;
};

export default Blog;
