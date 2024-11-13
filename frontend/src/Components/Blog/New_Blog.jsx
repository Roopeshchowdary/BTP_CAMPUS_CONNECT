import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { auth } from "../../Firebase/firebase";
import { db } from "../../Firebase/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression";

import { v4 } from "uuid";

import { getDocs, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./New_Blog.css";
import useStatus from "../../hooks/useStatus";
import useFirebase from "../../hooks/useFirebase";
import AbsoluteSpinner from "../Utils/AbsoluteSpinner";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { USER } from "../../store/USER_STORE/userActions";
import { BLOGS } from "../../store/BLOGS_STORE/blogActions";
import { set } from "lodash";

const New_Blog = () => {
  const blogsCollection = collection(db, "blogs");
  const navigate = useNavigate();
  const navigateBack = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState(null);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [publishing, setPublishing] = useState(false); // State to manage the image modal
  const storage = getStorage();
  const { user, email } = useSelector((state) => state.userData);

  useEffect(() => {
    USER.fetchUser();
  }, [user]);

  const { isLoading, setLoading, setIdle } = useStatus();

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, "bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  const handleAddTag = () => {
    if (tags.length < 3 && tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };
  const handleClose = () => {
    // Navigate back to the previous page
    navigateBack(-1);
  };
  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const size = file.size;
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    if (size / 1024 > 2000) {
      let output;
      imageCompression(file, options).then((x) => {
        output = x;
        setImage(output);
      });
      return;
    }
    setImage(file);
  };

  const openImageModal = () => {
    if (!image) {
      document.getElementById("whole").style.opacity = 0.5;
      setImageModalOpen(true);
    }
  };

  const closeImageModal = () => {
    document.getElementById("whole").style.opacity = 1;
    setImageModalOpen(false);
  };

  function formatDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });

    function getDayWithSuffix(day) {
      if (day >= 11 && day <= 13) {
        return day + "th";
      }
      switch (day % 10) {
        case 1:
          return day + "st";
        case 2:
          return day + "nd";
        case 3:
          return day + "rd";
        default:
          return day + "th";
      }
    }

    const formattedDate = `${getDayWithSuffix(day)} ${month}`;

    return formattedDate;
  }

  function calculateReadingTime(text, wordsPerMinute = 200) {
    const wordCount = text.split(/\s+/).length;

    const readingTimeMinutes = wordCount / wordsPerMinute;

    return Math.ceil(readingTimeMinutes);
  }

  function extractFirstSentence(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    let firstSentence = "";

    const textNodes = doc.body.childNodes;
    for (let i = 0; i < textNodes.length; i++) {
      const textNode = textNodes[i];
      if (textNode.nodeType === Node.TEXT_NODE) {
        const text = textNode.textContent.trim();
        if (text) {
          const sentences = text.split(/[.!?]/);

          for (const sentence of sentences) {
            if (sentence.trim()) {
              firstSentence = sentence.trim();
              break;
            }
          }
          if (firstSentence) {
            break;
          }
        }
      }
    }

    return firstSentence;
  }

  const Publish = async () => {
    setContent(DOMPurify.sanitize(content));
    setLoading();

    const sanitizedContent = content?.replace(/<\/?[^>]+>/g, "");
    const date = new Date();
    const formattedDate = formatDate(date);
    const blogData = {
      title: title,
      content: content,
      tags: tags,
      date: formattedDate,
      readtime: calculateReadingTime(content),
      shortDescription:
        extractFirstSentence(sanitizedContent).substring(0, 400) + "...",
      authorId: user.email,
      author: {
        name: user.name,
        email: user.email,
        photoURL: user.photoURL,
      },
      createdAt: Date.now(),
    };

    if (image) {
      const imageRef = ref(storage, `blog_images/${image.name + v4()}`);

      try {
        const snapshot = await uploadBytes(imageRef, image);
        const url = await getDownloadURL(snapshot.ref);
        blogData.image = url;
        console.log("Image URL:", url); // Add this line to check the image URL
      } catch (error) {
        toast("Image size should be less than 2 MB ");
        console.error(error);
        setIdle();
        return;
      }
    }

    BLOGS.uploadBlog(blogData);
    setIdle();
    navigate("../myblogs");
  };

  if (isLoading) {
    return (
      <>
        <AbsoluteSpinner />
      </>
    );
  }

  return (
    <div className="blog-wrapper">
      {publishing && <span className="loader"></span>}
      {isImageModalOpen && (
        <div className="image-upload-modal  ">
          <h2 className="pb-3 ">Add an Image for the Blog</h2>
          <input
            type="file"
            id="imageInput"
            name="myImage"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleImageUpload}
            className="pb-3 pl-8"
          />
          <span className="close-icon" onClick={closeImageModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
              enableBackground="new 0 0 40 40"
            >
              <line
                x1="15"
                y1="15"
                x2="25"
                y2="25"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeMiterlimit="10"
              ></line>
              <line
                x1="25"
                y1="15"
                x2="15"
                y2="25"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeMiterlimit="10"
              ></line>
              <circle
                className="circle"
                cx="20"
                cy="20"
                r="19"
                opacity="0"
                stroke="#000"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeMiterlimit="10"
                fill="none"
              ></circle>
              <path
                d="M20 1c10.45 0 19 8.55 19 19s-8.55 19-19 19-19-8.55-19-19 8.55-19 19-19z"
                className="progress"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeMiterlimit="10"
                fill="none"
              ></path>
            </svg>
          </span>
          <button className="publish-from-modal" onClick={Publish}>
            Publish
          </button>
        </div>
      )}
      <div className="blog-editor" id="whole">
        <button className="publish-button" onClick={openImageModal}>
          Publish
        </button>
        <button className="close-button" onClick={handleClose}>
          Close
        </button>
        <input
          className="editor-title"
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
        />
        <div className="tags-container">
          <label htmlFor="tagInput"></label>
          <input
            className="tag-input"
            type="text"
            placeholder="Add Tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <button className="add-tag-button" onClick={handleAddTag}>
            Add Tag
          </button>
        </div>
        <div className="tags-container">
          {tags.map((tag, index) => (
            <div key={index} className="tag">
              {tag}
              <span className="remove-tag" onClick={() => handleRemoveTag(tag)}>
                ✖️
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default New_Blog;
