import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateLoggedUser } from "../../Store/LoggedUser";
import useImageUpload from "../../hooks/useImageUpload"; // Adjust the import path as needed

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LoggedUserData = useSelector((state) => state.LoggedUser.items[0]);

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
  });
  const [defaultProfileImage, setDefaultProfileImage] = useState("");

  const presetKey = "cloudinaryimg";
  const cloudName = "dy9ofwwjp";

  // Use the custom hook for image upload
  const {
    image: profileImage,
    newImageSelected,
    handleImageChange,
    uploadImageToCloudinary,
  } = useImageUpload(presetKey, cloudName);

  useEffect(() => {
    if (LoggedUserData) {
      setFormData({
        username: LoggedUserData.name || "",
        bio: LoggedUserData.bio || "",
      });
      setDefaultProfileImage(
        LoggedUserData.profileImage || "path/to/default/profile/image.jpg"
      ); // Set your default image path here
    }
  }, [LoggedUserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedProfileImage = profileImage;

    if (newImageSelected) {
      const uploadedImageUrl = await uploadImageToCloudinary();
      if (uploadedImageUrl) {
        updatedProfileImage = uploadedImageUrl;
      } else {
        alert("Failed to upload image. Please try again.");
        return;
      }
    }

    const updatedUser = {
      profileImage: newImageSelected
        ? updatedProfileImage
        : LoggedUserData.profileImage,
      name: formData.username,
      bio: formData.bio,
    };

    dispatch(updateLoggedUser({ updatedData: updatedUser }));
    navigate("/profile");
  };

  return (
    <section className="bg-white dark:bg-gray-900 m-10 rounded-lg">
      <div className="max-w-2xl mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            {/* Profile Image */}
            <div className="sm:col-span-2 flex justify-center items-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                <img
                  src={newImageSelected ? profileImage : defaultProfileImage}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
              <label
                htmlFor="imageUpload"
                className="block mt-2 text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
              >
                Change Image
              </label>
              <input
                type="file"
                id="imageUpload"
                name="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            {/* Username */}
            <div className="w-full">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter username"
                required
              />
            </div>
            {/* Bio */}
            <div className="w-full">
              <label
                htmlFor="bio"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Write your bio here..."
              ></textarea>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Update Profile
            </button>
            <button
              type="button"
              className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              <svg
                className="w-5 h-5 mr-1 -ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Delete
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditProfile;
