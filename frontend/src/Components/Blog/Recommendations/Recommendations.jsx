// src/UserList.js
import { useEffect } from "react";

import "./Recommendations.css";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RECOMMENDATION } from "../../../store/RECOMMENDATION_STORE/recommendationActions";
import { Skeleton } from "../../../components/ui/skeleton";

function Recommendations() {
  const navigate = useNavigate();

  const recommendedUsers = useSelector(
    (state) => state.recommendationData.users
  );
  const user = useSelector((state) => state.userData.user);

  useEffect(() => {
    RECOMMENDATION.fetchRecommendation();
  }, [user]);

  function handleClick(id) {
    navigate(`/user/${id}`);
  }

  if (!recommendedUsers)
    return (
      <div className="user-list">
        <h2>Your Recommendations</h2>
        {[...Array(5)].map((_, i) => (
          <Skeleton className="user-card" key={i}>
            <div className="user-profile-pic">
              <div className="skeleton w-full rounded-full h-full"></div>
            </div>
            <div className="user-details">
              <div className="user-name">
                <div className="skeleton w-2/3"></div>
              </div>
              <div className="user-bio">
                <div className="skeleton w-2/3"></div>
              </div>
            </div>
          </Skeleton>
        ))}
      </div>
    );

  return (
    <div className="user-list">
      <h2>Your Recommendations</h2>
      {recommendedUsers.map((user) => (
        <div
          className="user-card"
          key={user.id}
          onClick={() => handleClick(user.id)}
        >
          <div className="user-profile-pic">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="pic"
                className="w-full rounded-full h-full"
              />
            )}
          </div>
          <div className="user-details">
            <div className="user-name">{user.name}</div>
            <div className="user-bio">{user.bio}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Recommendations;
