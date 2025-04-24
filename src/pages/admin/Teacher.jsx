import React, { useEffect, useState } from 'react';
import { getTeachers } from '../../services/Api'; // Giả sử có API getTeachers

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');

  const itemsPerPage = 2;

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getTeachers();
        setTeachers(response.data);
        setFilteredTeachers(response.data);
      } catch (error) {
        console.error('Lỗi lấy danh sách giảng viên:', error);
      }
    };
    fetchTeachers();
  }, []);

  useEffect(() => {
    const filtered = teachers.filter((t) =>
      (t.teacherName || '').toLowerCase().includes(searchName.toLowerCase()) &&
      (t.teacherEmail || '').toLowerCase().includes(searchEmail.toLowerCase())
    );
    setFilteredTeachers(filtered);
    setCurrentPage(1); 
  }, [searchName, searchEmail, teachers]);

  const handleCheckboxChange = (teacherId) => {
    setSelectedTeachers((prev) =>
      prev.includes(teacherId)
        ? prev.filter((id) => id !== teacherId)
        : [...prev, teacherId]
    );
  };

  const handleSelectAllChange = () => {
    if (selectedTeachers.length === currentTeachers.length) {
      setSelectedTeachers([]);
    } else {
      setSelectedTeachers(currentTeachers.map((t) => t.id));
    }
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);

  const isTeachersEmpty = filteredTeachers.length === 0;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý giảng viên</h2>

      {/* Tìm kiếm */}
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
            placeholder="Tìm theo email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
        </div>
        <div className="col-md-4 text-end">
          <a href="/admin/teachers/add" className="btn btn-success">
            <i className="fas fa-plus"></i> Thêm giảng viên
          </a>
        </div>
      </div>

      {/* Nút hành động */}
      <div className="d-flex justify-content-between mb-2">
        <div>
          <button className="btn btn-danger me-2">
            <i className="fa fa-trash"></i> Xóa các ô đã chọn
          </button>
          {/* Chỉ hiển thị "Bỏ chọn tất cả" nếu có giảng viên để chọn */}
          {!isTeachersEmpty && (
            <button className="btn btn-warning" onClick={handleSelectAllChange}>
              <i className="fa fa-check"></i>{' '}
              {selectedTeachers.length === currentTeachers.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
            </button>
          )}
        </div>
        <a className="btn btn-info" href="/admin/teachers/trash">
          <i className="fa fa-trash"></i> Giảng viên đã xóa
        </a>
      </div>

      {/* Bảng giảng viên */}
      {isTeachersEmpty ? (
        <div className="alert alert-info">Không tìm thấy giảng viên nào!</div>
      ) : (
        <>
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAllChange}
                    checked={currentTeachers.length > 0 && selectedTeachers.length === currentTeachers.length}
                  />
                </th>
                <th>ID</th>
                <th>Họ & Tên</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedTeachers.includes(teacher.id)}
                      onChange={() => handleCheckboxChange(teacher.id)}
                    />
                  </td>
                  <td>{teacher.id}</td>
                  <td>{teacher.teacherName}</td>
                  <td>{teacher.teacherEmail}</td>
                  <td>{teacher.teacherAddress}</td>
                  <td className="d-flex justify-content-center gap-2">
                    <a href={`/admin/teacher/edit/${teacher.id}`} className="btn btn-primary">
                      <i className="fa fa-pencil-alt"></i>
                    </a>
                    <a href={`/admin/teachers/delete/${teacher.id}`} className="btn btn-danger">
                      <i className="fa fa-trash"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Phân trang */}
      <nav className="d-flex justify-content-end">
        <ul className="pagination">
          {Array.from({ length: totalPages }).map((_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Teacher;
