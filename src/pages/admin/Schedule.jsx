import React, { useState } from 'react';

const PAGE_SIZE = 5;

const Schedule = () => {
  const [schedules, setSchedules] = useState([
    { id: 1, subject: 'Toán cao cấp', class: 'CNTT1', time: 'Thứ 2 - Tiết 1,2', location: 'Phòng A101' },
    { id: 2, subject: 'Vật lý đại cương', class: 'CNTT2', time: 'Thứ 3 - Tiết 3,4', location: 'Phòng B203' },
    { id: 3, subject: 'Lập trình C', class: 'CNTT3', time: 'Thứ 4 - Tiết 1,2', location: 'Phòng C102' },
  ]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [trash, setTrash] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(schedules.length / PAGE_SIZE);
  const displayedSchedules = schedules.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const idsInPage = displayedSchedules.map((s) => s.id);
    if (selectedIds.length === displayedSchedules.length) {
      setSelectedIds((prev) => prev.filter(id => !idsInPage.includes(id)));
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...idsInPage])]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      alert('Vui lòng chọn ít nhất một lịch học để xóa.');
      return;
    }
    if (window.confirm(`Bạn có chắc muốn xóa ${selectedIds.length} lịch học?`)) {
      const toTrash = schedules.filter((s) => selectedIds.includes(s.id));
      setTrash([...trash, ...toTrash]);
      setSchedules(schedules.filter((s) => !selectedIds.includes(s.id)));
      setSelectedIds([]);
    }
  };

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
    setSelectedIds([]);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý lịch học</h2>

      <div className="row mb-3">
        <div className="col-md-3">
          <input className="form-control" placeholder="Tìm theo môn học" />
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Tìm theo lớp" />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary">Tìm kiếm</button>
        </div>
        <div className="col-md-3 text-end">
          <a href="/schedule-add.html" className="btn btn-success">
            <i className="fa fa-plus"></i> Thêm lịch học
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
            {selectedIds.length === displayedSchedules.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
          </button>
        </div>
        <a className="btn btn-info" onClick={() => alert(JSON.stringify(trash, null, 2))}>
          <i className="fa fa-trash"></i> Lịch học đã xóa ({trash.length})
        </a>
      </div>

      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={displayedSchedules.length > 0 && displayedSchedules.every(s => selectedIds.includes(s.id))}
              />
            </th>
            <th>ID</th>
            <th>Môn học</th>
            <th>Lớp</th>
            <th>Thời gian</th>
            <th>Phòng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {displayedSchedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(schedule.id)}
                  onChange={() => handleSelect(schedule.id)}
                />
              </td>
              <td>{schedule.id}</td>
              <td>{schedule.subject}</td>
              <td>{schedule.class}</td>
              <td>{schedule.time}</td>
              <td>{schedule.location}</td>
              <td className="d-flex justify-content-center gap-2">
                <a href="/schedule-edit.html" className="btn btn-primary">
                  <i className="fa fa-pencil-alt"></i>
                </a>
                <button className="btn btn-danger" onClick={() => handleDeleteSelected([schedule.id])}>
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
          {displayedSchedules.length === 0 && (
            <tr>
              <td colSpan="7">Không có lịch học nào.</td>
            </tr>
          )}
        </tbody>
      </table>

      <nav className="d-flex justify-content-end mt-3">
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

export default Schedule;
