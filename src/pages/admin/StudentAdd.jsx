import React, { useState } from 'react';

const StudentAdd = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [faculty, setFaculty] = useState('');
  const [className, setClassName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đã thêm sinh viên: ${name}, ${email}, ${faculty}, ${className}`);
    // TODO: Gửi dữ liệu lên server tại đây
  };

  return (
    <div className="container mt-4">
      <h2>Thêm sinh viên</h2>
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
          <input type="text" className="form-control" value={faculty} onChange={(e) => setFaculty(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Lớp</label>
          <input type="text" className="form-control" value={className} onChange={(e) => setClassName(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success">Thêm mới</button>
      </form>
    </div>
  );
};

export default StudentAdd;
