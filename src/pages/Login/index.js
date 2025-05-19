import React, { useState } from "react";
import { login } from "../../services/Api"; // hàm gọi API backend
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFail } from "../../redux/reducers/auth";

const Login = () => {
  const [inputsCustomer, setInputsCustomer] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeInputsCustomer = (e) => {
    const { name, value } = e.target;
    setInputsCustomer({ ...inputsCustomer, [name]: value });
  };

  const clickLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('name, value', inputsCustomer)
      const response = await login(inputsCustomer);
      const { accessToken, refreshToken, user } = response.data;

      // Đưa vào redux store
      dispatch(
        loginSuccess({
          accessToken,
          refreshToken,
          user,
        })
      );

      // Optional: lưu vào localStorage nếu muốn giữ đăng nhập sau reload
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("user", user.role?.roleName)
      // Chuyển hướng
if (user.role?.roleName === 'ADMIN' || user.role?.roleName === 'TEACHER' ) {
  navigate('/admin');
} else if (user.role?.roleName === 'STUDENT') {
  navigate('/student');
} else {
  setError("Tài khoản không có quyền truy cập.");
}

    } catch (err) {
      setError("Đăng nhập thất bại. Kiểm tra lại tài khoản/mật khẩu.");
      dispatch(loginFail());
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
            <input type="checkbox" id="remember" name="remember" />
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
