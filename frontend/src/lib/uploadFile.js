import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../Firebase/firebase";

export default async function (file, folderPath) {
  try {
    const fileRef = ref(storage, folderPath);
    await uploadBytes(fileRef, file, { contentType: file.type });
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
