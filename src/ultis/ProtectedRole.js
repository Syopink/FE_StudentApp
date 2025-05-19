import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  if (!currentUser) {
    // Chưa đăng nhập, chuyển về login
    return <Navigate to="/login" replace />;
  }


  // Đủ quyền truy cập
  return <Outlet />;
};

export default ProtectedRoute;
