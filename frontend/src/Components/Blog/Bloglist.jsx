import React, { useState, useEffect } from "react";
import "./Bloglist.css";
import Topics from "./Topics";
import { logos } from "./Topics";
import "@fontsource/montserrat";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/400-italic.css";
import { useNavigate } from "react-router-dom";

import Recommendations from "./Recommendations/Recommendations";
import { keywords } from "./TopicsData.js";

import BlogPreview from "./BlogPreview.jsx";
import { BLOGS } from "../../store/BLOGS_STORE/blogActions.js";
import { useSelector } from "react-redux";
import { Skeleton } from "../../components/ui/skeleton.jsx";
import { selectAllBlogs } from "../../store/BLOGS_STORE/blogSlice.js";

const BlogList = () => {
  const blogs = useSelector((state) => selectAllBlogs(state.blogsData.blogs));
  const [displayedBlogs, setDisplayedBlogs] = useState([]);

  const [selectedTopics, setSelectedTopics] = useState([]);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    BLOGS.fetchBlogs();
  }, []);

  useEffect(() => {
    if (blogs) {
      setDisplayedBlogs(blogs);
    }
  }, [blogs]);

  useEffect(() => {
    if (searchText === "") {
      if (blogs) {
        setDisplayedBlogs(blogs);
      }
      return;
    }

    searchText.length && filterBlogs();
  }, [searchText]);

  const handleTopicsChange = (selectedTopics) => {
    setSelectedTopics(selectedTopics);

    const filteredBlogs = blogs.filter((blog) =>
      selectedTopics.some((topic) => {
        const relativeKeywords = keywords[topic.toLowerCase()];
        const tages = new Set(blog.tags?.map((tag) => tag.toLowerCase()));
        relativeKeywords.push(topic.toLowerCase());
        if (relativeKeywords) {
          return relativeKeywords.some((keyword) =>
            tages.has(keyword.toLowerCase())
          );
        }
      })
    );

    setDisplayedBlogs(filteredBlogs);
  };

  function filterBlogs() {
    let newBlogs = displayedBlogs;
    newBlogs = newBlogs.filter((blog) => {
      return blog.title.toLowerCase().includes(searchText.toLowerCase());
    });

    setDisplayedBlogs(newBlogs);
  }

  const handleClearFilter = () => {
    selectedTopics.splice(0, selectedTopics.length);
    setSelectedTopics(selectedTopics);
    setDisplayedBlogs(blogs);
  };
  // func to retrive caption values for tags based on selected topics
  const selectedCaptions = selectedTopics.map((selectedValue) => {
    const matchingLogo = logos.find((logo) => logo.value === selectedValue);
    return matchingLogo ? matchingLogo.caption : null;
  });
  return (
    <>
      <div className="flex justify-center align-center w-full m-0 p-0 h-[100%] border-red-700 md:h-[70%] sm:h-[50%] mt-6">
        <div className="bg-blue-300 ml-4 mr-4 border rounded-md relative max-w-95vw flex flex-col w-full  sm:mr-8 sm:ml-8 sm:w-full">
          <a
            className="pt-6 pb-3 flex flex-row pl-5 lg:pl-10 md:pl-10"
            href="www.google.com"
            target="_blank"
          >
            {" "}
            <p className="inline-block text-blue-500 text-sm border-b border-blue-500 ">
              See Blogging Tutorial{" "}
            </p>{" "}
            <svg
              className="  w-8 h-6"
              viewBox="0 0 24 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.6875 16.8751L5.375 15.5626L14.375 6.56258H6.3125V4.68758H17.5625V15.9376H15.6875V7.87508L6.6875 16.8751Z"
                fill="#1C5CFF"
              />
            </svg>
          </a>
          <div className="pl-5 lg:pl-10 md:pl-10 text-black  text-2xl lg:text-3xl  font-montserrat   font-bold text-shadow--6px3px 2px2px">
            Write Your Own Blog
          </div>
          <div>
            {" "}
            <p className="font-montserrat text-base text-black  font-normal  pl-5 lg:pl-10 md:pl-10 pr-5 w-full pt-4 pb-2 text-justify">
              From technical tutorials to startup experiences, dive into a world
              of insights and learning.
            </p>
          </div>
          <div className="flex flex-row justify-end pb-2 pr-3  md:pb-5 md:pr-3  md:pt-0 sm:pb-5 sm:pr-3 ">
            <button
              className="bg-blue-500 text-white border-none cursor-pointer  text-lg rounded-md w-40 h-12 "
              onClick={() => {
                navigate("../new_blog");
              }}
            >
              Write ➔
            </button>
          </div>
        </div>
      </div>

      {/* search bar  */}
      <div className="flex items-center justify-start mt-5 mb-3 w-full  ml-4 lg:ml-9 md:ml-8 mr-2">
        <div className="flex  w-[90%] md:w-[50%] lg:w-[50%]  space-x-1 mb-0">
          <input
            type="text"
            className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="px-4 text-white bg-black rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex ">
        {blogs && blogs.length > 0 ? (
          <div className="flex flex-1 flex-col justify-start align-center ">
            <div className="m-0 pb-6">
              <Topics onTopicsChange={handleTopicsChange} />{" "}
            </div>
            <div className="flex flex-col items-center justify-center w-full h-fit ">
              <div className="flex items-center justify-center flex-row gap-x-3 p-2 flex-wrap gap-y-3 ">
                {selectedCaptions.map((topic) => (
                  <span className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center p-4">
                    {topic}
                  </span>
                ))}
              </div>
              <div>
                {displayedBlogs.length !== blogs.length && (
                  <button
                    className="text-center w-fit h-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 md:py-2 md:px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={() => handleClearFilter()}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col flex-wrap gap-15 w-60vw font-montserrat m-10">
              {displayedBlogs.map((blog, index) => (
                <BlogPreview blog={blog} key={index} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-start align-center w-full">
              <div className="m-0 pb-6">
                <Topics onTopicsChange={handleTopicsChange} />{" "}
              </div>
              <div>
                <div className="flex flex-col gap-5 font-montserrat m-10 h-full">
                  {[...Array(2)].map((_, i) => (
                    <Skeleton
                      className="h-60 bg-slate-200 rounded-md shadow-md"
                      key={i}
                    ></Skeleton>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        <div className="hidden sm:hidden md:block mr-8 ml-4">
          <Recommendations />
        </div>
      </div>
    </>
  );
};

export default BlogList;
