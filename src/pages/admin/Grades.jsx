import React, { useState, useEffect } from 'react';
import { getGrades, delGrade } from '../../services/Api'; // Thêm hàm deleteGrade
import { Link } from 'react-router-dom';

const PAGE_SIZE = 5;

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [searchStudentId, setSearchStudentId] = useState('');
  const [searchClassId, setSearchClassId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      const response = await getGrades();
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

      {/* Bộ lọc tìm kiếm */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo mã sinh viên"
            value={searchStudentId}
            onChange={(e) => setSearchStudentId(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo mã lớp"
            value={searchClassId}
            onChange={(e) => setSearchClassId(e.target.value)}
          />
        </div>
        <div className="col-md-4 text-end">
          <Link to="/admin/grades/add" className="btn btn-success">
            <i className="fas fa-plus"></i> Thêm điểm
          </Link>
        </div>
      </div>

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
            <th>Hành động</th>
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
              <td className="d-flex justify-content-center gap-2">
                <Link
                  to={`/admin/grades/edit/${grade.id}`}
                  className="btn btn-primary"
                >
                  <i className="fa fa-pencil-alt"></i>
                </Link>
                {/* Nút xóa ngay */}
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(grade.id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </td>
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
      {/* Phân trang */}
<nav className="d-flex justify-content-end">
  <ul className="pagination">
    {/* Nút Trước */}
    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
      <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        Trước
      </button>
    </li>

    {/* Trang 1 luôn hiện */}
    <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
      <button className="page-link" onClick={() => setCurrentPage(1)}>
        1
      </button>
    </li>

    {/* Dấu ... nếu currentPage > 3 */}
    {currentPage > 3 && totalPages > 3 && (
      <li className="page-item disabled">
        <span className="page-link">...</span>
      </li>
    )}

    {/* Trang hiện tại nếu không phải 1 hoặc trang cuối */}
    {currentPage !== 1 && currentPage !== totalPages && currentPage > 1 && currentPage < totalPages && (
      <li className="page-item active">
        <button className="page-link" onClick={() => setCurrentPage(currentPage)}>
          {currentPage}
        </button>
      </li>
    )}

    {/* Dấu ... nếu currentPage < totalPages - 2 */}
    {currentPage < totalPages - 2 && totalPages > 3 && (
      <li className="page-item disabled">
        <span className="page-link">...</span>
      </li>
    )}

    {/* Trang cuối nếu > 1 */}
    {totalPages > 1 && (
      <li className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
        <button className="page-link" onClick={() => setCurrentPage(totalPages)}>
          {totalPages}
        </button>
      </li>
    )}

    {/* Nút Sau */}
    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
      <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
        Sau
      </button>
    </li>
  </ul>
</nav>

    </div>
  );
};

export default Grades;
