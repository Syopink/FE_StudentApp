import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getsubjects, delsubjects } from '../../services/Api';

const PAGE_SIZE = 5;

const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const [trash, setTrash] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchCode, setSearchCode] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await getsubjects();
        const data = response.data;
        const subjectsData = Array.isArray(data) ? data : [data];
        const mappedSubjects = subjectsData.map((s) => ({
          id: s.id,
          name: s.subjectName,
          code: s.subjectCode,
          credits: s.credits,
          dept: s.deptName,
          theory: s.theoryPeriods,
          practice: s.practicalPeriods
        }));
        setSubjects(mappedSubjects);
      } catch (error) {
        console.error("Lỗi khi tải danh sách môn học:", error);
      }
    };
    fetchSubjects();
  }, []);

  // Lọc theo tìm kiếm
  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchName.toLowerCase()) &&
      s.code.toLowerCase().includes(searchCode.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSubjects.length / PAGE_SIZE);

  // Hiển thị phân trang dữ liệu
  const displayedSubjects = filteredSubjects.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Chọn/xóa checkbox
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

  // Xóa 1 hoặc nhiều môn học
  const handleDeleteSelected = async (customIds) => {
    const idsToDelete = customIds || selectedIds;
    if (idsToDelete.length === 0) {
      alert('Vui lòng chọn ít nhất một môn học để xóa.');
      return;
    }
    if (window.confirm(`Bạn có chắc muốn xóa ${idsToDelete.length} môn học?`)) {
      try {
        // Xóa từng môn học qua API
        for (const id of idsToDelete) {
          await delsubjects(id);
        }
        // Cập nhật lại danh sách
        const toTrash = subjects.filter((s) => idsToDelete.includes(s.id));
        setTrash((prev) => [...prev, ...toTrash]);
        setSubjects(subjects.filter((s) => !idsToDelete.includes(s.id)));
        setSelectedIds([]);
        alert('Môn học đã được xóa thành công!');
      } catch (error) {
        console.error("Lỗi khi xóa môn học:", error);
        alert('Xóa môn học thất bại!');
      }
    }
  };

  const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
    setSelectedIds([]);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Quản lý môn học</h2>

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
            placeholder="Tìm theo mã môn học"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
          />
        </div>
        <div className="col-md-4 text-end">
          <Link to="/admin/subject/add" className="btn btn-success">
            <i className="fa fa-plus"></i> Thêm môn học
          </Link>
        </div>
      </div>

      {/* Hành động */}
      <div className="d-flex justify-content-between mb-2">
        <div>
          <button className="btn btn-danger me-2" onClick={() => handleDeleteSelected()}>
            <i className="fa fa-trash"></i> Xóa các ô đã chọn
          </button>
          <button className="btn btn-warning" onClick={handleSelectAll}>
            <i className="fa fa-check"></i>{' '}
            {selectedIds.length === displayedSubjects.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
          </button>
        </div>
        <button className="btn btn-info" onClick={() => alert(JSON.stringify(trash, null, 2))}>
          <i className="fa fa-trash"></i> Thùng rác ({trash.length})
        </button>
      </div>

      {/* Bảng dữ liệu */}
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  selectedIds.length === displayedSubjects.length &&
                  displayedSubjects.length > 0
                }
                onChange={handleSelectAll}
              />
            </th>
            <th>ID</th>
            <th>Tên môn học</th>
            <th>Mã môn học</th>
            <th>Số tín chỉ</th>
            <th>Khoa</th>
            <th>Lý thuyết</th>
            <th>Thực hành</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {displayedSubjects.length > 0 ? (
            displayedSubjects.map((subject) => (
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
                <td>{subject.dept}</td>
                <td>{subject.theory}</td>
                <td>{subject.practice}</td>
                <td>
                  <Link
                    to={`/admin/subject/edit/${subject.id}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    <i className="fa fa-pencil"></i>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteSelected([subject.id])}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">Không tìm thấy môn học nào.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang kiểu Trước 1 ... lastPage Sau */}
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

export default Subject;
