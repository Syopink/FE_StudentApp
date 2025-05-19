import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
        <div className="col-md-4">
          <input className="form-control" placeholder="Tìm theo môn học" />
        </div>
        <div className="col-md-4">
          <input className="form-control" placeholder="Tìm theo lớp" />
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary">Tìm kiếm</button>
        </div>
      </div>

      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Môn học</th>
            <th>Lớp</th>
            <th>Thời gian</th>
            <th>Phòng</th>
          </tr>
        </thead>
        <tbody>
          {displayedSchedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.id}</td>
              <td>{schedule.subject}</td>
              <td>{schedule.class}</td>
              <td>{schedule.time}</td>
              <td>{schedule.location}</td>
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
