import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/style.css";

const AdminLayout = () => {
  return (
    <div className="admin-container d-flex flex-column vh-100 overflow-hidden">
    <Navbar />
    <div className="d-flex flex-grow-1 overflow-hidden">
      <Sidebar />
      <main className="flex-grow-1 p-4 bg-light overflow-auto">
        <Outlet />
      </main>
    </div>
  </div>
  );
};

export default AdminLayout;
