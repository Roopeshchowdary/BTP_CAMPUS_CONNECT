import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

const initialState = {
    users: null,
}

const fetchRecommendationAsync = createAsyncThunk('recommendation/fetchRecommendation', async (_, { getState }) => {
    const intrests = getState().userData.user.selectedInterests ?? []
    const email = getState().userData.email
    const recommendedUsers = getState().recommendationData.users



    if (recommendedUsers) {
        return
    }

    if (!intrests) {
        return []
    }

    try {
        const users = collection(db, "users");

        const querySnapshot = await getDocs(users);

        let recommendations = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            if (data.email !== email) {
                if (data.intrests === undefined) return;

                const common = data.intrests.filter((value) => intrests.includes(value));
                if (common.length > 0) {
                    recommendations.push({ ...data, id: doc.id });
                }
            }
        });

        return recommendations
    } catch (error) {
        console.log(error);
        return
    }
})

const recommendationSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        setRecommendation: (state, action) => {
            state.users = action.payload
        },

        removeRecommendation: (state) => {
            state.users = null
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchRecommendationAsync.fulfilled, (state, action) => {
            if (action.payload) {
                state.users = action.payload
            }
        })

    }

})

export const { setRecommendation, removeRecommendation } = recommendationSlice.actions
export { fetchRecommendationAsync }
export default recommendationSlice.reducer