import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";


const ProfileData = {}

ProfileData.getProfile = function (email) {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            resolve(docSnap.data());
        } else {
            reject("No such document!");
        }
    })
}

ProfileData.updateProfile = function (email, data) {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, "users", email);
        await updateDoc(docRef, data);
        resolve("Document successfully updated!");
    })
}

ProfileData.updateFollowers = function (email, newFollower) {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef)
        const followers = !docSnap.data().followers ? [] : docSnap.data().followers;

        if (followers?.includes(newFollower)) {
            resolve("Already following");
            return;
        }
        await updateDoc(docRef, { followers: [...followers, newFollower] })

        resolve("Document successfully updated!");
    })

}

ProfileData.updateFollowing = function (email, newFollowing) {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef)
        const following = !docSnap.data().following ? [] : docSnap.data().following;

        if (following.includes(newFollowing)) {
            resolve("Already following");
            return;
        }
        await updateDoc(docRef, { following: [...following, newFollowing] })

        resolve("Document successfully updated!");
    })


}

ProfileData.recommendations = function (email) {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        const intrests = docSnap.data().intrests;

        if (intrests === undefined) {
            resolve([]);
            return;
        }


        const users = collection(db, "users");

        const querySnapshot = await getDocs(users);

        let recommendations = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            if (data.email !== email) {
                if (data.intrests === undefined) return;

                const common = data.intrests.filter((value) => intrests.includes(value));
                if (common.length > 0) {
                    recommendations.push(data);
                }
            }
        });

        resolve(recommendations[0] ?? []);


    })
}


export default ProfileData