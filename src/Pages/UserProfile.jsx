import React from "react";
import ProfileCard from "../components/UserProfile/ProfileCard";
import Navbar from "../components/layouts/Navbar";

function UserProfile() {
  return (
    <div>
      <div className="mb-4">
        <Navbar />
      </div>
      <div className="flex justify-center mt-20 mx-4">
        <ProfileCard />
      </div>
    </div>
  );
}

export default UserProfile;
