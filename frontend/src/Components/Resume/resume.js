import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../Firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";

export async function getPreviousResumeLink(email) {
  try {
    if (!email) return;
    const resumeRef = ref(storage, `/resume/${email}`);
    const url = await getDownloadURL(resumeRef);
    return url;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function updateResumeLink(email, link) {
  try {
    if (!email) return;
    const userRef = doc(db, "users", email);
    await updateDoc(userRef, {
      resume: link,
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
