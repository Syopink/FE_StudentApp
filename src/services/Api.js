import Http from './Http';
export const login = (data) => Http.post("auth/login", data)

export const refreshToken = (data) => Http.post("auth/refresh-token", data)

export const getStudents = (config) => Http.get("/api/users/student", config)
export const getStudent = (id, config)  => Http.get(`/api/users/student/${id}`, config)
export const updateStudent = (id, data)  => Http.put(`/api/users/student/${id}`, data)
export const getTeachers = (config) => Http.get("/api/users/teacher", config)
export const getTeacher = (id, config)  => Http.get(`/api/users/teacher/${id}`, config)
export const updateTeacher = (id, data)  => Http.put(`/api/users/update/teacher/${id}`, data)


export const getDepartments = (config) => Http.get("/admin/departments/getall", config)
export const getDepartment = (id, config) => Http.get(`/admin/departments/${id}`, config)
export const updateDepartment = (id, data) => Http.put(`/admin/departments/update/${id}`, data)