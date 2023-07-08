
import React, { useState } from "react";
import { useNavigate} from "react-router-dom";

function Signup() {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
  });
  // const { id } = useParams();
  const navigation = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/save/0", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data)
        console.log(data)
        if (!data.includes("Tài khoản")) {
          navigation("/login")
        }
      })
      .catch((err) => 
        console.log(err));
        // navigation("/");

  };

  return (
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage: `url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')`,
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card">
                <div className="card-body p-5">
                  <h1 className="text-uppercase text-center mb-5">
                    Đăng kí tài khoản
                  </h1>
                  

                  <form>
                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1cg">
                        Họ tên:
                      </label>
                      <input
                        type="text"
                        id="form3Example1cg fullname"
                        className="form-control form-control-lg"
                        value={user.fullname}
                        name="fullname"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-outline mb-4">
                    <label className="form-label" for="form3Example1cg">
                        Username:
                      </label>
                      <input
                        type="text"
                        id="form3Example1cg username"
                        className="form-control form-control-lg"
                        value={user.ủename}
                        name="username"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-outline mb-4">
                    <label className="form-label" for="form3Example1cg">
                        Mật khẩu:
                      </label>
                      <input
                        type="text"
                        id="form3Example1cg pwd"
                        className="form-control form-control-lg"
                        value={user.password}
                        name="password"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        onClick={handleSubmit}
                      >
                        Register
                      </button>
                    </div>
                  </form>
                  <a href="/login">Đã có tài khoản</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
