import React from "react";
import Navbar from "../components/layouts/Navbar";
import PostComponent from "../components/Post/PostComponent";
import SearchUser from "../components/UserProfile/SearchUser";

function Home() {
  return (
    <div>
      <Navbar />

      <div className="flex justify-center">
        <div className="w-3/4 mt-12">
          {" "}
          <h2>Home Page</h2>
          <PostComponent />
        </div>
        <div className="w-1/3 mt-12 mx-4 ">
          {" "}
          <SearchUser />
        </div>
      </div>
    </div>
  );
}

export default Home;
