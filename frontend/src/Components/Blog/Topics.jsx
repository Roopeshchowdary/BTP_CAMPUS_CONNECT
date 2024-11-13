// HorizontalScrollableLogos.js

import React, { useState,useEffect } from "react";
import "./Topics.css";
import career from "./images/career.png";
import ai from "./images/ai.png";
import software from "./images/software.png";
import startup from "./images/startup.png";
import tech from "./images/tech.png";
import product from "./images/product.png";
import college from "./images/college.png";
import internship from "./images/internship.png";
import ml from "./images/ml.png";
import experiences from "./images/experiences.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
export const logos = [
  { id: 1, src: software, caption: "Software", value: "software" },
  { id: 2, src: career, caption: "Career", value: "career" },
  {
    id: 3,
    src: product,
    caption: "Product",
    value: "product",
  },
  {
    id: 4,
    src: internship,
    caption: "Internships",
    value: "internships",
  },
  {
    id: 5,
    src: college,
    caption: "College",
    value: "college",
  },
  {
    id: 6,
    src: ml,
    caption: "ML",
    value: "machinelearning",
  },
  {
    id: 7,
    src: experiences,
    caption: "Experiences",
    value: "experiences",
  },
  { id: 8, src: startup, caption: "Startup", value: "startup" },
  { id: 9, src: tech, caption: "Tech", value: "tech" },
  { id: 10, src: ai, caption: "AI", value: "ai" },
];

const Topics = ({ onTopicsChange }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleClick = (topic) => {
    // Toggle the selected state of the clicked topic
    const updatedTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter((t) => t !== topic)
      : [...selectedTopics, topic];
    // Update the state and notify the parent component
    setSelectedTopics(updatedTopics);
    onTopicsChange(updatedTopics);
  };
  const [visibleLogos, setVisibleLogos] = useState(logos.slice(0, 3));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    updateVisibleLogos();
  }, [currentIndex]);

  const updateVisibleLogos = () => {
    const newVisibleLogos = logos.slice(currentIndex, currentIndex + getVisibleCount());
    setVisibleLogos(newVisibleLogos);
  };
  const getVisibleCount = () => {
    if (window.innerWidth < 400 ) {
      return 3; // Show 3 images for small screens (mobile)
    } else if (window.innerWidth < 700) {
      return 5; // Show 5 images for medium screens
    } 
    else if (window.innerWidth < 1024) {
      return 5; // Show 5 images for medium screens
    } 
    else {
      // Adjust this value based on your requirements for larger screens
      return 5;
    }
  };


  const handleRightArrowClick = () => {
    const nextIndex = currentIndex + 1;
    const newVisibleLogos = logos.slice(nextIndex, nextIndex + 3);
    setVisibleLogos(newVisibleLogos);
    setCurrentIndex(nextIndex);
  };

  const handleLeftArrowClick = () => {
    const prevIndex = currentIndex - 1;
    const newVisibleLogos = logos.slice(prevIndex, prevIndex + 3);
    setVisibleLogos(newVisibleLogos);
    setCurrentIndex(prevIndex);
  };
  return (
    <div className="flex font-montserrat justify-center align-center text-sm font-semibold flex-row w-full sm:gap-9 pt-9">
      {currentIndex > 0 && (
        <button className="left-arrow" onClick={handleLeftArrowClick}>
          <FaChevronLeft />
        </button>
      )}
      {visibleLogos.map((logo) => (
        <div
          key={logo.id}
          className="flex flex-col justify-center align-center m-0 p-0 "
          onClick={() => handleClick(logo.value)}
        >
          <img src={logo.src} alt={logo.caption} className="logo-card-img sm:w-[120px] cursor-pointer"/>
          <p className="mt-15px whitespace-pre-line text-center" >{logo.caption}</p>
        </div>
      ))}
      {logos.length >  currentIndex + getVisibleCount() && (
        <button className="right-arrow" onClick={handleRightArrowClick}>
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default Topics;
