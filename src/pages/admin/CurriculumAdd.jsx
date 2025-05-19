import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurriculum, getsubjects, addCurriculum } from '../../services/Api';
const CurriculumDetailAdd = () => {
  const [formData, setFormData] = useState({
    curriculumId: '',
    subjectId: '',
    semesterId: '',
    isMandatory: false,
  });

  const [curriculums, setCurriculums] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const curriculumRes = await getCurriculum();
        const subjectRes = await getsubjects();
        // TODO: Gọi API để lấy semester nếu có, ví dụ:
        // const semesterRes = await getSemester();

        setCurriculums(curriculumRes.data);
        setSubjects(subjectRes.data);
        setSemesters([
          { id: 1, semesterName: 'Học kỳ 1' },
          { id: 2, semesterName: 'Học kỳ 2' },
          { id: 3, semesterName: 'Học kỳ 3' },
        ]);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await addCurriculum({
      ...formData,
      curriculumId: parseInt(formData.curriculumId),
      subjectId: parseInt(formData.subjectId),
      semesterId: parseInt(formData.semesterId),
    });

      setMessage('✅ Thêm chi tiết chương trình thành công!');
    } catch (error) {
      setMessage('❌ Lỗi khi thêm chi tiết chương trình.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Thêm chi tiết chương trình khung</h3>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        {/* Chọn CTĐT */}
        <div className="mb-3">
          <label className="form-label">Chương trình đào tạo</label>
          <select
            className="form-select"
            name="curriculumId"
            value={formData.curriculumId}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn CTĐT --</option>
            {curriculums.map((item) => (
              <option key={item.id} value={item.id}>
                {item.curriculumName}
              </option>
            ))}
          </select>
        </div>

        {/* Chọn môn học */}
        <div className="mb-3">
          <label className="form-label">Môn học</label>
          <select
            className="form-select"
            name="subjectId"
            value={formData.subjectId}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn môn học --</option>
            {subjects.map((item) => (
              <option key={item.id} value={item.id}>
                {item.subjectName}
              </option>
            ))}
          </select>
        </div>

        {/* Chọn học kỳ */}
        <div className="mb-3">
          <label className="form-label">Học kỳ</label>
          <select
            className="form-select"
            name="semesterId"
            value={formData.semesterId}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn học kỳ --</option>
            {semesters.map((item) => (
              <option key={item.id} value={item.id}>
                {item.semesterName}
              </option>
            ))}
          </select>
        </div>

        {/* Checkbox bắt buộc */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="isMandatory"
            checked={formData.isMandatory}
            onChange={handleChange}
            id="mandatoryCheckbox"
          />
          <label className="form-check-label" htmlFor="mandatoryCheckbox">
            Bắt buộc
          </label>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Đang lưu...' : 'Lưu'}
        </button>
      </form>
    </div>
  );
};

export default CurriculumDetailAdd;
