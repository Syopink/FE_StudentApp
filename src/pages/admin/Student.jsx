import React, { useEffect, useState } from 'react';
import Pagination from '../../shared/components/Pagination';
import Http from '../../services/Http'; // Import Http service for API calls

const Student = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchStudents = async () => {
        try {
          const response = await Http.get('/api/users/student');
          console.log("a", response.data);
        } catch (error) {
          console.error('Lỗi lấy danh sách sinh viên:', error);
        }
      };

      fetchStudents();
  }, []);

  const totalPages = 5; // ví dụ

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchFaculty, setSearchFaculty] = useState('');

  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter(id => id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
  };

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      setSelectedStudents(students.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý sinh viên</h2>

      {/* Bộ lọc tìm kiếm */}
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
            placeholder="Tìm theo email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo khoa"
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

      {/* Hành động */}
      <div className="d-flex justify-content-between mb-2">
        <div>
          <button className="btn btn-danger me-2">
            <i className="fa fa-trash"></i> Xóa các ô đã chọn
          </button>
          <button className="btn btn-warning" onClick={handleSelectAllChange}>
            <i className="fa fa-check"></i>{' '}
            {selectedStudents.length === 5 ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
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
                checked={students.length > 0 && selectedStudents.length === students.length}
              />
            </th>
            <th>ID</th>
            <th>Họ & Tên</th>
            <th>Email</th>
            <th>Khoa</th>
            <th>Lớp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => handleCheckboxChange(student.id)}
                />
              </td>
              <td>{student.id}</td>
              <td>{student.fullName || `${student.firstName} ${student.lastName}`}</td>
              <td>{student.email}</td>
              <td>
                <span className="label label-info">{student.faculty?.name || "Không rõ"}</span>
              </td>
              <td>
                <span className="label label-info">{student.className || "Không rõ"}</span>
              </td>
              <td className="d-flex justify-content-center gap-2">
                <a href={`/admin/students/edit/${student.id}`} className="btn btn-primary">
                  <i className="fa fa-pencil-alt"></i>
                </a>
                <a href={`/admin/students/delete/${student.id}`} className="btn btn-danger">
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

export default Student;
