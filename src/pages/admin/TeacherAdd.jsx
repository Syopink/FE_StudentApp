import React, { useState } from 'react';
import { addTeacher } from '../../services/Api';
const TeacherAdd = () => {
  const [teacherName, setTeacherName] = useState('');
  const [teacherDateOfBirth, setTeacherDateOfBirth] = useState('');
  const [teacherGender, setTeacherGender] = useState('Male');
  const [teacherAddress, setTeacherAddress] = useState('');
  const [teacherPhoneNumber, setTeacherPhoneNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [deptId, setDeptId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTeacher = {
      teacherName,
      teacherDateOfBirth,
      teacherGender,
      teacherAddress,
      teacherPhoneNumber,
      userEmail,
      deptId: Number(deptId), // chắc chắn chuyển về số
    };

    try {
      // Giả lập gọi API, bạn thay bằng api thực tế
      const response = await addTeacher(newTeacher);
      console.log('Gửi dữ liệu:', newTeacher);
      alert(`Đã thêm giảng viên: ${teacherName}`);
      // Sau khi thêm thành công, bạn có thể reset form hoặc điều hướng
    } catch (error) {
      console.error('Lỗi thêm giảng viên:', error);
      alert('Thêm giảng viên thất bại!');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Thêm giảng viên</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Họ & Tên</label>
          <input
            type="text"
            className="form-control"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Ngày sinh</label>
          <input
            type="date"
            className="form-control"
            value={teacherDateOfBirth}
            onChange={(e) => setTeacherDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Giới tính</label>
          <select
            className="form-control"
            value={teacherGender}
            onChange={(e) => setTeacherGender(e.target.value)}
            required
          >
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
            <option value="Other">Khác</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Địa chỉ</label>
          <input
            type="text"
            className="form-control"
            value={teacherAddress}
            onChange={(e) => setTeacherAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Số điện thoại</label>
          <input
            type="tel"
            className="form-control"
            value={teacherPhoneNumber}
            onChange={(e) => setTeacherPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>ID Khoa</label>
          <input
            type="number"
            className="form-control"
            value={deptId}
            onChange={(e) => setDeptId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Thêm mới</button>
      </form>
    </div>
  );
};

export default TeacherAdd;
