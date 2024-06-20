import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormValidation } from "../../hooks/useFormValidation";
import InputField from "./InputField";
import { addLoggedUser } from "../../Store/LoggedUser";
import { useNavigate } from "react-router-dom";
import Axiosinstance from "../../axios/axios";

function Login() {
  const predefinedUserData = {
    id: "1",
    name: "user",
    email: "user@gmail.com",
    password: "123123",
    follower: [],
    following: [],
  };

  const navigate = useNavigate();
  const { errors, validateForm } = useFormValidation();
  const dispatch = useDispatch();
  const storedUserData = useSelector((state) => state.userData.items);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      return;
    }

    try {
      const user = storedUserData.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );

      const userDetails =
        predefinedUserData.email === formData.email &&
        predefinedUserData.password === formData.password;

      if (user || userDetails) {
        const userId = user ? user.id : predefinedUserData.id;

        Axiosinstance.post("/api/jwt", { userId })
          .then((res) => {
            const token = res.data.token;
            localStorage.setItem("token", token);
            dispatch(addLoggedUser(user || predefinedUserData));
            navigate("/home");
          })
          .catch((error) => {
            setError("Failed to login. Please try again.");
            console.error("Login error:", error);
          });
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setError("Failed to login. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <p className="text-center text-red-600">
          email:- user@gmail.com <br /> pass:- 123123
        </p>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-900 dark:text-white"
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
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-900 dark:text-white"
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
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <button type="submit" className="bg-blue-700 p-2 rounded-lg">
                  Login
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  New user?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Create an account
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

export default Login;
