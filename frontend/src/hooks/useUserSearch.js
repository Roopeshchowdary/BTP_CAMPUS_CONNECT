import { useState } from "react";
import searchUser from "../Components/Profile/searchProfile";

const useUserSearch = () => {
    const [userSearchQuery, setUserSearchQuery] = useState('');

    const fetchUsers = async () => {
        const response = await searchUser(userSearchQuery);
        return response;
    }

    return {
        userSearchQuery,
        fetchUsers,
    };
}

export default useUserSearch;