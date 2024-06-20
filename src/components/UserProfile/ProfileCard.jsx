import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreatePost from "../Post/CreatePost";

function ProfileCard() {
  const navigate = useNavigate();
  const [showCreatePost, setShowCreatePost] = useState(false);

  const LoggedUserData = useSelector((state) => state.LoggedUser.items[0]);

  const handleEditProfile = () => {
    navigate("/editProfile");
  };

  const handleCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };

  const followersCount = LoggedUserData?.followers?.length || 0;
  const followingCount = LoggedUserData?.following?.length || 0;

  return (
    <div className="w-full bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <div className="relative">
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={handleCreatePost}
            className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="w-16 h-16 rounded-full mr-4"
              src={LoggedUserData?.profileImage || "/download.png"}
              alt={LoggedUserData?.name || "User"}
            />
            <div>
              <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
                {LoggedUserData?.name || "User"}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {LoggedUserData?.email || "No email provided"}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-8 mx-8">
            <div className="text-center">
              <span className="font-semibold text-green-500 dark:text-white">
                {followersCount}
              </span>
              <span className="block text-xs text-white dark:text-gray-400">
                Followers
              </span>
            </div>
            <div className="text-center">
              <span className="font-semibold text-green-500 dark:text-white">
                {followingCount}
              </span>
              <span className="block text-xs text-white dark:text-gray-400">
                Following
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-white dark:text-gray-400">
            <span className="font-bold text-white">
              {LoggedUserData?.bio || "No bio available"}
            </span>
          </p>
        </div>
        <div className="flex justify-between mt-6">
          {/* <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0H6"
              />
            </svg>
            Add Friend
          </button> */}

          <button
            onClick={handleEditProfile}
            className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit Profile
          </button>
        </div>
      </div>
      {showCreatePost && <CreatePost handleCreatePost={handleCreatePost} />}
    </div>
  );
}

export default ProfileCard;
