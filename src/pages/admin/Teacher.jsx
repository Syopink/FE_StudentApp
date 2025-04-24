import React, { useState } from 'react';

const Teacher = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  const teachers = [
    { id: 1, name: 'Nguyễn Thị C', email: 'c@gmail.com', department: 'Công nghệ thông tin' },
    { id: 2, name: 'Trần Văn D', email: 'd@gmail.com', department: 'Chính trị' },
    { id: 3, name: 'Lê Văn E', email: 'e@gmail.com', department: 'Toán học' },
    { id: 4, name: 'Hoàng Thị F', email: 'f@gmail.com', department: 'Kỹ thuật' },
    { id: 5, name: 'Phạm Văn G', email: 'g@gmail.com', department: 'Vật lý' },
  ];

  const totalPages = Math.ceil(teachers.length / itemsPerPage);
  const currentItems = teachers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSelectTeacher = (id) => {
    setSelectedTeachers(prev =>
      prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    const pageIds = currentItems.map(t => t.id);
    if (e.target.checked) {
      setSelectedTeachers(prev => [...new Set([...prev, ...pageIds])]);
    } else {
      setSelectedTeachers(prev => prev.filter(id => !pageIds.includes(id)));
    }
  };

  const renderPagination = () => (
    <ul className="pagination">
      {[...Array(totalPages)].map((_, i) => (
        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
          <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý giảng viên</h2>

      <div className="row mb-3">
        <div className="col-md-3">
          <input className="form-control" placeholder="Tìm theo tên" />
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Tìm theo email" />
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Tìm theo khoa" />
        </div>
        <div className="col-md-3 text-end">
          <a href="/admin/teacher/add" className="btn btn-success">
            <i className="fas fa-plus"></i> Thêm giảng viên
          </a>
        </div>
      </div>

      <div className="d-flex justify-content-between mb-2">
        <div>
          <button className="btn btn-danger me-2">
            <i className="fa fa-trash"></i> Xóa các ô đã chọn
          </button>
          <button className="btn btn-warning">
            <i className="fa fa-check"></i>{' '}
            {selectedTeachers.length === currentItems.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
          </button>
        </div>
        <a className="btn btn-info" href="/admin/teachers/trash">
          <i className="fa fa-trash"></i> Giáo viên đã xóa
        </a>
      </div>

      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={currentItems.every(t => selectedTeachers.includes(t.id))}
              />
            </th>
            <th>ID</th>
            <th>Họ & Tên</th>
            <th>Email</th>
            <th>Khoa</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(t => (
            <tr key={t.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedTeachers.includes(t.id)}
                  onChange={() => handleSelectTeacher(t.id)}
                />
              </td>
              <td>{t.id}</td>
              <td>{t.name}</td>
              <td>{t.email}</td>
              <td>{t.department}</td>
              <td className="d-flex justify-content-center gap-2">
                <a href={`/admin/teacher/edit`} className="btn btn-primary">
                  <i className="fa fa-pencil-alt"></i>
                </a>
                <a href={`/admin/teacher/delete/${t.id}`} className="btn btn-danger">
                  <i className="fa fa-trash"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className="d-flex justify-content-end">{renderPagination()}</nav>
    </div>
  );
};

export default Teacher;
