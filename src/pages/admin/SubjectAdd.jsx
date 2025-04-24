import React, { useState } from 'react';

const SubjectAdd = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [credits, setCredits] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đã thêm môn học: ${name} (${code}) - ${credits} tín chỉ`);
    // TODO: Gửi dữ liệu lên server (API)
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
          />
        </div>
        <button type="submit" className="btn btn-success">Thêm mới</button>
      </form>
    </div>
  );
};

export default SubjectAdd;
