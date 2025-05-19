import React, { useState, useEffect } from 'react';
import { getDepartments } from '../../services/Api'; // Import API for fetching departments

const ClassAdd = () => {
  const [className, setClassName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [studentCount, setStudentCount] = useState('');
  const [departments, setDepartments] = useState([]); // State to store departments
  const [selectedDept, setSelectedDept] = useState(''); // Selected department (khoa)

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const deptResponse = await getDepartments(); // Fetch departments
        setDepartments(deptResponse.data); // Set the department data
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đã thêm Khoa học: ${className} - Giáo viên: ${teacherName} - Sĩ số: ${studentCount} - Khoa: ${selectedDept}`);
    // Call API to add the class here if needed
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Thêm Khoa</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="className" className="form-label">Tên Khoa</label>
          <input
            type="text"
            className="form-control"
            id="className"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="studentCount" className="form-label">Sĩ số</label>
          <input
            type="number"
            className="form-control"
            id="studentCount"
            value={studentCount}
            onChange={(e) => setStudentCount(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">Khoa</label>
          <select
            className="form-control"
            id="department"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            required
          >
            <option value="">Chọn khoa</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.deptCode}>
                {dept.deptName} ({dept.deptCode}) - {dept.description} {/* Display name, code, and description */}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success">Thêm mới</button>
      </form>
    </div>
  );
};

export default ClassAdd;
