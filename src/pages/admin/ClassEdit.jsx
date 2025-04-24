import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDepartment, updateDepartment } from '../../services/Api'; // Đảm bảo bạn có updateDepartment trong API

const DepartmentEdit = () => {
  const { id } = useParams();  
  console.log(id)
  const navigate = useNavigate();

  const [dept, setDept] = useState(null);

  // Lấy dữ liệu khoa khi component được tải
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDepartment(id);
        console.log(res); // Xem cấu trúc dữ liệu trả về từ API

        setDept(res.data);
        console.log(dept.deptName)
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu khoa:', error);
      }
    };
    fetchData();
  }, [id]);

  // Nếu dữ liệu chưa tải xong
  if (!dept) return <p>Đang tải dữ liệu...</p>;

  // Xử lý thay đổi giá trị các trường
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setDept(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gọi API cập nhật khoa      
      await updateDepartment(id, dept);
      console.log((await updateDepartment(id, dept)).data);
      alert(`✅ Đã cập nhật khoa ${dept.deptName}`);
      navigate('/admin/class'); // Chuyển hướng đến danh sách khoa
    } catch (err) {
      console.error("❌ Lỗi cập nhật:", err);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Chỉnh sửa khoa</h2>
      <form onSubmit={handleSubmit}>
        {/* Tên khoa */}
        <div className="mb-3">
          <label htmlFor="deptName" className="form-label">Tên Khoa</label>
          <input
            type="text"
            className="form-control"
            id="deptName"
            name="deptName"
            value={dept.deptName}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Mã khoa */}
        <div className="mb-3">
          <label htmlFor="deptCode" className="form-label">Mã Khoa</label>
          <input
            type="text"
            className="form-control"
            id="deptCode"
            name="deptCode"
            value={dept.deptCode}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mô tả khoa */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Mô tả</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={dept.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Nút Cập nhật */}
        <button type="submit" className="btn btn-primary">Cập nhật</button>
      </form>
    </div>
  );
};

export default DepartmentEdit;
