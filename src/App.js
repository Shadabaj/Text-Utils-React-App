import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import AboutUs from './components/AboutUs'
import Datapassing from './components/Datapassing';
import { useState } from 'react';
import Alert from './components/Alert';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function App() {

  const [Mode, setMode] = useState('light');
  const [alert, SetAlert] = useState(null);
  const [userExists, SetUserExists] = useState(false);
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData && userData.userName) {
      SetUserExists(true);
      setUserName(userData.name);
      console.log("User Exists: ", userData.name);
    }
  }, []);

  const LogOut = () => {
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("Token");
    SetUserExists(false);
    navigate("/Login");
  }


  const showAlert = (message, type) => {
    SetAlert({
      message: message,
      type: type
    });
    setTimeout(() => {
      SetAlert(2000);
    }, 2000)
  }

  const toggelMode = () => {
    if (Mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'grey';
      showAlert("Dark Mode had been Enabled", "success");
      setInterval(() => {
        document.title = "Text Utils is Amazing Application"
      }, 1500);

      setInterval(() => {
        document.title = "Download Text Utils Now"
      }, 2000);
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light Mode had been Enabled", "success");
    }
  };
  return (
    <>
      <Navbar Mode={Mode} title="TextUtils" aboutText="Tell Us About" toggelMode={toggelMode} userExists={userExists} userName={userName} LogOut={LogOut} />
      <Alert alert={alert} />
      <div className='container my-3'>
        <Routes>
          <Route path="/Login" element={
            <Login
              email="Email address"
              password="Password"
              setUserExists={SetUserExists}
              setUserName={setUserName}
            />
          }
          />
          <Route exact path="Employees" element={<EmployeeList />}></Route>
          <Route exact path="/about" element={<AboutUs />} />
          <Route exact path="/" element={
            <Textform
              heading="Enter The Text To Analyze"
              Mode={Mode}
              showAlert={showAlert}
            />
          } />
          <Route exact path="/Datapassing" element={
            <Datapassing name="shadab" />
          }>
          </Route>

          <Route exact path="/CreateEmployee"
            element={<CreateEmployee />}>
          </Route>

        </Routes>
      </div>
    </>
  );
}

export default App;
