import React, { useState } from 'react';

const PAGE_SIZE = 5;

const Grades = () => {
  const [grades, setGrades] = useState([
    { id: 1, student: 'Nguyễn Văn A', subject: 'Toán cao cấp', score: 9.5 },
    { id: 2, student: 'Trần Thị B', subject: 'Vật lý', score: 8.0 },
    { id: 3, student: 'Lê Văn C', subject: 'Hóa học', score: 7.0 },
    { id: 4, student: 'Phạm Thị D', subject: 'Lập trình', score: 9.0 },
    { id: 5, student: 'Đỗ Văn E', subject: 'Xác suất', score: 6.5 },
    { id: 6, student: 'Ngô Thị F', subject: 'Triết học', score: 8.5 },
  ]);

  const [trash, setTrash] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchStudent, setSearchStudent] = useState('');
  const [searchSubject, setSearchSubject] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredGrades = grades.filter(
    (g) =>
      g.student.toLowerCase().includes(searchStudent.toLowerCase()) &&
      g.subject.toLowerCase().includes(searchSubject.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGrades.length / PAGE_SIZE);
  const displayedGrades = filteredGrades.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === displayedGrades.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(displayedGrades.map((g) => g.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      alert('Vui lòng chọn ít nhất một dòng để xóa.');
      return;
    }
    if (window.confirm(`Bạn có chắc muốn xóa ${selectedIds.length} dòng?`)) {
      const toTrash = grades.filter((g) => selectedIds.includes(g.id));
      setTrash([...trash, ...toTrash]);
      setGrades(grades.filter((g) => !selectedIds.includes(g.id)));
      setSelectedIds([]);
    }
  };

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
    setSelectedIds([]);
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
            placeholder="Tìm theo tên sinh viên"
            value={searchStudent}
            onChange={(e) => setSearchStudent(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo tên môn học"
            value={searchSubject}
            onChange={(e) => setSearchSubject(e.target.value)}
          />
        </div>
        <div className="col-md-4 text-end">
          <a href="/admin/grades/add" className="btn btn-success">
            <i className="fa fa-plus"></i> Thêm điểm
          </a>
        </div>
      </div>

      {/* Hành động */}
      <div className="d-flex justify-content-between mb-2">
        <div>
          <button className="btn btn-danger me-2" onClick={handleDeleteSelected}>
            <i className="fa fa-trash"></i> Xóa các ô đã chọn
          </button>
          <button className="btn btn-warning" onClick={handleSelectAll}>
            <i className="fa fa-check"></i>{' '}
            {selectedIds.length === displayedGrades.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
          </button>
        </div>
        <a className="btn btn-info" onClick={() => alert(JSON.stringify(trash, null, 2))}>
          <i className="fa fa-trash"></i> Thùng rác ({trash.length})
        </a>
      </div>

      {/* Bảng điểm */}
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  selectedIds.length === displayedGrades.length && displayedGrades.length > 0
                }
                onChange={handleSelectAll}
              />
            </th>
            <th>ID</th>
            <th>Sinh viên</th>
            <th>Môn học</th>
            <th>Điểm</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {displayedGrades.map((grade) => (
            <tr key={grade.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(grade.id)}
                  onChange={() => handleSelect(grade.id)}
                />
              </td>
              <td>{grade.id}</td>
              <td>{grade.student}</td>
              <td>{grade.subject}</td>
              <td>{grade.score}</td>
              <td>
                <a href="/admin/grades/edit" className="btn btn-primary btn-sm me-2">
                  <i className="fa fa-pencil"></i>
                </a>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteSelected([grade.id])}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
          {displayedGrades.length === 0 && (
            <tr>
              <td colSpan="6">Không tìm thấy kết quả.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <nav className="d-flex justify-content-end">
        <ul className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
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
