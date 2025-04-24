import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StudentEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [faculty, setFaculty] = useState('');
  const [className, setClassName] = useState('');

  useEffect(() => {
    // Giả lập dữ liệu được fetch từ API
    const fetchedStudent = {
      id,
      name: 'Nguyễn Văn A',
      email: 'a@gmail.com',
      faculty: 'CNTT',
      className: 'CNPM1',
    };

    setName(fetchedStudent.name);
    setEmail(fetchedStudent.email);
    setFaculty(fetchedStudent.faculty);
    setClassName(fetchedStudent.className);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đã cập nhật sinh viên ${id}: ${name}, ${email}, ${faculty}, ${className}`);
    // TODO: Gửi dữ liệu cập nhật lên server tại đây
  };

  return (
    <div className="container mt-4">
      <h2>Chỉnh sửa sinh viên</h2>
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
        <button type="submit" className="btn btn-primary">Cập nhật</button>
      </form>
    </div>
  );
};

export default StudentEdit;
