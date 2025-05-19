import React, { useEffect, useState } from 'react';
import { getCurriculum, delCurriculum  } from '../../services/Api';
import { Link } from 'react-router-dom';

const CurriculumList = () => {
  const [curriculums, setCurriculums] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getCurriculum();
          console.log("API trả về:", res.data); // THÊM DÒNG NÀY

      setCurriculums(res.data);
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa chương trình này?')) {
      await delCurriculum(id);
      setCurriculums(curriculums.filter(c => c.id !== id));
    }
  };

  const filtered = curriculums.filter(c =>
    c.curriculumName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Quản lý Chương trình đào tạo</h2>
      <div className="d-flex justify-content-between mb-3">
        <input
          className="form-control w-50"
          placeholder="Tìm kiếm theo tên CTĐT..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/admin/curriculums/add" className="btn btn-success">
          Thêm CTĐT
        </Link>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên CTĐT</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.curriculumName}</td>
              <td>{c.description}</td>
              <td>
                <Link to={`/admin/curriculums/edit/${c.id}`} className="btn btn-primary btn-sm me-2">Sửa</Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurriculumList;
