import React, { useState } from 'react';

const Class = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // số lớp trên mỗi trang
  const [selectedClasses, setSelectedClasses] = useState([]);

  const classes = [
    { id: 1, name: 'Công nghệ phần mềm 1', teacher: 'Nguyễn Văn A', students: 40 },
    { id: 2, name: 'Công nghệ phần mềm 2', teacher: 'Trần Thị B', students: 28 },
    { id: 3, name: 'Kỹ thuật phần mềm', teacher: 'Lê Văn C', students: 35 },
    { id: 4, name: 'Phân tích hệ thống', teacher: 'Ngô Thị D', students: 32 },
    { id: 5, name: 'Kiến trúc phần mềm', teacher: 'Phạm Văn E', students: 38 },
  ];

  const totalPages = Math.ceil(classes.length / itemsPerPage);

  const handleCheckboxChange = (classId) => {
    setSelectedClasses((prevSelected) =>
      prevSelected.includes(classId)
        ? prevSelected.filter(id => id !== classId)
        : [...prevSelected, classId]
    );
  };

  const handleSelectAllChange = (e) => {
    const pageClassIds = currentItems.map(cls => cls.id);
    if (e.target.checked) {
      setSelectedClasses((prev) => [...new Set([...prev, ...pageClassIds])]);
    } else {
      setSelectedClasses((prev) => prev.filter(id => !pageClassIds.includes(id)));
    }
  };

  const currentItems = classes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
      <h2 className="mb-4">Quản lý lớp học</h2>

      <div className="row mb-3">
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Tìm theo tên lớp" />
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Tìm theo tên giảng viên" />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary">Tìm kiếm</button>
        </div>
        <div className="col-md-3 text-end">
          <a href="/admin/class/add" className="btn btn-success">
            <i className="fas fa-plus"></i> Thêm lớp học
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
            {selectedClasses.length === currentItems.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
          </button>
        </div>
        <a className="btn btn-info" href="/admin/classes/trash">
          <i className="fa fa-trash"></i> Lớp học đã xóa
        </a>
      </div>

      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAllChange}
                checked={currentItems.every(cls => selectedClasses.includes(cls.id))}
              />
            </th>
            <th>ID</th>
            <th>Tên lớp</th>
            <th>Giáo viên chủ nhiệm</th>
            <th>Sĩ số</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(cls => (
            <tr key={cls.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedClasses.includes(cls.id)}
                  onChange={() => handleCheckboxChange(cls.id)}
                />
              </td>
              <td>{cls.id}</td>
              <td>{cls.name}</td>
              <td>{cls.teacher}</td>
              <td>{cls.students}</td>
              <td className="d-flex justify-content-center gap-2">
                <a href={`/admin/class/edit`} className="btn btn-primary">
                  <i className="fa fa-pencil-alt"></i>
                </a>
                <a href={`/admin/classes/delete/${cls.id}`} className="btn btn-danger">
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

export default Class;
