import React, { useState } from 'react';
import { addStudents, getClassGroup, getMajor } from '../../services/Api'; // Nhớ điều chỉnh đường dẫn nếu khác
import { useEffect } from 'react';
const StudentAdd = () => {
  const [student, setStudent] = useState({
    student_name: '',
    date_of_birth: '',
    emailUser: '',
    gender: 'Male',
    address: '',
    phone_number: '',
    major_id: '',
    class_group_id: ''
  });

  const [classGroups, setClassGroups] = useState([]);
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    // Lấy danh sách majors
    getMajor()
      .then(res => setMajors(res.data))
      .catch(err => console.error(err));

    // Lấy danh sách class groups
    getClassGroup()
      .then(res => setClassGroups(res.data))
      .catch(err => console.error(err));
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
const payload = {
    ...student,
  major_id: student.major_id ? Number(student.major_id) : null,
  class_group_id: student.class_group_id ? Number(student.class_group_id) : null,
  };
    try {
      await addStudents(payload);
      alert('Thêm sinh viên thành công!');
      setStudent({
        student_name: '',
        date_of_birth: '',
        emailUser: '',
        gender: 'Male',
        address: '',
        phone_number: '',
        major_id: '',
        class_group_id: ''
      });
    } catch (error) {
      console.error('Lỗi khi thêm sinh viên:', error);
      alert('Đã xảy ra lỗi khi thêm sinh viên!');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Thêm sinh viên</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Họ & Tên</label>
          <input type="text" name="student_name" className="form-control" value={student.student_name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Ngày sinh</label>
          <input type="date" name="date_of_birth" className="form-control" value={student.date_of_birth} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="emailUser" className="form-control" value={student.emailUser} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Giới tính</label>
          <select name="gender" className="form-control" value={student.gender} onChange={handleChange}>
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Địa chỉ</label>
          <input type="text" name="address" className="form-control" value={student.address} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Số điện thoại</label>
          <input type="text" name="phone_number" className="form-control" value={student.phone_number} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Khoa (Major)</label>
          <select
            name="major_id"
            className="form-control"
            value={student.major_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn khoa --</option>
            {majors.map(m => (
              <option key={m.id} value={m.id}>
                {m.majorName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Lớp (Class Group)</label>
          <select
            name="class_group_id"
            className="form-control"
            value={student.class_group_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn lớp --</option>
            {classGroups.map(cg => (
              <option key={cg.id} value={cg.id}>
                {cg.groupCode} - {cg.groupName} ({cg.shift})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success">Thêm mới</button>
      </form>
    </div>
  );
};

export default StudentAdd;