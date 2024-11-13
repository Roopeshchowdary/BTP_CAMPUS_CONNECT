import {
  collection,
  getDocs,
  where,
  orderBy,
  query,
  startAfter,
  getCountFromServer,
  limit,
} from "firebase/firestore";
import { db } from "../../../Firebase/firebase";

export const fetchMyBlogs = async (email, pageLimit, previousRecord) => {
  try {
    let countQuery = null;

    const blogCollection = collection(db, "blogs");

    if (!previousRecord) {
      countQuery = query(
        blogCollection,
        where("email", "==", email),
        orderBy("createdAt", "desc")
      );
    } else {
      countQuery = query(
        blogCollection,
        where("email", "==", email),
        orderBy("createdAt", "desc"),
        startAfter(previousRecord["createdAt"])
      );
    }

    const records = await getCountFromServer(countQuery);

    const hasNext = records.data().count > pageLimit;

    let fetchQuery = null;

    if (!previousRecord) {
      fetchQuery = query(
        blogCollection,
        where("email", "==", email),
        orderBy("createdAt", "desc"),
        limit(pageLimit)
      );
    } else {
      fetchQuery = query(
        blogCollection,
        where("email", "==", email),
        orderBy("createdAt", "desc"),
        limit(pageLimit),
        startAfter(previousRecord["createdAt"])
      );
    }

    const snapshot = await getDocs(fetchQuery);
    const blogs = [];
    snapshot.docs.forEach((doc) => blogs.push(doc.data()));
    return { blogs, hasNext };
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
