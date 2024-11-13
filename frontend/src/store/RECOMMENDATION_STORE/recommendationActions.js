import { collection, getDocs } from "firebase/firestore";
import { store } from "../store";
import { setRecommendation, removeRecommendation, fetchRecommendationAsync } from "./recommendationSlice";
import { db } from "../../Firebase/firebase";


const RECOMMENDATION = function (data) {
    this.users = data.users;
    //arrays of users
}



RECOMMENDATION.fetchRecommendation = () => {
    if (store.getState().recommendationData.users) return
    store.dispatch(fetchRecommendationAsync())
}

RECOMMENDATION.removeAllRecommendation = () => {
    const storeRecommendation = store.getState().recommendationData.users

    if (storeRecommendation) {
        store.dispatch(removeRecommendation())
    }
}

export { RECOMMENDATION }
