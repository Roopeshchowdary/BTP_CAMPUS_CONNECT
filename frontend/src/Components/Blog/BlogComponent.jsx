import "./BlogComponent.css";

import SocialTab from "./SocialComponents/SocialTab";

import useFirebase from "../../hooks/useFirebase";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { USER } from "../../store/USER_STORE/userActions";

function BlogComponent({ blog }) {
  const { user } = useFirebase();

  const savedUser = useSelector((state) => state.userData.user);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    USER.fetchUser();
  }, []);

  useEffect(() => {
    if (!user || !blog.likes) return;
    setIsLiked(blog.likes.includes(user.uid));
  }, [user, blog]);

  return (
    <>
      <div className="outerblog">
        <div className="flex bg-transparent font-Montserrat flex-col items-start text-20px shadow-md pl-2 pr-2 pt-2 pb-2 rounded-8px bg-white max-w-90vw m-0 justify-center">
          <div className="flex overflow-hidden  pl-2 pr-2 pb-2 justify-start ">
            <h2 className="blog-title">
              {blog.title}
            </h2>
          </div>
          <div className="pt-4 pl-2 pb-2 flex flex-row  w-full h-[20%] md:h-[90%] gap-3 align-center">
            <img
              src={blog.author?.photoURL ?? ""}
              alt="author"
              className="max-w-3/4 md:max-h-1/3 lg:max-h-1/4 md:border-none border border-gray-300 rounded-full   w-[32px] h-[32px]"
            />
            <p className="">
              {" "}
              <b>{blog.author?.name}</b>
            </p>
            <p>
              {" "}
              <b>{blog.date}</b>
            </p>
            <p>
              {" "}
              <div className="flex flex-grow-0 justify-end">
                {blog.tags && (
                  <b className="bg-gray-200 p-1 mx-1  sm:justify-self border round-md md:justify-end">
                    {blog.tags[0]}
                  </b>
                )}
              </div>
            </p>
          </div>

          <br />
          <div className="mt-1 mb-2 mx-auto pt-1 border w-[80%] h-1 bg-black"></div>
          <div className="flex flex-row justify-center align-center  w-full h-[20%] mb-6">
            {blog.image && <img src={blog.image} alt="blog-image" />}
          </div>
          <div
            className="blog-text-data text-left md:text-justify pr-10 pl-10 md:pl-7 md:pr-7 text-base md:text-lg "
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <SocialTab
            likes={blog.likes ? blog.likes.length : 0}
            comments={blog.comments ?? []}
            blogId={blog.id}
            user={{
              uid: user?.uid,
              photoURL: savedUser?.photoURL,
              displayName: savedUser?.name,
            }}
            isliked={isLiked}
          />
        </div>
      </div>
    </>
  );
}

export default BlogComponent;
