import React, { useEffect, useState } from 'react';
import { getDepartments } from '../../services/Api'; // Import API

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]); // Lưu danh sách khoa
  const [selectedDept, setSelectedDept] = useState(''); // Khoa được chọn
  const [searchName, setSearchName] = useState(''); // Tìm kiếm theo tên khoa
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 3; // Số khoa trên mỗi trang

  // Lấy danh sách khoa từ API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const deptResponse = await getDepartments();
        setDepartments(deptResponse.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách khoa:', error);
      }
    };

    fetchDepartments();
  }, []);

  // Lọc các khoa theo tên khoa và khoa được chọn
  const filteredDepartments = departments.filter(dept => {
    const matchesName = dept.deptName.toLowerCase().includes(searchName.toLowerCase());
    const matchesDept = selectedDept ? dept.deptCode === selectedDept : true;
    return matchesName && matchesDept;
  });

  // Tính toán tổng số trang
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);

  // Các khoa hiển thị trên trang hiện tại
  const currentDepartments = filteredDepartments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Hiển thị phân trang
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
      <h2 className="mb-4">Quản lý Khoa</h2>

      {/* Tìm kiếm và chọn khoa */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo tên khoa"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value="">Tất cả khoa</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.deptCode}>
                {dept.deptName} {/* Hiển thị tên khoa */}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 text-end">
          <a href="/admin/class/add" className="btn btn-success">
            <i className="fas fa-plus"></i> Thêm khoa
          </a>
        </div>
      </div>

      {/* Hiển thị danh sách các khoa */}
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Khoa</th>
            <th>Mã Khoa</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentDepartments.map(dept => (
            <tr key={dept.id}>
              <td>{dept.id}</td>
              <td>{dept.deptName}</td>
              <td>{dept.deptCode}</td>
              <td>{dept.description}</td>
              <td className="d-flex justify-content-center gap-2">
                <a href={`/admin/class/edit/${dept.id}`} className="btn btn-primary">
                  <i className="fa fa-pencil-alt"></i>
                </a>
                <a href={`/admin/class/delete/${dept.id}`} className="btn btn-danger">
                  <i className="fa fa-trash"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <nav className="d-flex justify-content-end">
        {renderPagination()}
      </nav>
    </div>
  );
};

export default DepartmentList;
