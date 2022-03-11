import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        //   "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyODhkNDA2ZmUxMWEyMjUyYmU1YTA0In0sImlhdCI6MTY0NjgyNDc2OH0.GQ79vbhFxWOA4axZucw05PzcwMZvgSsM640m7YeWL8I'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Login Successful", "success")
      navigate("/");

    } else {
      props.showAlert("Invalid Details", "danger")
    }
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              value={credentials.email}
              onChange={onChange}
              id="email"
              name="email"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              id="password"
              name="password"
              placeholder="Password"
            />
          </div>

          <button type="submit" className="btn btn-primary my-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
