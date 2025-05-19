import React, { useState } from 'react';
import axios from 'axios';
import { addGrade } from '../../services/Api';

const GradeAdd = () => {
  const [studentId, setStudentId] = useState('');
  const [classId, setClassId] = useState('');
  const [attendanceScore, setAttendanceScore] = useState('');
  const [examScore, setExamScore] = useState('');
  const [finalScore, setFinalScore] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate điểm (ví dụ 0-10)
    const att = parseFloat(attendanceScore);
    const exam = parseFloat(examScore);
    if (
      isNaN(att) || att < 0 || att > 10 ||
      isNaN(exam) || exam < 0 || exam > 10
    ) {
      alert('Điểm phải là số từ 0 đến 10');
      return;
    }
  const final = +(0.3 * att + 0.7 * exam).toFixed(2);

    try {
      
      const body = {
        student_id: parseInt(studentId),
        class_id: parseInt(classId),
        attendance_score: att,
        exam_score: exam,
        final_score: final,
        note,
      };
      console.log("body: ", body)
      await addGrade(body);
;
    alert(`Thêm điểm thành công! Điểm tổng kết: ${final}`);
      // Reset form
      setStudentId('');
      setClassId('');
      setAttendanceScore('');
      setExamScore('');
      setFinalScore('');
      setNote('');
    } catch (error) {
      console.error('Lỗi khi thêm điểm:', error);
      alert('Thêm điểm thất bại!');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Thêm điểm</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Mã sinh viên</label>
          <input
            type="number"
            className="form-control"
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Mã lớp</label>
          <input
            type="number"
            className="form-control"
            value={classId}
            onChange={e => setClassId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Điểm chuyên cần</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            className="form-control"
            value={attendanceScore}
            onChange={e => setAttendanceScore(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Điểm thi</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            className="form-control"
            value={examScore}
            onChange={e => setExamScore(e.target.value)}
            required
          />
        </div>
     
        <div className="mb-3">
          <label>Ghi chú</label>
          <input
            type="text"
            className="form-control"
            value={note}
            onChange={e => setNote(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">Thêm mới</button>
      </form>
    </div>
  );
};

export default GradeAdd;
