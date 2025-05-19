import React, { useState, useEffect } from 'react';
import { getDepartments, addsubjects } from '../../services/Api'; // chỉnh lại đường dẫn nếu cần

const SubjectAdd = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [credits, setCredits] = useState('');
  const [deptName, setDeptName] = useState('');
  const [description, setDescription] = useState('');
  const [theoryPeriods, setTheoryPeriods] = useState('');
  const [practicalPeriods, setPracticalPeriods] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await getDepartments();
        setDepartments(res.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách khoa:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!deptName) {
      alert("Vui lòng chọn khoa.");
      return;
    }

    const newSubject = {
      subjectName: name,
      subjectCode: code,
      credits: Number(credits),
      deptName,
      description,
      theoryPeriods: Number(theoryPeriods),
      practicalPeriods: Number(practicalPeriods),
    };

    try {
      const response = await addsubjects(newSubject);
      alert("Thêm môn học thành công!");
      // Có thể reset form hoặc chuyển trang tùy ý
      setName('');
      setCode('');
      setCredits('');
      setDeptName('');
      setDescription('');
      setTheoryPeriods('');
      setPracticalPeriods('');
    } catch (error) {
      console.error("Lỗi khi thêm môn học:", error);
      alert("Thêm môn học thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Thêm môn học</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Tên môn học</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Mã môn học</label>
          <input
            type="text"
            className="form-control"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Số tín chỉ</label>
          <input
            type="number"
            className="form-control"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            required
            min={0}
          />
        </div>

        <div className="mb-3">
          <label>Tên khoa</label>
          <select
            className="form-select"
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            required
          >
            <option value="">-- Chọn khoa --</option>
            {departments.map((d) => (
              <option key={d.id} value={d.deptName}>
                {d.deptName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Mô tả</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="mb-3">
          <label>Số tiết lý thuyết</label>
          <input
            type="number"
            className="form-control"
            value={theoryPeriods}
            onChange={(e) => setTheoryPeriods(e.target.value)}
            min={0}
          />
        </div>

        <div className="mb-3">
          <label>Số tiết thực hành</label>
          <input
            type="number"
            className="form-control"
            value={practicalPeriods}
            onChange={(e) => setPracticalPeriods(e.target.value)}
            min={0}
          />
        </div>

        <button type="submit" className="btn btn-success">Thêm mới</button>
      </form>
    </div>
  );
};

export default SubjectAdd;
