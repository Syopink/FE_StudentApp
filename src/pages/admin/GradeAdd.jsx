import React, { useState } from 'react';

const GradeAdd = () => {
  const [student, setStudent] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đã thêm điểm: ${student} - ${subject} - ${score}`);
    // TODO: Gửi dữ liệu lên server
  };

  return (
    <div className="container mt-4">
      <h2>Thêm điểm</h2>
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
        <button type="submit" className="btn btn-success">Thêm mới</button>
      </form>
    </div>
  );
};

export default GradeAdd;
