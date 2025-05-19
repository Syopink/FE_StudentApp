import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudent, updateStudent } from '../../services/Api';

const StudentEdit = () => {
  const { student_id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    console.log("👉 student_id từ URL:", student_id);
    const fetchData = async () => {
      const res = await getStudent(student_id);
      setStudent(res.data);
    };
    fetchData();
  }, [student_id]);

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

  // Chuyển đổi snake_case => camelCase và nest các object
  const body = {
    studentCode: student.student_code,
    studentName: student.student_name,
    dateOfBirth: student.date_of_birth?.slice(0, 10),
    gender: student.gender,
    address: student.address,
    phoneNumber: student.phone_number,
    studentEmail: student.student_email,
    user: {
      id: student.user_id,
      email: student.user_email,
    },
    major: {
      id: student.major_id,
    },
    classGroup: {
      id: student.class_group_id,
    },
  };

  try {
    await updateStudent(student_id, body);
    alert(`✅ Đã cập nhật sinh viên ${student_id}`);
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
          <label>Mã sinh viên</label>
          <input
            type="text"
            className="form-control"
            name="student_code"
            value={student.student_code}
            disabled
          />
        </div>

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
          <label>Ngày sinh</label>
          <input
            type="date"
            className="form-control"
            name="date_of_birth"
            value={student.date_of_birth?.slice(0, 10)} // chỉ lấy yyyy-mm-dd
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Giới tính</label>
          <select
            className="form-control"
            name="gender"
            value={student.gender}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn giới tính --</option>
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
            <option value="Other">Khác</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Email người dùng</label>
          <input
            type="email"
            className="form-control"
            name="user_email"
            value={student.user_email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email sinh viên</label>
          <input
            type="email"
            className="form-control"
            name="student_email"
            value={student.student_email}
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

        <div className="mb-3">
          <label>Ngành học</label>
          <input
            type="text"
            className="form-control"
            name="major_id"
            value={student.major_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Lớp</label>
          <input
            type="text"
            className="form-control"
            name="class_group_id"
            value={student.class_group_id}
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
