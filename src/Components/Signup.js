import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
export default function Signup(props) {
    const [credentials, setcredentials] = useState({ email: "", password: "" , cpassword: "",name: ''});
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
     const {name, email, password } = credentials;
      e.preventDefault();
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
  
        headers: {
          "Content-Type": "application/json",
          //   "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyODhkNDA2ZmUxMWEyMjUyYmU1YTA0In0sImlhdCI6MTY0NjgyNDc2OH0.GQ79vbhFxWOA4axZucw05PzcwMZvgSsM640m7YeWL8I'
        },
        body: JSON.stringify({
          name, email, password
        }),
      });
  
      const json = await response.json();
      console.log(json);
  
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        props.showAlert("Sign up Successful", "success")

      } else {
          props.showAlert("Invalid Crendentials", "danger")
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
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control" name="name" id="name" placeholder="Enter name" minLength={5} required onChange={onChange}/>
  </div>
  <div className="form-group my-3">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}/>
  </div>
  <div className="form-group my-3">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" name="password" id="password" placeholder="Password" minLength={5} required onChange={onChange}/>
  </div>
  <div className="form-group my-3">
    <label htmlFor="cpassword">Confirm password</label>
    <input type="password" className="form-control" name="cpassword" id="cpassword" placeholder="Confirm Password" minLength={5} required onChange={onChange}/>
  </div>
 
  <button type="submit" className="btn btn-primary my-3">Submit</button>
</form>
    </div>
  </div>
  )
}
