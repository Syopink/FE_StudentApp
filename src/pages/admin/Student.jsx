import React, { useEffect, useState } from 'react';
import { getStudents} from '../../services/Api';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [searchMsv, setSearchMsv] = useState('');
  const [searchFaculty, setSearchFaculty] = useState('');

  const itemsPerPage = 5;

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

  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAllChange = () => {
    if (selectedStudents.length === currentStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(currentStudents.map((s) => s.student_code));
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
          <a href="/admin/students/add" className="btn btn-success">
            <i className="fas fa-plus"></i> Thêm sinh viên
          </a>
        </div>
      </div>

      {/* Nút hành động */}
      <div className="d-flex justify-content-between mb-2">
        <div>
          <button className="btn btn-danger me-2">
            <i className="fa fa-trash"></i> Xóa các ô đã chọn
          </button>
          <button className="btn btn-warning" onClick={handleSelectAllChange}>
            <i className="fa fa-check"></i>{' '}
            {selectedStudents.length === currentStudents.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
          </button>
        </div>
        <a className="btn btn-info" href="/admin/students/trash">
          <i className="fa fa-trash"></i> Sinh viên đã xóa
        </a>
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
            <tr key={student.student_code}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.student_code)}
                  onChange={() => handleCheckboxChange(student.student_code)}
                />
              </td>
              <td>{student.student_code}</td>
              <td>{student.student_name}</td>
              <td>{student.gender}</td>
              <td>{student.address}</td>
              <td className="d-flex justify-content-center gap-2">
              <a href={`/admin/students/edit/${student.student_code.replace(/\D/g, '')}`} className="btn btn-primary">
              <i className="fa fa-pencil-alt"></i>
                </a>
                <a href={`/admin/students/delete/${student.student_code}`} className="btn btn-danger">
                  <i className="fa fa-trash"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default Student;
