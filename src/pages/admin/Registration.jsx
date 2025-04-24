import React, { useState } from 'react';

const PAGE_SIZE = 5;

const Registration = () => {
  const [registrations, setRegistrations] = useState([
    { id: 1, student: 'Nguyễn Văn A', subject: 'Toán cao cấp', semester: 'HK1 2025' },
    { id: 2, student: 'Trần Thị B', subject: 'Vật lý', semester: 'HK1 2025' },
    { id: 3, student: 'Lê Văn C', subject: 'Hóa học', semester: 'HK1 2025' },
    { id: 4, student: 'Phạm Thị D', subject: 'Lập trình', semester: 'HK2 2025' },
    { id: 5, student: 'Đỗ Văn E', subject: 'Xác suất', semester: 'HK2 2025' },
    { id: 6, student: 'Ngô Thị F', subject: 'Triết học', semester: 'HK2 2025' },
  ]);

  const [trash, setTrash] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchStudent, setSearchStudent] = useState('');
  const [searchSubject, setSearchSubject] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = registrations.filter(
    (r) =>
      r.student.toLowerCase().includes(searchStudent.toLowerCase()) &&
      r.subject.toLowerCase().includes(searchSubject.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const displayed = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === displayed.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(displayed.map((r) => r.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      alert('Vui lòng chọn ít nhất một dòng để xóa.');
      return;
    }
    if (window.confirm(`Bạn có chắc muốn xóa ${selectedIds.length} dòng?`)) {
      const toTrash = registrations.filter((r) => selectedIds.includes(r.id));
      setTrash([...trash, ...toTrash]);
      setRegistrations(registrations.filter((r) => !selectedIds.includes(r.id)));
      setSelectedIds([]);
    }
  };

  const goToPage = (num) => {
    setCurrentPage(num);
    setSelectedIds([]);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Đăng ký học phần</h2>

      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo sinh viên"
            value={searchStudent}
            onChange={(e) => setSearchStudent(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo môn học"
            value={searchSubject}
            onChange={(e) => setSearchSubject(e.target.value)}
          />
        </div>
        <div className="col-md-4 text-end">
          <a href="/add_registration.html" className="btn btn-success">
            <i className="fa fa-plus"></i> Thêm đăng ký
          </a>
        </div>
      </div>

      <div className="d-flex justify-content-between mb-2">
        <div>
          <button className="btn btn-danger me-2" onClick={handleDeleteSelected}>
            <i className="fa fa-trash"></i> Xóa các ô đã chọn
          </button>
          <button className="btn btn-warning" onClick={handleSelectAll}>
            <i className="fa fa-check"></i>{' '}
            {selectedIds.length === displayed.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
          </button>
        </div>
        <button className="btn btn-info" onClick={() => alert(JSON.stringify(trash, null, 2))}>
          <i className="fa fa-trash"></i> Thùng rác ({trash.length})
        </button>
      </div>

      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th><input type="checkbox" checked={selectedIds.length === displayed.length && displayed.length > 0} onChange={handleSelectAll} /></th>
            <th>ID</th>
            <th>Sinh viên</th>
            <th>Môn học</th>
            <th>Học kỳ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {displayed.map((r) => (
            <tr key={r.id}>
              <td><input type="checkbox" checked={selectedIds.includes(r.id)} onChange={() => handleSelect(r.id)} /></td>
              <td>{r.id}</td>
              <td>{r.student}</td>
              <td>{r.subject}</td>
              <td>{r.semester}</td>
              <td>
                <a href="/edit_registration.html" className="btn btn-primary btn-sm me-2">
                  <i className="fa fa-pencil"></i>
                </a>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteSelected([r.id])}>
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
          {displayed.length === 0 && (
            <tr><td colSpan="6">Không tìm thấy kết quả.</td></tr>
          )}
        </tbody>
      </table>

      <nav className="d-flex justify-content-end">
        <ul className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => goToPage(i + 1)}>{i + 1}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Registration;
