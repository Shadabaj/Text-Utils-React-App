import './App.css';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import AboutUs from './components/AboutUs';
import Datapassing from './components/Datapassing';
import Alert from './components/Alert';
import Login from './components/Login';

import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

// ✅ Lazy loaded modules
const AdminModule = lazy(() => import("./components/Admin/AdminRoutes"));
const UserModule = lazy(() => import("./components/User/UserRoutes"));

function App() {

  const [Mode, setMode] = useState('light');
  const [alert, SetAlert] = useState(null);
  const [userExists, SetUserExists] = useState(false);
  const [userName, setUserName] = useState('');
  const [Role, setRole] = useState('');

  const navigate = useNavigate();

  // ✅ Load user from session
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (userData) {
      SetUserExists(true);
      setUserName(userData.name);
      setRole(userData.roles); // already a string
    }
  }, []);

  // ✅ Logout
  const LogOut = () => {
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("Token");
    SetUserExists(false);
    navigate("/Login");
  };

  // ✅ Alert
  const showAlert = (message, type) => {
    SetAlert({ message, type });

    setTimeout(() => {
      SetAlert(null);
    }, 2000);
  };

  // ✅ Toggle mode
  const toggelMode = () => {
    if (Mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'grey';
      showAlert("Dark Mode Enabled", "success");

      setTimeout(() => {
        document.title = "Text Utils is Amazing Application";
      }, 1500);

    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light Mode Enabled", "success");
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar
        Mode={Mode}
        title="TextUtils"
        aboutText="Tell Us About"
        toggelMode={toggelMode}
        userExists={userExists}
        userName={userName}
        LogOut={LogOut}
        Role={Role}
      />

      {/* Alert */}
      <Alert alert={alert} />

      <div className='container my-3'>
        <Routes>

          {/* LOGIN */}
          <Route path="/Login" element={
            <Login
              email="Email address"
              password="Password"
              SetUserExists={SetUserExists}
              setUserName={setUserName}
              setRole={setRole}
            />
          } />

          {/* PUBLIC */}
          <Route path="/" element={
            <Textform
              heading="Enter The Text To Analyze"
              Mode={Mode}
              showAlert={showAlert}
            />
          } />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/Datapassing" element={<Datapassing name="shadab" />} />

          {/* 🔐 ADMIN ROUTES */}
          <Route
            path="/admin/*"
            element={
              userExists && Role === "Admin" ? (
                <Suspense fallback={<div>Loading Admin...</div>}>
                  <AdminModule />
                </Suspense>
              ) : (
                <Navigate to="/Login" />
              )
            }
          />

          {/* 🔐 USER ROUTES */}
          <Route
            path="/user/*"
            element={
              userExists && Role === "User" ? (
                <Suspense fallback={<div>Loading User...</div>}>
                  <UserModule />
                </Suspense>
              ) : (
                <Navigate to="/Login" />
              )
            }
          />

        </Routes>
      </div>
    </>
  );
}

export default App;