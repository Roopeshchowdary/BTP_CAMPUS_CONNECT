import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../Firebase/firebase";


const blogCollection = collection(db, "blogs");



const addLike = (blogId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const blogDocRef = doc(blogCollection, blogId);
            const docSnapshot = await getDoc(blogDocRef);

            if (docSnapshot.exists()) {
                const blogData = docSnapshot.data();
                const updatedLikes = blogData.likes ? [...blogData.likes, userId] : [userId];
                await setDoc(blogDocRef, { ...blogData, likes: updatedLikes });
                resolve(true);
            }
            else {
                console.log("Document not found");
                reject(false);
            }
        } catch (error) {
            console.error("Error fetching blog data:", error);
            reject(false);
        }
    })
};

const removeLike = async (blogId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const blogDocRef = doc(blogCollection, blogId);
            const docSnapshot = await getDoc(blogDocRef);

            if (docSnapshot.exists()) {
                const blogData = docSnapshot.data();
                const updatedLikes = blogData.likes?.filter((like) => like !== userId) || [];
                await setDoc(blogDocRef, { ...blogData, likes: updatedLikes });
                resolve(true);
            }
            else {
                console.log("Document not found");
                reject(false);
            }
        } catch (error) {
            console.error("Error fetching blog data:", error);
            reject(false);
        }
    })
}

const addComment = async (blogId, comment) => {
    return new Promise(async (resolve, reject) => {
        try {
            const blogDocRef = doc(blogCollection, blogId);
            const docSnapshot = await getDoc(blogDocRef);

            if (docSnapshot.exists()) {
                const blogData = docSnapshot.data();
                const updatedComments = blogData.comments ? [...blogData.comments, comment] : [comment];
                await setDoc(blogDocRef, { ...blogData, comments: updatedComments });
                resolve(true);
            }
            else {
                console.log("Document not found");
                reject(false);
            }
        } catch (error) {
            console.error("Error fetching blog data:", error);
            reject(false);
        }
    })
};

export { addLike, removeLike, addComment }
