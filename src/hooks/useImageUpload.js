import { useState } from "react";
import axios from "axios";

const useImageUpload = (presetKey, cloudName) => {
  const [image, setImage] = useState("");
  const [newImageSelected, setNewImageSelected] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setNewImageSelected(true);
      };
      reader.readAsDataURL(file);
    } else {
      // Handle non-image file selection
      alert("Please select a valid image file.");
    }
  };

  const uploadImageToCloudinary = async () => {
    const formDataFile = new FormData();
    formDataFile.append("file", image);
    formDataFile.append("upload_preset", presetKey);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formDataFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Upload error: ", error);
      return null;
    }
  };

  return {
    image,
    newImageSelected,
    handleImageChange,
    uploadImageToCloudinary,
  };
};

export default useImageUpload;
