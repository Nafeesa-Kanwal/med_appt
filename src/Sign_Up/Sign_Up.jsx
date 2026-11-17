import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign_Up.css";

const Sign_Up = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("patient");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, role, password }),
      });
      const json = await response.json();
      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("phone", phone);
        navigate("/");
        window.location.reload();
      } else {
        alert(json.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container" style={{ marginTop: "5%" }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-text1" style={{ textAlign: "left" }}>
          Already a member? <a href="/login">Login</a>
        </div>
        <div className="signup-form">
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} name="role" id="role" className="form-control">
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="form-control" placeholder="Enter your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" name="phone" id="phone" className="form-control" placeholder="Enter your phone number" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="form-control" placeholder="Enter your password" required />
            </div>
            <div className="btn-group">
              <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
              <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Sign_Up;
