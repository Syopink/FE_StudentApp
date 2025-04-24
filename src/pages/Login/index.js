import React, { useState } from "react";
import { login } from "../../services/Api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputsCustomer, setInputsCustomer] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const changeInputsCustomer = (e) => {
    const { name, value } = e.target;
    setInputsCustomer({ ...inputsCustomer, [name]: value });
  };

  const clickLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(inputsCustomer);
      console.log("Đăng nhập thành công:", response.data);      
      // Ví dụ: lưu token vào localStorage
      localStorage.setItem("token", response.data.accessToken);

      // Redirect (nếu cần)
      navigate('/admin')
    } catch (err) {
      setError("Đăng nhập thất bại. Kiểm tra lại tài khoản/mật khẩu.");
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Đăng nhập</h2>
        <form>
          <div className="input-group" style={{ width: "100%" }}>
            <input
              onChange={changeInputsCustomer}
              type="text"
              name="username"
              placeholder="Mã sinh viên"
              required
            />
          </div>
          <div className="input-group" style={{ width: "100%" }}>
            <input
              onChange={changeInputsCustomer}
              type="password"
              name="password"
              placeholder="Mật khẩu"
              required
            />
          </div>
          <div className="remember-container">
            <input type="checkbox" id="remember" name="remember" style={{marginBottom: "5px"}} />
            <label htmlFor="remember"> Nhớ tài khoản</label>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" className="login-btn" onClick={clickLogin}>
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
