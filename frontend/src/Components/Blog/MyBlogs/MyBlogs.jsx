import React, { useEffect } from "react";
import useFirebase from "../../../hooks/useFirebase";
import BlogPreview from "../BlogPreview";
import { useSelector } from "react-redux";
import {
  selectAllMyBlogs,
  selectMyBlogsInfo,
} from "../../../store/BLOGS_STORE/blogSlice";
import { BLOGS } from "../../../store/BLOGS_STORE/blogActions";
import { selectUser } from "../../../store/USER_STORE/userSlice";
import { Button } from "flowbite-react";

const MyBlogs = () => {
  const user = useSelector((state) => selectUser(state.userData));

  const myBlogs = useSelector((state) =>
    selectAllMyBlogs(state.blogsData.myBlogs)
  );

  const { isLoading, hasNext } = useSelector((state) =>
    selectMyBlogsInfo(state.blogsData.myBlogs)
  );

  useEffect(() => {
    if (user?.email) BLOGS.fetchMyBlogs(user.email, false);
  }, []);

  return (
    <>
      <div className="p-5 lg:max-w-[70%] md:max-w-[80%] sm:max-w-[90%] max-w-[100%] mx-auto">
        {myBlogs.map((blog) => (
          <BlogPreview
            blog={blog}
            key={blog.id}
            authorPhotoUrl={user.photoURL}
            className={"my-5"}
          />
        ))}
        {myBlogs.length === 0 && (
          <h1 className="text-xl text-gray-700 text-center mt-5 font-bold">
            Oops! you don't have any blogs. Create one
            <a
              href="/new_blog"
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 ml-2"
            >
              here
            </a>
          </h1>
        )}
      </div>
      {hasNext && (
        <Button
          size={"sm"}
          className="mx-auto my-2"
          onClick={() => BLOGS.fetchMyBlogs(user.email, true)}
          disabled={isLoading}
        >
          Load More
        </Button>
      )}
    </>
  );
};

export default MyBlogs;
