import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "./InputField";
import { useFormValidation } from "../../hooks/useFormValidation";
import { useDispatch } from "react-redux";
import { addUser } from "../../Store/Userslice";
import { v4 as uuidv4 } from "uuid"; // Import UUIDv4 generator

function Signup() {
  const { errors, validateForm } = useFormValidation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: uuidv4(), // Generate UUIDv4 for user ID
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      return;
    }

    dispatch(addUser(formData));

    // Reset form data after saving to Redux store
    setFormData({
      id: uuidv4(), // Generate new UUIDv4 for next user
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    console.log("User data saved to Redux:", formData);
    console.log(formData, "to backend");
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <InputField
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  error={errors.name}
                />

                <label
                  htmlFor="email"
                  className=" text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <InputField
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  error={errors.email}
                />

                <label
                  htmlFor="email"
                  className=" text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <InputField
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  error={errors.password}
                />

                <label
                  htmlFor="email"
                  className=" text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <InputField
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  error={errors.confirmPassword}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500">{errors.confirmPassword}</span>
                )}

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;
