import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopNav from '../../components/TopNav';

export default function UserProfile() {
    
    const storedToken = localStorage.getItem('authToken')
    const [user, setUser] = useState("");
 
    // GET USER DATA 
    useEffect(() => {
        const getData = async () => {
          try {
            const user = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, { headers: { Authorization: `Bearer ${storedToken}` } });
            return setUser(user.data);
          } catch (error) {
            console.error(error);
          }
        };
        getData();
      }, []);
      

     
  return (
    <div className='userProfile'>
    <TopNav />
      {!user && <p>Loading...</p>}
      {user && (
        <div className='profileData'>
        <h1> Hello {user.username}</h1>
        <div>
        <img src={user.imageProfile} alt={user.imageProfile}/>
        </div>
        <p>{user.email}</p>
        </div>
      ) }
    </div>
  )
}
