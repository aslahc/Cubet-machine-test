import React from "react";
import ProfileCard from "../components/UserProfile/ProfileCard";
import Navbar from "../components/layouts/Navbar";
import PostComponent from "../components/Post/PostComponent";

function UserProfile() {
  return (
    <div>
      <div className="mb-4">
        <Navbar />
      </div>
      <div className="flex justify-center mt-20 mx-4">
        <ProfileCard />
      </div>
      <PostComponent />
    </div>
  );
}

export default UserProfile;
