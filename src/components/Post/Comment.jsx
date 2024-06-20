import React, { useState } from "react";

function Comment({ handleCommentBox }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const handleInputChange = (e) => {
    setCommentText(e.target.value);
  };

  const handlePostComment = () => {
    if (commentText.trim() !== "") {
      setComments([...comments, commentText]);
      setCommentText("");
    }
  };

  return (
    <div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Comment Box</h3>
              <span
                onClick={handleCommentBox}
                className="text-gray-500 cursor-pointer hover:text-gray-700"
              >
                &times;
              </span>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter your comment..."
                value={commentText}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {commentText && (
              <button
                onClick={handlePostComment}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Post Comment
              </button>
            )}
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Comments</h4>
              <div className="comment-box max-h-48 overflow-y-auto">
                {comments.map((comment, index) => (
                  <div key={index} className="bg-gray-100 p-2 rounded-md mb-2">
                    {comment}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
