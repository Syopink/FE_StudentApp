import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../ultis/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, role, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Đăng xuất và xóa dữ liệu user khỏi context và localStorage
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4 d-flex justify-content-between align-items-center">
      <a className="navbar-brand text-white" href="/admin">
        <strong>Edu</strong>Admin
      </a>
      <div className="dropdown">
        <button
          className="btn btn-dark dropdown-toggle"
          type="button"
          id="userDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-person"></i> {user?.username} ({role})
        </button>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
          <li><a className="dropdown-item" href="/admin/profile">Hồ sơ</a></li>
          <li><button className="dropdown-item" onClick={handleLogout}>Đăng xuất</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
