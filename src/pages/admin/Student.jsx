import React, { useEffect, useState } from 'react';
import { getStudents, delStudent } from '../../services/Api';
import { Link } from 'react-router-dom';

const Student = () => {
  const [students, setStudents] = useState([]);

  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]); // lưu student_id
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [searchMsv, setSearchMsv] = useState('');
  const [searchFaculty, setSearchFaculty] = useState('');

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        setStudents(response.data);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error('Lỗi lấy danh sách sinh viên:', error);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter((s) =>
      s.student_name.toLowerCase().includes(searchName.toLowerCase()) &&
      (s.student_code || '').toLowerCase().includes(searchMsv.toLowerCase()) &&
      s.address.toLowerCase().includes(searchFaculty.toLowerCase())
    );
    setFilteredStudents(filtered);
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
  }, [searchName, searchMsv, searchFaculty, students]);

  // Khi checkbox thay đổi, lưu student_id
  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Chọn/Bỏ chọn tất cả trên trang hiện tại
  const handleSelectAllChange = () => {
    if (selectedStudents.length === currentStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(currentStudents.map((s) => s.student_id));
    }
  };

  // Xóa nhiều sinh viên đã chọn theo student_id
  const handleDeleteSelected = async () => {
    if (selectedStudents.length === 0) {
      alert('Vui lòng chọn ít nhất một sinh viên để xóa!');
      return;
    }

    if (!window.confirm('Bạn có chắc muốn xóa các sinh viên đã chọn?')) return;

    try {
      await Promise.all(selectedStudents.map(id => delStudent(id)));
      const updatedStudents = students.filter(student => !selectedStudents.includes(student.student_id));
      setStudents(updatedStudents);
      setSelectedStudents([]);
      alert('Xóa các sinh viên đã chọn thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa sinh viên:', error);
      alert('Xảy ra lỗi khi xóa. Vui lòng thử lại.');
    }
  };

  // Xóa 1 sinh viên
  const handleDeleteOne = async (studentId) => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xóa sinh viên này không?');
    if (!confirmDelete) return;

    try {
      await delStudent(studentId);
      const updatedStudents = students.filter(s => s.student_id !== studentId);
      setStudents(updatedStudents);
      alert('Xóa sinh viên thành công!');
    } catch (error) {
      console.error('Lỗi khi xóa sinh viên:', error);
      if (error.response) {
        console.error('Lỗi chi tiết:', error.response.data);
        alert(`Lỗi: ${JSON.stringify(error.response.data)}`);
      } else {
        alert('Xóa thất bại, vui lòng thử lại.');
      }
    }
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý sinh viên</h2>

      {/* Tìm kiếm */}
      <div className="row mb-3">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo tên"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo mã sinh viên"
            value={searchMsv}
            onChange={(e) => setSearchMsv(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo địa chỉ"
            value={searchFaculty}
            onChange={(e) => setSearchFaculty(e.target.value)}
          />
        </div>
        <div className="col-md-3 text-end">
          <Link to="/admin/students/add" className="btn btn-success">
            <i className="fas fa-plus"></i> Thêm sinh viên
          </Link>
        </div>
      </div>

      {/* Nút hành động */}
      <div className="d-flex justify-content-between mb-2">
        <div>
          <button className="btn btn-danger me-2" onClick={handleDeleteSelected}>
            <i className="fa fa-trash"></i> Xóa các ô đã chọn
          </button>
          <button className="btn btn-warning" onClick={handleSelectAllChange}>
            <i className="fa fa-check"></i>{' '}
            {selectedStudents.length === currentStudents.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
          </button>
        </div>
      </div>

      {/* Bảng sinh viên */}
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAllChange}
                checked={
                  currentStudents.length > 0 &&
                  selectedStudents.length === currentStudents.length
                }
              />
            </th>
            <th>Mã sinh viên</th>
            <th>Họ & Tên</th>
            <th>Giới tính</th>
            <th>Khoa</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.student_id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.student_id)}
                  onChange={() => handleCheckboxChange(student.student_id)}
                />
              </td>
              <td>{student.student_code}</td>
              <td>{student.student_name}</td>
              <td>{student.gender === 'Male' ? 'Nam' : student.gender === 'Female' ? 'Nữ' : student.gender}</td>
              <td>{student.address}</td>
              <td className="d-flex justify-content-center gap-2">
<Link to={`/admin/students/edit/${student.student_id}`} className="btn btn-primary">
                  <i className="fa fa-pencil-alt"></i>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteOne(student.student_id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
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

export default Student;
