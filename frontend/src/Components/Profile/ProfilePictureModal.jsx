import React, { useState, useCallback } from "react";
import { db } from "../../Firebase/firebase";
import "firebase/storage";
import "./ProfilePictureModal.css";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDocs, doc, collection, addDoc, setDoc } from "firebase/firestore";

import { v4 } from "uuid";
import useFirebase from "../../hooks/useFirebase";
import useStatus from "../../hooks/useStatus";
import AbsoluteSpinner from "../Utils/AbsoluteSpinner";
import { toast } from "react-toastify";

const ProfilePictureModal = ({ isOpen, setOpen }) => {
  const { user } = useFirebase();
  const usersCollection = collection(db, "users");
  const { isLoading, setLoading, setIdle } = useStatus();

  const storage = getStorage();

  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
  };

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSave = useCallback(async () => {
    if (!image) return;

    setLoading();

    try {
      const imageRef = ref(storage, `user_images/${image.name + v4()}`);

      await uploadBytes(imageRef, image);

      const imageUrl = await getDownloadURL(imageRef);

      console.log(user);

      const userDocRef = doc(usersCollection, user.uid);

      const updateData = {
        profilepic: imageUrl,
      };

      await setDoc(userDocRef, updateData, { merge: true });
    } catch (error) {
      toast("Unable to upload the image");
      console.error(error.message);
    } finally {
      setIdle();
    }

    onClose();
  }, [image, setLoading, setIdle, usersCollection, user, onClose]);

  return (
    <div className={`profile-picture-modal ${isOpen ? "open" : ""} relative`}>
      <div className="modal-content">
        <h2>Upload Profile Picture</h2>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
      {isLoading ? <AbsoluteSpinner /> : null}
    </div>
  );
};

export default ProfilePictureModal;
