import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudent, updateStudent } from '../../services/Api';

const StudentEdit = () => {
  const { student_code } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getStudent(student_code);
      setStudent(res.data);
    };
    fetchData();
  }, [student_code]);

  if (!student) return <p>Đang tải dữ liệu...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(student_code, student);
      alert(`✅ Đã cập nhật sinh viên ${student_code}`);
      navigate('/admin/students');
    } catch (err) {
      console.error("❌ Lỗi cập nhật:", err);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Chỉnh sửa sinh viên</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Họ & Tên</label>
          <input
            type="text"
            className="form-control"
            name="student_name"
            value={student.student_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Số điện thoại</label>
          <input
            type="text"
            className="form-control"
            name="phone_number"
            value={student.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Địa chỉ</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={student.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Cập nhật</button>
      </form>
    </div>
  );
};

export default StudentEdit;
