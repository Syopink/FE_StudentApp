import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../ultis/AuthContext"; // Đảm bảo đường dẫn chính xác

const Profile = () => {
  const { user } = useContext(AuthContext); // Lấy dữ liệu người dùng từ context
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (user) {
      // Cập nhật giá trị formData với thông tin người dùng từ context
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        confirmPassword: ""
      });
    }
  }, [user]); // Chạy lại khi user thay đổi

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
                id="username"
                name="username"
                value={formData.username}
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


            <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
