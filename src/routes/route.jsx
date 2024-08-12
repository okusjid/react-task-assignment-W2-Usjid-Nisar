import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/Login";
import ListingPage from "../components/PageListing";
import Logout from "../components/Logout";

const MyRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/listing" element={<ListingPage />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default MyRoute;
