import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SubjectEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [credits, setCredits] = useState('');

  useEffect(() => {
    // Giả lập fetch dữ liệu theo ID
    const fetched = {
      id,
      name: 'Toán cao cấp',
      code: 'TC001',
      credits: 3,
    };

    setName(fetched.name);
    setCode(fetched.code);
    setCredits(fetched.credits);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Cập nhật môn học ${id}: ${name} (${code}) - ${credits} tín chỉ`);
    // TODO: Gửi dữ liệu cập nhật lên server (API)
  };

  return (
    <div className="container mt-4">
      <h2>Chỉnh sửa môn học</h2>
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
          />
        </div>
        <button type="submit" className="btn btn-primary">Cập nhật</button>
      </form>
    </div>
  );
};

export default SubjectEdit;
