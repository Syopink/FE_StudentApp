import Home from "../components/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/admin/Dashboard";
import Student from "../pages/admin/Student";
import Class from "../pages/admin/Class";
import Teacher from "../pages/admin/Teacher";
import Subject from "../pages/admin/subject";
import Grades from "../pages/admin/Grades";
import Schedule from "../pages/admin/Schedule";
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

const publicRoutes = [
    {
        path: '/',
        element: <Home />,  // Trang Home, có Header và Footer
    },
    {
        path: '/login',
        element: <Login />,  // Trang Login, có Header và Footer
    },
    {
        path: '/admin',
        layout: 'admin',  // Đánh dấu là layout admin, không có Header và Footer
        children: [
            {
                path: '', // Tương đương path: '/admin'
                element: <Dashboard />,  // Trang Dashboard trong admin
            },{
                path: 'students',
                element: <Student/>
            }
            ,{
                path: 'students/add',
                element: <StudentAdd/>
            }
            ,{
                path: 'students/edit/:student_code',
                element: <StudentEdit/>
            }
            ,{
                path: 'class',
                element: <Class/>
            }
            ,{
                path: 'class/add',
                element: <ClassAdd/>
            }
            ,{
                path: 'class/edit/:id',
                element: <ClassEdit/>
            }
            ,{
                path: 'teacher',
                element: <Teacher/>
            }
            ,{
                path: 'teacher/add',
                element: <TeacherAdd/>
            }
            ,{
                path: 'teacher/edit/:teacherCode',
                element: <TeacherEdit/>
            }
            ,{
                path: 'subject',
                element: <Subject/>
            }
            ,{
                path: 'subject/add',
                element: <SubjectAdd/>
            }
            ,{
                path: 'subject/edit',
                element: <SubjectEdit/>
            }
            ,{
                path: 'grades',
                element: <Grades/>
            }
            ,{
                path: 'grades/add',
                element: <GradeAdd/>
            }
            ,{
                path: 'grades/edit',
                element: <GradeEdit/>
            }
            ,{
                path: 'schedule',
                element: <Schedule/>
            }
            ,{
                path: 'registration',
                element: <Registration/>
            }
            ,{
                path: 'settings',
                element: <Settings/>
            }
            ,{
                path: 'profile',
                element: <Profile/>
            }
        ]
    }
];

export default publicRoutes;
