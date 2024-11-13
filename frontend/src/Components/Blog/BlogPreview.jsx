import React, { useCallback } from "react";
import { auth, db } from "../../Firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import "./Bloglist.css";
import { FaRegBookmark } from "react-icons/fa";
import defaultImage from "../../assets/default_image.png";

const saveBlogToUserCollection = async (blog) => {
  const user = auth.currentUser;
  // console.log("user ")
  if (user) {
    const colRef = collection(db, "users");
  console.log(colRef);
    try {
      const userDocRef = doc(colRef, user.uid);
      const userSnapshot = await getDoc(userDocRef);
   
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const blogIds = userData.blogid || [];

        if (!blogIds.includes(blog.id)) {
          // Update the document with the new blog ID
          await updateDoc(userDocRef, {
            blogid: arrayUnion(blog.id),
          });

          // await setDoc(userDocRef, {userUid:user.uid}); // no need

          var myDiv = document.getElementById(`tooltip-${blog.id}`);
          myDiv.classList.add("active");
          setTimeout(() => {
            myDiv.classList.remove("active");
          }, 1000);

          //  console.log("Blog added to user collection successfully!");
        } else {
          // console.log("Blog already present in user collection.");

          var myDiv = document.getElementById(`tooltip-${blog.id}`);
          myDiv.classList.add("active");
          setTimeout(() => {
            myDiv.classList.remove("active");
          }, 1000);
        }
      } else {
        // User document does not exist, create user collection and add blog ID
        const user = {
          name: user.displayName,
          email: user.email,
          userUid: user.uid,
          blogid: [blog.id],
        };
        await setDoc(userDocRef, user);

        var myDiv = document.getElementById(`tooltip-${blog.id}`);
        myDiv.classList.add("active");
        setTimeout(() => {
          myDiv.classList.remove("active");
        }, 1000);
        //  console.log("User collection created, and blog added successfully!");
      }
    } catch (error) {
      console.error("Error updating user collection:", error);
    }
  }
};

const BlogPreview = ({ blog, className }) => {
  const navigate = useNavigate();

  const handleClick = useCallback((event, blogId) => {
    event.stopPropagation();
    navigate(`/blogs/${blogId}`);
  }, []);

  return (
    <div
      className={`blog-item ${className}`}
      onClick={(event) => handleClick(event, blog.id)}
    >
      <div className="blog-right">
        <div
          className="credentials"
          onClick={(event) => handleClick(event, blog.id)}
        >
          <div className="blog-author ">
            <img
              className="blog_author_img"
              src={blog.author?.photoURL ?? " "}
              alt=""
            />
            {blog.author?.name}
          </div>
        </div>

        <div
          className="m-0 pt-0 pb-0 pl-5 pr-2 md:pr-9 sm:pr-9 "
          onClick={(event) => handleClick(event, blog.id)}
        >
          <div className="text-xl font-bold text-shadow-sm capitalize text-justify pb-1 m-0  whitespace-normal line-clamp-3 md:line-clamp-2 sm:text[32px]   md:text-2xl lg:text-2xl">
            {blog.title}
          </div>
          <div className="text-[12px] lg:text-[14px] md:text-[14px]  text-gray-500 whitespace-normal text-justify m-0 line-clamp-3 sm:line-clamp-4  md:line-clamp-3  lg:line-clamp-2">
            {blog.shortDescription}
          </div>
        </div>
        <div className="meta_data_blog">
          <div className="date">{blog.date}</div>
          <div className="save-blogs-container relative">
            <div
              className="save_blog ml-4"
              onClick={() => saveBlogToUserCollection(blog)}
            >
              <span className="text-[#6B6B6B] ml-1 pl-2 pr-4 ">&middot;</span>
              <span id={`tooltip-${blog.id}`} className="tooltip">
                Saved
              </span>
              <FaRegBookmark className="m-0 p-0 absolute" />
            </div>
          </div>
          {blog.tags.length > 0 && (
            <div className="blog-tags">
              <span className="bg-gray-400 pl-2 pr-2 pt-2 pb-2 border rounded-md hidden md:block">
                {blog.tags[0]}
              </span>
            </div>
          )}
        </div>
      </div>
      <div
        className="flex-1 w-fit-content self-center justify-center h-fit-content"
        onClick={(event) => handleClick(event, blog.id)}
      >
        <img
          src={blog.image || defaultImage}
          alt={blog.title}
          className="w-3/4 h-4/5 sm:block rounded-md "
        />
      </div>
    </div>
  );
};

export default BlogPreview;
