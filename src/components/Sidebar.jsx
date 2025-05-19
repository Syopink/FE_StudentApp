import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const role = useSelector((state) => state.auth.currentUser?.role?.roleName);
  console.log("role: ", role);

  return (
    <div className="bg-dark text-white p-3 sidebar vh-100" style={{ width: "250px" }}>
      <ul className="nav flex-column">
        {/* Dashboard luôn hiển thị */}
        <li className="nav-item">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
            }
          >
            <i className="bi bi-house-door"></i> Dashboard
          </NavLink>
        </li>

        {/* Menu cho STUDENT */}
        {role === "STUDENT" && (
          <>
            <li className="nav-item">
              <NavLink
                to="/admin/registration"
                className={({ isActive }) =>
                  'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
                }
              >
                <i className="bi bi-pencil-square"></i> Đăng ký học phần
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/schedule"
                className={({ isActive }) =>
                  'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
                }
              >
                <i className="bi bi-calendar"></i> Lịch học
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/grades"
                className={({ isActive }) =>
                  'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
                }
              >
                <i className="bi bi-file-earmark-text"></i> Quản lý điểm
              </NavLink>
            </li>
          </>
        )}

        {/* Menu cho TEACHER */}
        {role === "TEACHER" && (
          <>
            <li className="nav-item">
              <NavLink
                to="/admin/subject"
                className={({ isActive }) =>
                  'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
                }
              >
                <i className="bi bi-book"></i> Quản lý môn học
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/students"
                className={({ isActive }) =>
                  'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
                }
              >
                <i className="bi bi-person-lines-fill"></i> Quản lý sinh viên
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/grades"
                className={({ isActive }) =>
                  'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
                }
              >
                <i className="bi bi-file-earmark-text"></i> Quản lý điểm
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/schedule"
                className={({ isActive }) =>
                  'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
                }
              >
                <i className="bi bi-calendar"></i> Lịch học
              </NavLink>
            </li>
          </>
        )}

        {/* Menu cho ADMIN */}
        {role === "ADMIN" && (
          <>
            <li className="nav-item">
              <NavLink
                to="/admin/class"
                className={({ isActive }) =>
                  'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
                }
              >
                <i className="bi bi-building"></i> Quản lý khoa
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/teacher"
                className={({ isActive }) =>
                  'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
                }
              >
                <i className="bi bi-person-badge"></i> Quản lý giáo viên
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/subject"
                className={({ isActive }) =>
                  'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
                }
              >
                <i className="bi bi-book"></i> Quản lý môn học
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/students"
                className={({ isActive }) =>
                  'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
                }
              >
                <i className="bi bi-person-lines-fill"></i> Quản lý sinh viên
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/grades"
                className={({ isActive }) =>
                  'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
                }
              >
                <i className="bi bi-file-earmark-text"></i> Quản lý điểm
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/schedule"
                className={({ isActive }) =>
                  'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
                }
              >
                <i className="bi bi-calendar"></i> Lịch học
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/registration"
                className={({ isActive }) =>
                  'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
                }
              >
                <i className="bi bi-pencil-square"></i> Đăng ký học phần
              </NavLink>
            </li>
            <li className="nav-item mt-auto">
              <NavLink
                to="/admin/curriculum"
                className={({ isActive }) =>
                  'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
                }
              >
                <i className="bi bi-building-gear"></i> Chương trình khung
              </NavLink>
            </li>
            <li className="nav-item mt-auto">
              <NavLink
                to="/admin/settings"
                className={({ isActive }) =>
                  'nav-link text-white d-flex align-items-center gap-2' + (isActive ? ' active' : '')
                }
              >
                <i className="bi bi-gear"></i> Cấu hình
              </NavLink>
            </li>
            
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
