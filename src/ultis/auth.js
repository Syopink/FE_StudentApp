// src/utils/auth.js
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    // Nếu có thêm dữ liệu user:
    localStorage.removeItem("user");
  
    window.location.href = '/login'; // hoặc navigate('/login') nếu trong component
  };
  