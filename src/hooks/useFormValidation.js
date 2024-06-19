import { useState } from "react";

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateForm = (formData) => {
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  return { errors, validateForm };
};
