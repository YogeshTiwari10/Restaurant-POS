import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/login", { email, password })
      .then(result => {console.log(result)
        if(result.data === "Success"){
        navigate("/home")
      }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email">
              <strong>E-mail</strong>
            </label>
            <input type="email"
              placeholder='Enter E-mail'
              name='email'
              className='form-control rounded-0'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input type="password"
              placeholder='Enter password'
              name='password'
              className='form-control rounded-0'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>
            Login
          </button>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ fontSize: "15px" }} >Not having an account?</p></div>
          <Link to="/register">
            <button className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
              Register
            </button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login