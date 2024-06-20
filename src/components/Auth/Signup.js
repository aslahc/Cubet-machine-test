// Signup.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";

import { useFormValidation } from "../../hooks/useFormValidation";
import { useDispatch } from "react-redux";
import { addUser } from "../../Store/Userslice";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "../../hooks/ThemeContext";

function Signup() {
  const navigate = useNavigate();
  const { errors, validateForm } = useFormValidation();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    follower: [],
    following: [],
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

    setFormData({
      id: uuidv4(),
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    navigate("/");
  };

  return (
    <div>
      <section
        className={`bg-gray-50 ${theme === "dark" ? "dark:bg-gray-900" : ""}`}
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div
            className={`w-full bg-white rounded-lg shadow ${
              theme === "dark" ? "dark:border" : ""
            } md:mt-0 sm:max-w-md xl:p-0 ${
              theme === "dark" ? "dark:bg-gray-800 dark:border-gray-700" : ""
            }`}
          >
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1
                className={`text-xl font-bold leading-tight tracking-tight ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                } md:text-2xl`}
              >
                Create an account
              </h1>

              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <label
                  htmlFor="email"
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
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
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
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
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
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
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
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

                <button type="submit" className="bg-blue-700 p-2 rounded-lg">
                  Create an account
                </button>

                <p
                  className={`text-sm font-light ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className={`font-medium ${
                      theme === "dark"
                        ? "text-primary-500 hover:underline"
                        : "text-primary-600 hover:underline"
                    }`}
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
