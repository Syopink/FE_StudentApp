import React from 'react';
import WidgetPanel from '../../components/WidgetPanel';
 
const Dashboard = () => {
  return (
    <div>
      <h2 className="mb-4">Trang chủ quản trị trường học</h2>
      <div className="row g-4">
        <WidgetPanel color="primary" icon="bi bi-people" value="650" label="Sinh viên" />
        <WidgetPanel color="warning" icon="bi bi-building" value="20" label="Lớp học" />
        <WidgetPanel color="info" icon="bi bi-person-badge" value="45" label="Giáo viên" />
        <WidgetPanel color="danger" icon="bi bi-book" value="12" label="Môn học" />
        <WidgetPanel color="info" icon="bi bi-journal-text" value="120" label="Điểm" />
        <WidgetPanel color="warning" icon="bi bi-calendar" value="8" label="Lịch học" />
      </div>
    </div>
  );
};

export default Dashboard;
