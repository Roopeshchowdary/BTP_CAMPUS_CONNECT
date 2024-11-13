import { collection, getDocs, orderBy, query, startAt, endAt } from "firebase/firestore";
import { debounce } from "../Utils/util";
import { db } from "../../Firebase/firebase";

async function searchUserNative(name) {
    const firstCapital = name.charAt(0).toUpperCase() + name.slice(1);

    const q = query(
        collection(db, "users"),
        orderBy("name"),
        startAt(firstCapital),
        endAt(firstCapital + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);

    const searchData = [];

    querySnapshot.forEach((doc) => {
        searchData.push({
            email: doc.id,
            name: doc.data().name,
            photoUrl: doc.data().photoURL
        });
    });
    return searchData;
}




const searchUser = debounce(searchUserNative, 500)

export default searchUser;