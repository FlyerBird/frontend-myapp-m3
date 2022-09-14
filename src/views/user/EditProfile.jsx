import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function EditProfile() {
    const navigate = useNavigate();
    const storedToken = localStorage.getItem('authToken');
    const { user, logOutUser } = useContext(AuthContext);

    const [userData, setUserData] = useState({
        username: user.username,
        email: user.email,
        
      })

      const handleChange = (e) => {
        setUserData(prev => {
          return {
            ...prev,
            [e.target.name]: e.target.value
          }
        })
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.put(`${process.env.REACT_APP_API_URL}/user/edit`, userData, { headers: { Authorization: `Bearer ${storedToken}` } });
          toast.success('User edited successfully. Please log in again.');
          logOutUser();
          navigate('/login');
        } catch (error) {
          console.error(error);
        }
      }

  return (
    <div>
    <h2>Editing {userData.username}'s profile</h2>
    <form onSubmit={handleSubmit}>
      <input required type="text" name="username" value={userData.username} onChange={handleChange} />
      <input required type="email" name="email" value={userData.email} onChange={handleChange} />
      <button type="submit">Save changes and log out</button>
    </form>
  </div>
  )
}
