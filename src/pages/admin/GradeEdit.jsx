import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGrade, updateGrade } from '../../services/Api';

const GradeEdit = () => {
  const { id } = useParams();

  const [studentId, setStudentId] = useState('');
  const [classId, setClassId] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [semesterName, setSemesterName] = useState('');
  const [attendanceScore, setAttendanceScore] = useState('0');
  const [examScore, setExamScore] = useState('0');
  const [finalScore, setFinalScore] = useState(0);
  const [note, setNote] = useState('');

  useEffect(() => {
    const fetchGrade = async () => {
      try {
        const response = await getGrade(id);
        const data = response.data;
        setStudentId(data.studentId);
        setClassId(data.classId);
        setSubjectName(data.subjectName);
        setSemesterName(data.semesterName);
        // Chuyển null thành '0' để tránh lỗi parseFloat
        setAttendanceScore(data.attendanceScore !== null ? data.attendanceScore.toString() : '0');
        setExamScore(data.examScore !== null ? data.examScore.toString() : '0');
        setFinalScore(data.finalScore !== null ? data.finalScore : 0);
        setNote(data.note || '');
      } catch (error) {
        console.error('Lỗi khi lấy điểm:', error);
        alert('Lấy điểm thất bại!');
      }
    };
    fetchGrade();
  }, [id]);

  // Tính lại điểm tổng kết khi attendanceScore hoặc examScore thay đổi
  useEffect(() => {
    const att = parseFloat(attendanceScore);
    const exam = parseFloat(examScore);
    if (!isNaN(att) && !isNaN(exam)) {
      const final = +(0.3 * att + 0.7 * exam).toFixed(2);
      setFinalScore(final);
    }
  }, [attendanceScore, examScore]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const att = parseFloat(attendanceScore);
    const exam = parseFloat(examScore);

    if (
      isNaN(att) || att < 0 || att > 10 ||
      isNaN(exam) || exam < 0 || exam > 10
    ) {
      alert('Điểm phải là số từ 0 đến 10');
      return;
    }

    try {
      const body = {
        attendance_score: att,
        exam_score: exam,
        final_score:finalScore,
        note,
      };
      await updateGrade(id, body);
      alert('Cập nhật điểm thành công!');
    } catch (error) {
      console.error('Lỗi khi cập nhật điểm:', error);
      alert('Cập nhật điểm thất bại!');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Chỉnh sửa điểm</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Mã sinh viên</label>
          <input
            type="number"
            className="form-control"
            value={studentId}
            disabled
          />
        </div>
        <div className="mb-3">
          <label>Mã lớp</label>
          <input
            type="number"
            className="form-control"
            value={classId}
            disabled
          />
        </div>
        <div className="mb-3">
          <label>Môn học</label>
          <input
            type="text"
            className="form-control"
            value={subjectName}
            disabled
          />
        </div>
        <div className="mb-3">
          <label>Học kỳ</label>
          <input
            type="text"
            className="form-control"
            value={semesterName}
            disabled
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
            onChange={(e) => setAttendanceScore(e.target.value)}
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
            onChange={(e) => setExamScore(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Điểm tổng kết</label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            value={finalScore}
            disabled
          />
        </div>
        <div className="mb-3">
          <label>Ghi chú</label>
          <input
            type="text"
            className="form-control"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Cập nhật</button>
      </form>
    </div>
  );
};

export default GradeEdit;
