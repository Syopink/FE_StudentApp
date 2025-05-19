import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  // Lấy user object từ redux store
  const user = useSelector((state) => state.auth.currentUser);
  console.log("user", user)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",  // nếu user.phone không tồn tại thì bỏ dòng này
        password: "",
        confirmPassword: ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting: ", formData);
    // Gọi API cập nhật hồ sơ ở đây nếu cần
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
              <label htmlFor="username">Họ và Tên</label>
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
