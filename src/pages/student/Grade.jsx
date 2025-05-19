import React, { useState, useEffect } from 'react';
import { getGradeStudent, delGrade } from '../../services/Api'; // Thêm hàm deleteGrade
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PAGE_SIZE = 5;

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [searchStudentId, setSearchStudentId] = useState('');
  const [searchClassId, setSearchClassId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
const id = useSelector((state) => state.auth.currentUser?.id);
console.log("idstudnet", id)  
  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      const response = await getGradeStudent(id);
      setGrades(response.data);
    } catch (error) {
      console.error('Lỗi khi load điểm:', error);
    }
  };

  // Hàm xóa điểm theo id
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa điểm này?')) return;

    try {
      await delGrade(id);
      alert('Xóa điểm thành công!');
      // Cập nhật lại danh sách điểm sau khi xóa
      setGrades(grades.filter((g) => g.id !== id));
    } catch (error) {
      console.error('Lỗi khi xóa điểm:', error);
      alert('Xóa điểm thất bại!');
    }
  };

  const filteredGrades = grades.filter((g) => {
    const studentId = g.studentId?.toString() ?? '';
    const classId = g.classId?.toString() ?? '';
    return studentId.includes(searchStudentId) && classId.includes(searchClassId);
  });

  const totalPages = Math.ceil(filteredGrades.length / PAGE_SIZE);
  const displayedGrades = filteredGrades.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý điểm</h2>

      {/* Bảng điểm */}
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã sinh viên</th>
            <th>Mã lớp</th>
            <th>Môn học</th>
            <th>Học kỳ</th>
            <th>Điểm CC</th>
            <th>Điểm thi</th>
            <th>Điểm TK</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {displayedGrades.map((grade, index) => (
            <tr key={grade.id}>
              <td>{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
              <td>{grade.studentId}</td>
              <td>{grade.classId}</td>
              <td>{grade.subjectName}</td>
              <td>{grade.semesterName}</td>
              <td>{grade.attendanceScore}</td>
              <td>{grade.examScore}</td>
              <td>{grade.finalScore}</td>
              <td>{grade.note}</td>
              
            </tr>
          ))}
          {displayedGrades.length === 0 && (
            <tr>
              <td colSpan="10">Không tìm thấy kết quả.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <nav className="d-flex justify-content-end">
        <ul className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
            >
              <button className="page-link" onClick={() => goToPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Grades;
