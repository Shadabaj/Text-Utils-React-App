import { Routes, Route } from "react-router-dom";
import EmployeeList from "../EmployeeList";
import Member from "./Member";


function AdminRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={<EmployeeList />} /> */}
       <Route path="/" element={<Member />} />
      {/* <Route path="users" element={<Users />} /> */}
    </Routes>
  );
}

export default AdminRoutes;