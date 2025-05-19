// src/components/Sidebar/SidebarStudent.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-dark text-white p-3 sidebar vh-100" style={{ width: "250px" }}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            to="/student"
            className={({ isActive }) =>
              'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
            }
          >
            <i className="bi bi-house-door"></i> Dashboard
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/student/registration"
            className={({ isActive }) =>
              'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
            }
          >
            <i className="bi bi-pencil-square"></i> Đăng ký học phần
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/student/schedule"
            className={({ isActive }) =>
              'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
            }
          >
            <i className="bi bi-calendar"></i> Lịch học
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/student/grades"
            className={({ isActive }) =>
              'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
            }
          >
            <i className="bi bi-file-earmark-text"></i> Quản lý điểm
          </NavLink>
        </li>
         <li className="nav-item mt-auto">
                      <NavLink
                        to="/student/curriculum"
                        className={({ isActive }) =>
                          'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
                        }
                      >
                        <i className="bi bi-building-gear"></i> Chương trình khung
                      </NavLink>
                    </li>
      </ul>
    </div>
  );
};

export default Sidebar;
