import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TeacherEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    // Giả lập fetch dữ liệu giảng viên từ ID
    const fetched = {
      id,
      name: 'Nguyễn Thị C',
      email: 'c@gmail.com',
      department: 'Công nghệ thông tin',
    };
    setName(fetched.name);
    setEmail(fetched.email);
    setDepartment(fetched.department);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đã cập nhật giảng viên ${id}: ${name}, ${email}, ${department}`);
    // TODO: Gửi dữ liệu cập nhật lên API
  };

  return (
    <div className="container mt-4">
      <h2>Chỉnh sửa giảng viên</h2>
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
        <button type="submit" className="btn btn-primary">Cập nhật</button>
      </form>
    </div>
  );
};

export default TeacherEdit;
