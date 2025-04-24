import React, { useState } from 'react';

const Settings = () => {
  const [formData, setFormData] = useState({
    school_name: 'Trường Đại học Vietpro',
    contact_email: 'contact@vietpro.edu.vn',
    school_url: 'https://vietpro.edu.vn',
    school_logo: null,
    user_permissions: 'admin',
    security_mode: 'medium',
    allow_registration: 'yes'
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saved settings:', formData);
    alert('Cấu hình đã được lưu thành công!');
  };

  const handleReset = () => {
    setFormData({
      school_name: '',
      contact_email: '',
      school_url: '',
      school_logo: null,
      user_permissions: 'admin',
      security_mode: 'medium',
      allow_registration: 'yes'
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Cấu hình hệ thống</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Tên trường học</label>
          <input
            type="text"
            name="school_name"
            required
            className="form-control"
            value={formData.school_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Địa chỉ email liên hệ</label>
          <input
            type="email"
            name="contact_email"
            required
            className="form-control"
            value={formData.contact_email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>URL trang web</label>
          <input
            type="text"
            name="school_url"
            required
            className="form-control"
            value={formData.school_url}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label>Logo trường học</label>
          <input
            type="file"
            name="school_logo"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <h4>Quản lý người dùng</h4>
        <div className="form-group mb-3">
          <label>Cấu hình quyền người dùng</label>
          <select
            name="user_permissions"
            className="form-control"
            value={formData.user_permissions}
            onChange={handleChange}
          >
            <option value="admin">Admin</option>
            <option value="teacher">Giáo viên</option>
            <option value="student">Sinh viên</option>
          </select>
        </div>

        <h4>Cấu hình hệ thống</h4>
        <div className="form-group mb-3">
          <label>Chế độ bảo mật</label>
          <select
            name="security_mode"
            className="form-control"
            value={formData.security_mode}
            onChange={handleChange}
          >
            <option value="high">Cao</option>
            <option value="medium">Trung bình</option>
            <option value="low">Thấp</option>
          </select>
        </div>

        <div className="form-group mb-3">
          <label>Cho phép đăng ký người dùng mới</label>
          <select
            name="allow_registration"
            className="form-control"
            value={formData.allow_registration}
            onChange={handleChange}
          >
            <option value="yes">Có</option>
            <option value="no">Không</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary me-2">Lưu thay đổi</button>
        <button type="button" className="btn btn-secondary" onClick={handleReset}>Làm mới</button>
      </form>
    </div>
  );
};

export default Settings;
