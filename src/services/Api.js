import Http from './Http';
export const login = (data) => Http.post("auth/login", data)

export const refreshToken = (data) => Http.post("auth/refresh-token", data)

export const getStudents = (config) => Http.get("/api/users/student", config)
export const addStudents = (config) => Http.post("/api/users/student", config)
export const getStudent = (id, config)  => Http.get(`/api/users/student/${id}`, config)
export const delStudent = (id, config)  => Http.delete(`/api/users/student/delete/${id}`, config)
export const updateStudent = (id, data)  => Http.put(`/api/users/student/${id}`, data)



export const getTeachers = (config) => Http.get("/api/users/teacher", config)
export const getTeacher = (id, config)  => Http.get(`/api/users/teacher/${id}`, config)
export const addTeacher = (config)  => Http.post(`/api/users/create/teacher`, config)
export const updateTeacher = (id, data)  => Http.put(`/api/users/update/teacher/${id}`, data)
export const delTeacher= (id, config)  => Http.delete(`/api/users/delete/teacher/${id}`, config)



export const getGrades = (config) => Http.get("/api/grades", config)
export const getGradeStudent = (id, config) => Http.get(`/api/grades/student/${id}`, config)
export const getGrade = (id, config) => Http.get(`/api/grades/${id}`, config)
export const updateGrade = (id, config) => Http.put(`/api/grades/update/${id}`, config)
export const addGrade = (config) => Http.post(`/api/grades/create`, config)
export const delGrade= (id, config)  => Http.delete(`/api/grades/delete/${id}`, config)

export const getsubjects = (config) => Http.get("/api/subject", config)
export const addsubjects = (config) => Http.post("/api/subject/create", config)
export const delsubjects = (id, config) => Http.delete(`/api/subject/${id}`, config)




export const getDepartments = (config) => Http.get("/admin/departments/getall", config)
export const getDepartment = (id, config) => Http.get(`/admin/departments/${id}`, config)
export const updateDepartment = (id, data) => Http.put(`/admin/departments/update/${id}`, data)

export const getMajor = (config) => Http.get("/api/major", config)


export const getClassGroup = (config) => Http.get("/api/classgroup", config)


export const getCurriculum = (config) => Http.get("/api/curriculum", config)
export const addCurriculum = (config) => Http.post("/api/curriculum/details", config)
export const editCurriculum = (id, config) => Http.get(`/api/curriculum/details/${id}`, config)
export const delCurriculum = (id, config) => Http.get(`/api/curriculum/details/${id}`, config)


