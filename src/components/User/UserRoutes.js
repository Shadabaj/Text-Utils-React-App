import { Routes, Route } from "react-router-dom";
import Datapassing from "../Datapassing";
import AboutUs from "../AboutUs";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Datapassing />} />
      <Route path="profile" element={<AboutUs />} />
    </Routes>
  );
}

export default UserRoutes;