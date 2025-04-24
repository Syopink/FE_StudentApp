// src/pages/admin/Profile.jsx
import React, { useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý lưu hồ sơ ở đây, ví dụ gọi API hoặc validate
    console.log("Submitting: ", formData);
  };

  return (
    <div className="container-fluid p-1">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="page-header">Chỉnh sửa hồ sơ</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 offset-md-2">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="fullName">Họ và Tên</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password">Mật khẩu mới</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Nhập mật khẩu mới"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu mới"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
