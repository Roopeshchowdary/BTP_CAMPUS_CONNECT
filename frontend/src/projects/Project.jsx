import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {projectsData} from "./data"
import { auth, db } from "./../Firebase/firebase";
import {doc , setDoc , getDocs, collection} from "firebase/firestore"

const ProjectCard = ({ project }) => {
  const {
    title,
    technologies,
    description,
    mentor,
    coMentor,
    whatsapplink,
    projectLink,
  } = project;
  const navigate = useNavigate();
  const ViewProfile = (id) => {
    navigate(`/user/${id}`);
  };
  // const handleClick = (url) => {
  //   window.open(url, "_blank");
  // };

  const user = auth.currentUser;
  const firestore = db;
  const collectionName = 'user_for_Gsoc';
  const collectionRef = collection(firestore, collectionName);

  const handleClick = async () => {
    await setDoc(doc(db,"user_for_Gsoc", user.uid),{
      displayName: user.displayName,
      email : user.email,
      photoURL: user.photoURL,
      uid: user.uid
    })

    await setDoc(doc(db,"userchats", user.uid),{

    })
  }
  getDocs(collectionRef)
  .then((querySnapshot) => {
      // Loop through each document in the collection
      querySnapshot.forEach((doc) => {
          // Print the document data to the console
        ///  console.log(doc.id, '=>', doc.data());
      });
  })
  .catch((error) => {
      console.error("Error getting documents: ", error);
  });
  return (
    <div className="w-full md:w-[30%]">
      <div className=" w-full h-fit p-4 bg-white bg-opacity-90 rounded-lg border-white-900 flex flex-col justify-center items-start">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="  border flex flex-row flex-wrap gap-x-3 gap-y-2">
          {technologies.map((technology, index) => (
            <p
              key={index}
              className="bg-blue-500 text-white text-xs rounded-md px-2 py-1 "
            >
              {technology}
            </p>
          ))}
        </div>
        <div className=" text-gray-700 text-wrap">
          Description: {description}
        </div>

        <div className="mb-2">
          <div className="flex flex-row gap-x-1">
            <p>Mentor: </p>
            <div
              onClick={() => ViewProfile(mentor.email)}
              className="text-blue-500 cursor-pointer"
            >
              {mentor.name}
            </div>
          </div>
          <div className="flex flex-row gap-x-1">
           <p> Co-Mentor:{" "}</p>
            <div
              onClick={() => ViewProfile(coMentor.email)}
              className="text-blue-500 cursor-pointer"
            >
              {coMentor.name}
            </div>
          </div>
        </div>
        <div className="text-right m flex flex-row justify-between gap-1">
          {/* <button
            className="bg-blue-500 text-white rounded-md  p-2 sm:p-3 md:4 lg:p-2"
            onClick={() => handleClick(whatsapplink)}
          >
            Join Channel
          </button> */}
          <button
            className="bg-blue-500 text-white rounded-md p-2 sm:p-3 md:4 lg:p-2"
            onClick={() => handleClick(projectLink)}
          >
            View Project
          </button>
          <button onClick={handleClick} 
           className="bg-blue-500 text-white rounded-md p-2 sm:p-3 md:4 lg:p-2">
            join
          </button>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-20 bg-blue-900 flex flex-col items-center justify-center w-full">
      <h1 className="text-5xl text-white text-center mb-20">Projects</h1>
      <input
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full md:w-2/3 p-2 rounded-full opacity-50 mb-20 "
      />
      <div className="w-full h-auto flex flex-col  md:flex-row  flex-wrap  items-center justify-center md:justify-start gap-x-3 gap-y-4 ">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div>
            <h2 className="text-white font-bold">No Projects found </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
