import { Link } from "react-router-dom";

const Sidebar = () =>{
    return(
<div id="sidebar-collapse" class="col-sm-3 col-lg-2 sidebar">
    <form role="search">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Tìm kiếm"/>
        </div>
    </form>
    <ul class="nav menu">
        <li><Link to="admin.html"><svg class="glyph stroked dashboard-dial"></svg> Dashboard</Link></li>
        <li><Link to="student.html"><svg class="glyph stroked male-user"></svg> Quản lý sinh viên</Link></li>
        <li><Link href="class.html"><svg class="glyph stroked open-folder"></svg> Quản lý lớp học</Link></li>
        <li><Link href="teacher.html"><svg class="glyph stroked bag"></svg> Quản lý giáo viên</Link></li>
        <li><Link href="subject.html"><svg class="glyph stroked notebook"></svg> Quản lý môn học</Link></li>
        <li><Link href="grades.html"><svg class="glyph stroked clipboard-with-paper"></svg> Quản lý điểm</Link></li>
        <li><Link href="schedule.html"><svg class="glyph stroked calendar-blank"></svg> Lịch học</Link></li>
        <li><Link href="registration.html"><svg class="glyph stroked notepad"></svg> Đăng ký học phần</Link></li>
        <li><Link href="settings.html"><svg class="glyph stroked gear"></svg> Cấu hình</Link></li>
    </ul>
</div>
    )
}

export default Sidebar;