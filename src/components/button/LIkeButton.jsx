import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../Store/Post";
import { useSelector } from "react-redux";

function LikeButton({ postId, likes }) {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false); // State to track like status
  const LoggedUserData = useSelector((state) => state.LoggedUser.items[0]);

  const handleLike = () => {
    if (!isLiked) {
      dispatch(likePost(postId, LoggedUserData.id));
    } else {
      dispatch(unlikePost(postId, LoggedUserData.id));
    }
    setIsLiked(!isLiked); // Toggle like status
  };

  return (
    <div className="flex items-center">
      <button onClick={handleLike} className="mr-2">
        {isLiked ? (
          <svg
            className="w-6 h-6 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0l.172.172.172-.172a4 4 0 115.656 5.656l-5.657 5.657a.75.75 0 01-1.06 0l-5.657-5.657a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"
            />
          </svg>
        )}
      </button>
      <span>{likes} Likes</span>
    </div>
  );
}

export default LikeButton;
