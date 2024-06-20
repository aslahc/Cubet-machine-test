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
  const [loading, setLoading] = useState(false);
  const [bioError, setBioError] = useState(false); // State for bio error

  const presetKey = "cloudinaryimg";
  const cloudName = "dy9ofwwjp";

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
      );
    }
  }, [LoggedUserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "bio" && value.length > 15) {
      // Adjust the limit here (15 characters)
      setBioError(true); // Set bio error state to true
    } else {
      setBioError(false); // Reset bio error state
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (bioError) {
      // Prevent form submission if there's a bio error
      return;
    }

    setLoading(true);

    let updatedProfileImage = profileImage;

    if (newImageSelected) {
      const uploadedImageUrl = await uploadImageToCloudinary();
      if (uploadedImageUrl) {
        updatedProfileImage = uploadedImageUrl;
      } else {
        setLoading(false);
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
                className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
                  bioError ? "border-red-500" : "border-gray-300"
                } focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Write your bio here..."
              ></textarea>
              {bioError && (
                <p className="text-red-500 text-sm mt-1">
                  Bio must be 15 characters or less.
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className={`${
                loading ? "opacity-50 cursor-not-allowed" : ""
              } bg-blue-700 rounded-lg p-2 text-white flex items-center`}
              disabled={loading}
            >
              {loading && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditProfile;
