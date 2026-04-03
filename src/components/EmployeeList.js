import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";


export default function EmployeeList() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/Employee/GetEmployeeList");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div>

      <div className="mb-3">
        <Link to="/CreateEmployee" className="btn btn-primary btn-sm">
          ➕ Create Employee
        </Link>
      </div>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Name</th>
            <th>Profile</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>DOB</th>
            <th>Joining</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((emp, index) => (
            <tr key={emp.employeeCode}>
              <td>{index + 1}</td>
              <td>{emp.employeeCode}</td>
              <td>{emp.firstName} {emp.lastName}</td>

              <td>
                {emp.profileImage ? (
                  <img
                    src={`https://localhost:7023/${emp.profileImage}`}
                    width="40"
                    height="40"
                    className="rounded-circle"
                    alt="profile"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>

              <td>{emp.emailAddress}</td>
              <td>{emp.mobileNumber}</td>
              <td>{formatDate(emp.dateOfBirth)}</td>
              <td>{formatDate(emp.dateOfJoinee)}</td>

              <td>
                {emp.isActive
                  ? <span className='badge bg-success'>Active</span>
                  : <span className='badge bg-danger'>Inactive</span>}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}