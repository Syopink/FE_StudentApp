import Http from './Http';
export const login = (data) => Http.post("auth/login", data)