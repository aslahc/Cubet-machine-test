import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../../Store/Post";
import useImageUpload from "../../hooks/useImageUpload";
import { v4 as uuidv4 } from "uuid";

function CreatePost({ handleCreatePost }) {
  const dispatch = useDispatch();
  const [caption, setCaption] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const maxChars = 150;
  const presetKey = "cloudinaryimg";
  const cloudName = "dy9ofwwjp";
  const LoggedUserData = useSelector((state) => state.LoggedUser.items[0]);

  const {
    image,
    newImageSelected,
    handleImageChange,
    uploadImageToCloudinary,
  } = useImageUpload(presetKey, cloudName);

  const handleCaptionChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setCaption(text);
      setCharCount(text.length);
    }
  };

  const handlePost = async () => {
    if (!caption && !newImageSelected) {
      alert("Please enter a caption or select an image.");
      return;
    }

    try {
      let imageUrl = null;
      setLoading(true);

      if (newImageSelected) {
        imageUrl = await uploadImageToCloudinary();
        if (!imageUrl) {
          setLoading(false);
          alert("Failed to upload image. Please try again.");
          return;
        }
      }

      dispatch(
        addPost({
          id: uuidv4(),
          name: LoggedUserData.name,
          caption: caption,
          image: imageUrl,
          date: Date.now(),
          likes: 0,
        })
      );

      setCaption("");
      setCharCount(0);
      setLoading(false);
      handleCreatePost();
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      setLoading(false);
      alert("Failed to upload image. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>

      <div className="z-50 bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <button
          onClick={handleCreatePost}
          className="top-4 right-4 bg-red-500 text-white rounded-full p-1"
        >
          Close
        </button>
        <h2 className="text-xl font-semibold mb-4">Create Post</h2>

        <div className="mb-4">
          <label htmlFor="caption" className="block mb-1 font-medium">
            Caption
          </label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={handleCaptionChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="Enter caption"
          />
          <div className="text-sm text-gray-500 mt-1">
            {charCount}/{maxChars} characters
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block mb-1 font-medium">
            Select Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-gray-200 px-4 py-2 rounded-md text-sm inline-block"
          >
            Choose Image
          </label>
          {image && (
            <div className="mt-2">
              <img
                src={image}
                alt="Selected Post"
                className="w-full rounded-md"
              />
            </div>
          )}
        </div>
        {(caption || newImageSelected) && (
          <button
            onClick={handlePost}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 px-4 text-sm"
            disabled={loading} // Disable button during loading
          >
            {loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Post"
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default CreatePost;
