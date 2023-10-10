import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/api/users/register', { firstname, lastname, email, password })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token); 
        // alert(response.data); // Display an alert with the response data
      })
      .catch(error => {
        console.error('There was an error!', error);
        alert('There was an error! ' + error); // Display an alert with the error message
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" value={firstname} onChange={e => setFirstname(e.target.value)} />
      </label>
      <label>
        Last Name:
        <input type="text" value={lastname} onChange={e => setLastname(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <input type="submit" value="Register" />
    </form>
  );
};

export default Register;
