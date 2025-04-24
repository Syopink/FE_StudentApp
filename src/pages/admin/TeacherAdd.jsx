import React, { useState } from 'react';

const TeacherAdd = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đã thêm giảng viên: ${name} - ${email} - ${department}`);
    // TODO: Gửi dữ liệu lên API
  };

  return (
    <div className="container mt-4">
      <h2>Thêm giảng viên</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Họ & Tên</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Khoa</label>
          <input type="text" className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success">Thêm mới</button>
      </form>
    </div>
  );
};

export default TeacherAdd;
