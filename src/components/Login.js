import React from 'react';
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import api from "../api/axiosInstance";

export default function Login(props) {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      UserName: "",
      Password: ""
    },

    onSubmit: async (value) => {
      try {

        const response = await api.post("/Login/Login", {
          UserName: value.UserName,
          Password: value.Password
        });

        const userData = {
          name: response.data.name,
          userName: response.data.email,
          roles: response.data.roles[0]
        };

        sessionStorage.setItem("userData", JSON.stringify(userData));
        sessionStorage.setItem("Token", response.data.token);
        props.SetUserExists(true);
        props.setUserName(response.data.name);
        props.setRole(response.data.roles[0]);
        switch (response.data.roles[0]) {
          case "Admin":
            navigate("/admin");
            break;

          case "User":
            navigate("/user");
            break;

          default:
            navigate("/");
            break;
        }
      } 
      catch (error) {
        console.log(error);
        alert("Login failed");
      }
    }
  });

  return (
    <div className="container mt-5 my-10 col-md-6">
      <div className="card shadow-lg p-4">

        <form onSubmit={formik.handleSubmit}>

          <div className="mb-3">
            <label className="form-label">{props.email}</label>

            <input
              type="email"
              className="form-control"
              name="UserName"
              value={formik.values.UserName}
              onChange={formik.handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>

            <input
              type="password"
              className="form-control"
              name="Password"
              value={formik.values.Password}
              onChange={formik.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary justify-content-center d-flex w-100">
            🚀 Submit
          </button>

        </form>

      </div>
    </div>
  );
}