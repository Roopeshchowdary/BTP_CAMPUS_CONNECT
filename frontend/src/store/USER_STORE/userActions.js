import { doc, getDoc } from "firebase/firestore";
import { store } from "../store";
import { setUser, removeUser, setUserEmail, fetchUserAsync, updateUserAsync } from "./userSlice";
import { db } from "../../Firebase/firebase";

const USER = function (data) {
  this.name = data.name;
  this.about = data.about;
  this.bio = data.bio;
  this.followers = data.followers;
  this.following = data.following;
  this.github = data.github;
  this.twitter = data.twitter;
  this.linkedin = data.linkedin;
  this.selectedInterests = data.selectedInterests;
  this.photoURL = data.photoURL;
  this.position = data.position;
  this.universityName = data.universityName;
  this.yearOfStudy = data.yearOfStudy;
};

USER.fetchUser = () => {
  if (store.getState().userData.user) return;
  store.dispatch(fetchUserAsync());
};

USER.updateUser = (data) => {
  return new Promise((resolve, reject) => {
    store.dispatch(updateUserAsync(data))
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });

}

USER.removeUser = () => {
  store.dispatch(removeUser());
};

USER.setUser = (data) => {
  store.dispatch(setUser(data));
};

USER.setUserEmail = (data) => {
  store.dispatch(setUserEmail(data));
};

export { USER };
