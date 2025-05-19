import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/auth";
import { Link } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Lấy thông tin user từ Redux store
  const user = useSelector((state) => state.auth.currentUser?.username);
  const handleLogout = () => {
    // Xóa localStorage nếu có
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // Xóa trong Redux
    dispatch(logout());

    // Điều hướng về trang đăng nhập
    navigate("/");
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
          <i className="bi bi-person"></i> {user}
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
