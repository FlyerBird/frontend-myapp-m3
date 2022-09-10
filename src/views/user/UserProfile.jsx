import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function EditUser() {
    const { isLoggedIn, logOutUser } = useContext(AuthContext);
    const storedToken = localStorage.getItem('authToken')
    const [user, setUser] = useState(undefined);
    useEffect(() => {
        const getData = async () => {
          try {
            const user = await axios.get('http://localhost:8000/api/v1/auth/me', { headers: { Authorization: `Bearer ${storedToken}` } });
            return setUser(user.data);
          } catch (error) {
            console.error(error);
          }
        };
        getData();
      }, []);

  
  return (
    <div>
      {!user && <p>Loading</p>}
      {user && (
        <div>
        <h1> {user.username}'s Profile</h1>
        <img width={200} src={user.imageProfile} alt={user.imageProfile}/>
        <p>Username: {user.username}</p>
        <p>Email:{user.email}</p>
        </div>
      ) }
      
      {isLoggedIn && <button onClick={() => logOutUser()}>Log out</button>}
    </div>
  )
}
