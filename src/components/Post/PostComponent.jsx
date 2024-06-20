import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import LikeButton from "../button/LIkeButton"; // Adjust the import path as per your project structure
import Comment from "./Comment";

function PostComponent() {
  const [openComment, setOpenComment] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const PostData = useSelector((state) => state.postData.items);

  const handleCommentBox = () => {
    setOpenComment(!openComment);
  };

  // Filter posts based on caption containing the searchTerm
  const filteredPosts = PostData.filter((post) =>
    post.caption.toLowerCase().includes(searchTerm.toLowerCase())
  ).reverse();

  return (
    <div className="max-w-xl mx-auto my-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden my-4"
          >
            <div className="flex items-center justify-between px-4 py-2 bg-gray-200 border-b border-gray-200">
              <div className="flex items-center">
                <div>
                  <span className="block font-semibold text-gray-700">
                    {post.name || "Unknown User"}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(post.date).toLocaleString()}
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 focus:outline-none">
                <i className="fas fa-ellipsis-h"></i>
              </button>
            </div>
            {post.image && (
              <div>
                <img src={post.image} alt="Post" className="w-full" />
              </div>
            )}

            <div className="px-4 py-2">
              <p className="text-gray-800 mb-2">{post.caption}</p>
              <div className="flex items-center justify-between">
                <LikeButton postId={post.id} likes={post.likes || 0} />

                <div className="flex items-center">
                  <button
                    className="flex items-center text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={handleCommentBox}
                  >
                    <i className="far fa-comment mr-1"></i> Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-center">No posts found.</p>
      )}
      {openComment && <Comment handleCommentBox={handleCommentBox} />}
    </div>
  );
}

export default PostComponent;
