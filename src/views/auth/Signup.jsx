import React, { useEffect, useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [user, setUser] = useState({
    username: '',
    email: ''
  })
  const [password, setPassword] = useState('');
  const [passwordControl, setPasswordControl] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  useEffect(() => {
    if (password !== passwordControl) {
      setErrorMessage("Passwords don't match")
    } else {
      setErrorMessage(undefined)
    }
    // eslint-disable-next-line
  }, [passwordControl])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, { username: user.username, email: user.email, password });
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }

  return (
    <div className='signUp'>
      <form onSubmit={handleSubmit}>
      <div className='signUpFormSections'>
        <label>Username</label>
        <input required type="text" name="username" value={user.username} onChange={handleChange} />
      </div>
      <div className='signUpFormSections'>
        <label>Email</label>
        <input required type="email" name="email" value={user.email} onChange={handleChange} />
      </div>
      <div className='signUpFormSections'>
        <label>Password</label>
        <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value) } />
      </div>
      <div className='signUpFormSections'>
        <label>Repeat the password</label>
        <input required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
        
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
