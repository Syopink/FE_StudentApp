import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacher, updateTeacher } from '../../services/Api'; // Giả sử có API getTeacherById và updateTeacher

const TeacherEdit = () => {
  const { teacherCode } = useParams();
  const navigate = useNavigate();
  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherAddress, setTeacherAddress] = useState('');
  const [teacherPhoneNumber, setTeacherPhoneNumber] = useState('');
  const [teacherGender, setTeacherGender] = useState('');
  const [teacherDateOfBirth, setTeacherDateOfBirth] = useState('');

  // Lấy dữ liệu giảng viên khi chỉnh sửa
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await getTeacher(teacherCode);
        const teacher = response.data;
        console.log(teacher);
        
        setTeacherName(teacher.teacherName);
        setTeacherEmail(teacher.teacherEmail);
        setTeacherAddress(teacher.teacherAddress);
        setTeacherPhoneNumber(teacher.teacherPhoneNumber);
        setTeacherGender(teacher.teacherGender);
        setTeacherDateOfBirth(teacher.teacherDateOfBirth);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu giảng viên:', error);
      }
    };
    fetchTeacher();
  }, [teacherCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTeacher(teacherCode, { teacherName, teacherEmail, teacherAddress, teacherPhoneNumber, teacherGender, teacherDateOfBirth, teacherCode });
      alert(`Đã cập nhật giảng viên: ${teacherName}, ${teacherEmail}, ${teacherAddress}`);
      navigate('/admin/teacher')
    } catch (error) {
      console.error('Lỗi khi cập nhật giảng viên:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Chỉnh sửa giảng viên</h2>
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
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={teacherEmail}
            onChange={(e) => setTeacherEmail(e.target.value)}
            required
          />
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
            type="text"
            className="form-control"
            value={teacherPhoneNumber}
            onChange={(e) => setTeacherPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Giới tính</label>
          <input
            type="text"
            className="form-control"
            value={teacherGender}
            onChange={(e) => setTeacherGender(e.target.value)}
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
        <button type="submit" className="btn btn-primary">Cập nhật</button>
      </form>
    </div>
  );
};

export default TeacherEdit;
