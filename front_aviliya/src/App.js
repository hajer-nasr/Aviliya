/* eslint-disable no-unused-vars */
//import logo from "./logo.svg";
import "./App.css";

import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Details from "./pages/details";
import RateJust from "./pages/rating";
import HomeAdmin from "./pages/homeAdmin";
import DetailsAdm from "./pages/detailsAdmin";
import NewHotel from "./pages/newHotel";
import Try from "./pages/jareb";
import EditHotel from "./pages/editAdmin";
import Forget from "./pages/forgetPassword";
import Reset from "./pages/resetPassword";
function App() {
  return (
    <Router>
      <div className="App" style={{ margin: 40 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/Rating/:id" element={<RateJust />} />
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/admin/Details/:id" element={<DetailsAdm />} />
          <Route path="/admin/NewHotel" element={<NewHotel />} />
          <Route path="/try" element={<Try />} />
          <Route path="/forget_password" element={<Forget />} />
          <Route path="/reset_password/:id" element={<Reset />} />
          <Route path="/admin/EditHotel/:id" element={<EditHotel />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
