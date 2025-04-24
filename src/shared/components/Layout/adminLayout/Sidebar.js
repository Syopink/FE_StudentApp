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
        <li><a href="class.html"><svg class="glyph stroked open-folder"></svg> Quản lý lớp học</a></li>
        <li><a href="teacher.html"><svg class="glyph stroked bag"></svg> Quản lý giáo viên</a></li>
        <li><a href="subject.html"><svg class="glyph stroked notebook"></svg> Quản lý môn học</a></li>
        <li><a href="grades.html"><svg class="glyph stroked clipboard-with-paper"></svg> Quản lý điểm</a></li>
        <li><a href="schedule.html"><svg class="glyph stroked calendar-blank"></svg> Lịch học</a></li>
        <li><a href="registration.html"><svg class="glyph stroked notepad"></svg> Đăng ký học phần</a></li>
        <li><a href="settings.html"><svg class="glyph stroked gear"></svg> Cấu hình</a></li>
    </ul>
</div>
    )
}

export default Sidebar;