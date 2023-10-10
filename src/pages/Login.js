import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/api/users/login', { email, password })
      .then(response => {
        if (response.status === 200) {
          alert('Login successful!');
          localStorage.setItem('token', response.data.token); 
        } else {
          alert('Login failed!');
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
        alert('There was an error! ' + error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
