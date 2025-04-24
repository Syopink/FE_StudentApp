import React from "react";

const Navbar = () => {
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
          <i className="bi bi-person"></i> Admin
        </button>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
          <li><a className="dropdown-item" href="/admin/profile">Hồ sơ</a></li>
          <li><a className="dropdown-item" href="#">Đăng xuất</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
