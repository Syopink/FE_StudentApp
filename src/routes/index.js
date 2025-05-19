import Home from "../components/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/admin/Dashboard";
import Student from "../pages/admin/Student";
import Class from "../pages/admin/Class";
import Teacher from "../pages/admin/Teacher";
import Subject from "../pages/admin/subject";
import Grades from "../pages/admin/Grades";
import Schedule from "../pages/admin/Schedule";
import ScheduleStudent from "../pages/student/Schedule";
import Registration from "../pages/admin/Registration";
import Settings from "../pages/admin/Setting";
import Profile from "../pages/admin/Profile";
import ClassAdd from "../pages/admin/ClassAdd";
import ClassEdit from "../pages/admin/ClassEdit";
import StudentAdd from "../pages/admin/StudentAdd";
import StudentEdit from "../pages/admin/StudentEdit";
import TeacherAdd from "../pages/admin/TeacherAdd";
import TeacherEdit from "../pages/admin/TeacherEdit";
import SubjectAdd from "../pages/admin/SubjectAdd";
import SubjectEdit from "../pages/admin/SubjectEdit";
import GradeAdd from "../pages/admin/GradeAdd";
import GradeEdit from "../pages/admin/GradeEdit";

import GradesStudent from "../pages/student/Grade";
import Curriculum from "../pages/admin/Curriculum";
import CurriculumDetailAdd from "../pages/admin/CurriculumAdd";
import CurriculumList from "../pages/student/Curriculum";

const publicRoutes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/admin',
        layout: 'admin',
        role: 'admin',  // chỉ admin được vào /admin và các route con
        children: [
            { path: '', element: <Dashboard /> },
            { path: 'students', element: <Student /> },
            { path: 'students/add', element: <StudentAdd /> },
            { path: 'students/edit/:student_id', element: <StudentEdit /> },
            { path: 'class', element: <Class /> },
            { path: 'class/add', element: <ClassAdd /> },
            { path: 'class/edit/:id', element: <ClassEdit /> },
            { path: 'teacher', element: <Teacher /> },
            { path: 'teacher/add', element: <TeacherAdd /> },
            { path: 'teacher/edit/:teacherCode', element: <TeacherEdit /> },
            { path: 'subject', element: <Subject /> },
            { path: 'subject/add', element: <SubjectAdd /> },
            { path: 'subject/edit/:id', element: <SubjectEdit /> },
            { path: 'grades', element: <Grades /> },
            { path: 'grades/add', element: <GradeAdd /> },
            { path: 'grades/edit/:id', element: <GradeEdit /> },
            { path: 'schedule', element: <Schedule /> },
            { path: 'registration', element: <Registration /> },
            { path: 'settings', element: <Settings /> },
            { path: 'profile', element: <Profile /> },
            { path: 'curriculum', element: <Curriculum /> },
            { path: 'curriculums/add', element: <CurriculumDetailAdd /> },
        ],
    },
    {
        path: '/student',
        layout: 'student',
        role: 'student',  // chỉ student được vào /student và các route con
        children: [
            { path: '', element: <Dashboard /> },
            //   { path: 'profile', element: <Profile /> },
            { path: 'grades', element: <GradesStudent /> },
            { path: 'curriculum', element: <CurriculumList /> },
            { path: 'schedule', element: <ScheduleStudent /> },
            // thêm các route riêng cho student nếu có
        ],
    },
];


export default publicRoutes;
