import React, { useEffect, useState } from 'react';
import WidgetPanel from '../../components/WidgetPanel';
import { getDepartments, getStudents, getTeachers } from '../../services/Api'; // Giả sử bạn đã tạo các API

const Dashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    departments: 0,
    subjects: 0,
    schedules: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsRes = await getStudents();
        const teachersRes = await getTeachers();
        const departmentsRes = await getDepartments();

        setStats({
          students: studentsRes.data.length, // Giả sử API trả về danh sách
          teachers: teachersRes.data.length,
          departments: departmentsRes.data.length,
          subjects: 12, // Bạn có thể gọi thêm API để lấy số môn học
          schedules: 8,  // Bạn có thể gọi thêm API để lấy số lịch học
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Trang chủ quản trị trường học</h2>
      <div className="row g-4">
        <WidgetPanel color="primary" icon="bi bi-people" value={stats.students} label="Sinh viên" />
        <WidgetPanel color="warning" icon="bi bi-building" value={stats.departments} label="Lớp học" />
        <WidgetPanel color="info" icon="bi bi-person-badge" value={stats.teachers} label="Giáo viên" />
        <WidgetPanel color="danger" icon="bi bi-book" value={stats.subjects} label="Môn học" />
        <WidgetPanel color="info" icon="bi bi-journal-text" value="12" label="Điểm" />
        <WidgetPanel color="warning" icon="bi bi-calendar" value={stats.schedules} label="Lịch học" />
      </div>
    </div>
  );
};

export default Dashboard;
