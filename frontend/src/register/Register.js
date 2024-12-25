import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('please provide username and password')
      return;
    }

    if (password !== cpassword) {
      alert('password and confirm password is not same')
      return;
    }

    axios.post('http://localhost:8080/register', {
      name: username,
      password: password
    }).then((response) => {
      if (response.status === 200) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        onLogin(true);
        navigate('/');
      }
    }).catch((error) => {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid credentials');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
      console.error("Register error:", error);
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Register</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className="row justify-content-center mt-5">
        <div className="col-md-4" style={{ maxWidth: '400px', width: '100%' }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label text-start">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-start">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label text-start">Confirm password</label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
            <div className="text-center mt-3">
              <a href="/login" className="link-primary">Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
