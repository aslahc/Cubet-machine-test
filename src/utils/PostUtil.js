// postUtils.js

import { v4 as uuidv4 } from "uuid";
import { addPost } from "../Store/Post";

const handlePost = async ({
  dispatch,
  LoggedUserData,
  caption,
  imageUrl,
  setCaption,
  setCharCount,
  setLoading,
  handleCreatePost,
  uploadImageToCloudinary,
}) => {
  try {
    setLoading(true);

    if (imageUrl === null) {
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

export default handlePost;
