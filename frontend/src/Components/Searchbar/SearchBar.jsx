   
import React, { useState, useEffect } from "react";
import { usePage, PageProvider } from "../../Context/contextapi";
   function SearchBar({searchSetter}){

    const [searchText, setSearchText] = useState("");


    const handleSearchByTopic = () => {
        // Trigger search by calling searchByTopic with the entered search text
    
        searchByTopic(searchText);
      };
      const searchByTopic = (topic) => {
        const relatedTopic = topicKeywords[topic.toLowerCase()];
        const topicSet = new Set([topic.toLowerCase()]);
        if (relatedTopic) {
          topicSet.add(relatedTopic);
        }
        // Filter blogs based on the entered topic
        const filteredBlogs = blogs.filter((blog) => {
          if (blog.tags) {
            return blog.tags.some((tag) => topicSet.has(tag.toLowerCase()));
          }
        });
    
        console.log(filteredBlogs);
        setDisplayedBlogs(filteredBlogs);
        setSearchText("");
      };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          // Trigger search by calling searchByTopic with the entered search text
          searchByTopic(searchText);
        }
      };
 return (
 <>
  <div className="flex items-center justify-start mt-1 mb-3 w-full mx-1">
        <div className="flex w-[50%] space-x-1 mb-0 m-auto">
          <input
            type="text"
            className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Search..."
            
            onChange={(e) => searchSetter(e.target.value)}
            
          />
          <button
            className="px-4 text-white bg-black rounded-full"
            onClick={handleSearchByTopic}
          >
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
      </>)
   }
   export default SearchBar;