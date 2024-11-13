import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Profile from "../Profile";
import { useSelector } from "react-redux";
import { USER } from "../../../store/USER_STORE/userActions";
import { RECOMMENDATION } from "../../../store/RECOMMENDATION_STORE/recommendationActions";
import ProfileData from "../profile.modal";
import AbsoluteSpinner from "../../Utils/AbsoluteSpinner";

export default function OtherProfile() {
  const { emailId } = useParams();

  const [otherUser, setOtherUser] = useState(null);
  const { email } = useSelector((state) => state.userData);
  const { users } = useSelector((state) => state.recommendationData);

  useEffect(() => {
    USER.fetchUser();
    RECOMMENDATION.fetchRecommendation();
  }, []);

  useEffect(() => {
    if (users) {
      const user = users.find((user) => user.email === emailId);
      setOtherUser(user ?? null);
    }
  }, [users]);

  const fetchUserByEmail = async () => {
    try {
      const response = await ProfileData.getProfile(emailId);

      setOtherUser(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!users) return;
    fetchUserByEmail();
  }, [otherUser]);

  return otherUser ? (
    <Profile
      userData={{ ...otherUser, email: emailId }}
      editable={false}
      userEmail={email}
    />
  ) : (
    <AbsoluteSpinner />
  );
}
