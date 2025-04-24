import React, { useState } from 'react';

const PAGE_SIZE = 5;

const Subject = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Toán cao cấp', code: 'TC001', credits: 3 },
    { id: 2, name: 'Vật lý đại cương', code: 'VL002', credits: 4 },
    { id: 3, name: 'Hóa học cơ bản', code: 'HH003', credits: 3 },
    { id: 4, name: 'Triết học Mác - Lênin', code: 'TR004', credits: 2 },
    { id: 5, name: 'Kỹ thuật lập trình', code: 'LT005', credits: 3 },
    { id: 6, name: 'Xác suất thống kê', code: 'XS006', credits: 3 },
    { id: 7, name: 'Nhập môn AI', code: 'AI007', credits: 3 },
  ]);

  const [trash, setTrash] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchCode, setSearchCode] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchName.toLowerCase()) &&
      s.code.toLowerCase().includes(searchCode.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSubjects.length / PAGE_SIZE);
  const displayedSubjects = filteredSubjects.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === displayedSubjects.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(displayedSubjects.map((s) => s.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      alert('Vui lòng chọn ít nhất một môn học để xóa.');
      return;
    }
    if (window.confirm(`Bạn có chắc muốn xóa ${selectedIds.length} môn học?`)) {
      const toTrash = subjects.filter((s) => selectedIds.includes(s.id));
      setTrash([...trash, ...toTrash]);
      setSubjects(subjects.filter((s) => !selectedIds.includes(s.id)));
      setSelectedIds([]);
      alert('Môn học đã được xóa thành công!');
    }
  };

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
    setSelectedIds([]);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý môn học</h2>

      {/* Bộ lọc tìm kiếm */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo tên"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo mã môn học"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
          />
        </div>
        <div className="col-md-4 text-end">
          <a href="/admin/subject/add" className="btn btn-success">
            <i className="fa fa-plus"></i> Thêm môn học
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
            {selectedIds.length === displayedSubjects.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
          </button>
        </div>
        <a className="btn btn-info" onClick={() => alert(JSON.stringify(trash, null, 2))}>
          <i className="fa fa-trash"></i> Thùng rác ({trash.length})
        </a>
      </div>

      {/* Bảng môn học */}
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedIds.length === displayedSubjects.length && displayedSubjects.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th>ID</th>
            <th>Tên môn học</th>
            <th>Mã môn học</th>
            <th>Số tín chỉ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {displayedSubjects.map((subject) => (
            <tr key={subject.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(subject.id)}
                  onChange={() => handleSelect(subject.id)}
                />
              </td>
              <td>{subject.id}</td>
              <td>{subject.name}</td>
              <td>{subject.code}</td>
              <td>{subject.credits}</td>
              <td>
                <a href="/admin/subject/edit" className="btn btn-primary btn-sm me-2">
                  <i className="fa fa-pencil"></i>
                </a>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteSelected([subject.id])}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
          {displayedSubjects.length === 0 && (
            <tr>
              <td colSpan="6">Không tìm thấy môn học nào.</td>
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

export default Subject;
