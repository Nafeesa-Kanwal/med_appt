import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      const json = await res.json();
      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("email", email);
        navigate("/");
        window.location.reload();
      } else {
        if (json.errors) {
          for (const error of json.errors) {
            alert(error.msg);
          }
        } else {
          alert(json.error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
        </div>
        <div className="login-text1">
          Are you a new member? <Link to="/signup"> Sign Up Here</Link>
        </div>
        <br />
        <div className="login-form">
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="btn-group">
              <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login</button>
              <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
            </div>
            <br />
            <div className="login-text1">Forgot Password?</div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
