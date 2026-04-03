import { Routes, Route } from "react-router-dom";
import EmployeeList from "../EmployeeList";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EmployeeList />} />
       {/* <Route path="/" element={<CreateEmployee />} /> */}
      {/* <Route path="users" element={<Users />} /> */}
    </Routes>
  );
}

export default AdminRoutes;