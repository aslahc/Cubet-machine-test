import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Home from "./Pages/Home";
import { ThemeProvider } from "./hooks/ThemeContext";
import { useTheme } from "./hooks/ThemeContext";
import Theme from "./components/button/Theme";
import UserProfile from "./Pages/UserProfile";
import EditProfilePage from "./Pages/EditProfilePage";
function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/editProfile" element={<EditProfilePage />} />
          </Routes>
          <Theme />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
