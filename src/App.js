import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Home from "./Pages/Home";
import { ThemeProvider } from "./hooks/ThemeContext";
import { useTheme } from "./hooks/ThemeContext";
import Theme from "./components/button/Theme";
import UserProfile from "./Pages/UserProfile";
import EditProfilePage from "./Pages/EditProfilePage";
import ProtectedRoute from "./route/PrivateRoute";
import Notification from "./Pages/Notification";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      setIsAuth(true);
    }
  }, []);

  return (
    <ThemeProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editProfile"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <EditProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Notification />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Theme />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
