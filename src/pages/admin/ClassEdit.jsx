import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ClassEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [teacher, setTeacher] = useState('');
  const [students, setStudents] = useState('');

  useEffect(() => {
    // Giả lập dữ liệu từ API dựa theo ID
    const fakeClass = {
      id,
      name: 'Công nghệ phần mềm 1',
      teacher: 'Nguyễn Văn A',
      students: 40,
    };

    setName(fakeClass.name);
    setTeacher(fakeClass.teacher);
    setStudents(fakeClass.students);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đã cập nhật lớp: ${name} - Giáo viên: ${teacher} - Sĩ số: ${students}`);
    // Gọi API cập nhật lớp học tại đây nếu cần
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Chỉnh sửa lớp học</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Tên lớp</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="teacher" className="form-label">Giáo viên chủ nhiệm</label>
          <input type="text" className="form-control" id="teacher" value={teacher} onChange={(e) => setTeacher(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="students" className="form-label">Sĩ số</label>
          <input type="number" className="form-control" id="students" value={students} onChange={(e) => setStudents(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Cập nhật</button>
      </form>
    </div>
  );
};

export default ClassEdit;
