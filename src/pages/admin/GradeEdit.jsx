import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GradeEdit = () => {
  const { id } = useParams();
  const [student, setStudent] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState('');

  useEffect(() => {
    // Giả lập dữ liệu từ API
    const fetched = {
      id,
      student: 'Nguyễn Văn A',
      subject: 'Toán cao cấp',
      score: 9.5,
    };
    setStudent(fetched.student);
    setSubject(fetched.subject);
    setScore(fetched.score);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đã cập nhật điểm: ${student} - ${subject} - ${score}`);
    // TODO: Gửi dữ liệu lên server
  };

  return (
    <div className="container mt-4">
      <h2>Chỉnh sửa điểm</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Sinh viên</label>
          <input
            type="text"
            className="form-control"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Môn học</label>
          <input
            type="text"
            className="form-control"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Điểm</label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Cập nhật</button>
      </form>
    </div>
  );
};

export default GradeEdit;
