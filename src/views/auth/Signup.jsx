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
    <div className='headerSign'>
      <h1>funRide</h1>
        <div className='subtitleSign'>
          <h3>Sign up to buy the one </h3>
          <h3>that better suits you</h3>
        </div>
    </div>
      <form onSubmit={handleSubmit}>
      <div className='signUpFormSections'>
        <input placeholder="Username" required type="text" name="username" value={user.username} onChange={handleChange} />
      </div>
      <div className='signUpFormSections'>
        <input placeholder="Email" required type="email" name="email" value={user.email} onChange={handleChange} />
      </div>
      <div className='signUpFormSections'>
        <input placeholder="Password" required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value) } />
      </div>
      <div className='signUpFormSections'>
        <input placeholder="Repeat password" required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
      <div className='signUpFormSections'>
      <input placeholder="Profile image (optional)" type="text" name="image" value={user.imageProfile} onChange={handleChange} />
      </div>
        <button className='registerButton' type="submit">Sign up</button>
      </form>
      <div className='footerSign'>
        <p>By signing up, you agree to our</p>
        <p><b>Terms</b> & <b>Privacy</b></p>
      </div>
    </div>
  )
}
