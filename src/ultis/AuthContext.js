import React, { createContext, useState, useEffect } from "react";

// Tạo context
const AuthContext = createContext();

// Tạo provider cho context
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Kiểm tra nếu có dữ liệu người dùng trong localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setRole(parsedUser.role?.roleName);  // Lưu role vào state
    }
  }, []);

  // Hàm đăng nhập
  const login = (userData) => {
    setUser(userData);
    setRole(userData.role?.roleName); // Lưu role vào state
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userData.role?.roleName); // Lưu role vào localStorage nếu cần
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
