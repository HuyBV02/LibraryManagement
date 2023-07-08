import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

function DangNhap({ getIsLogin, handleSetLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();

  const handleusernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlepasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login ", {
        username,
        password,
      });

      // Xử lý thành công đăng nhập
      console.log(response.data);

      window.localStorage.setItem("username", response.data.username);
      window.localStorage.setItem("password", response.data.password);
      window.localStorage.setItem("fullname", response.data.fullname);
      window.localStorage.setItem("role", response.data.role);
      window.localStorage.setItem("isLogin", true);
      // window.localStorage.setItem('giohang', response.data.giohang);

      alert("Đăng nhập thành công");
      navigation("/books", { replace: true });
    } catch (error) {
      // Xử lý lỗi đăng nhập
      console.error(error);
      window.localStorage.setItem("username", "");
      window.localStorage.setItem("password", "");
      window.localStorage.setItem("fullname", "");
      window.localStorage.setItem("isLogin", false);
      // window.localStorage.setItem('giohang', "");

      alert("Sai mật khẩu hoặc tài khoản");
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("isLogin") === "true") {
      navigation("/books");
    } else {
      window.localStorage.setItem("fullname", "");
      window.localStorage.setItem("username", "");
      window.localStorage.setItem("password", "");
      window.localStorage.setItem("isLogin", false);
      // window.localStorage.setItem('giohang', "");
    }
  }, []);

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src={
                  "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                }
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleLogin}>
                

                <div className="form-outline mb-4">
                <label className="form-label" for="form3Example3">
                    Username:
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="form3Example3"
                    value={username}
                    onChange={handleusernameChange}
                    className="form-control form-control-lg"
                  />
                  
                </div>

                <div className="form-outline mb-3">
                <label className="form-label" for="form3Example4">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="form3Example4"
                    onChange={handlepasswordChange}
                    className="form-control form-control-lg"
                  />
                  
                </div>
                <button className = "btn btn-info"type="submit">Đăng nhập</button>
                <a href="/signup">          Tạo tài khoản</a>
              </form>
              
            </div>
          </div>
        </div>
      </section>
    </>
    
  );
}
export default DangNhap;
