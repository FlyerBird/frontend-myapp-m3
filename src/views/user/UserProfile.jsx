import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TopNav from '../../components/TopNav';
import { Link } from 'react-router-dom';


export default function UserProfile() {
    
    const storedToken = localStorage.getItem('authToken')
    const navigate = useNavigate();

    const [user, setUser] = useState("");
 
    // GET USER DATA 
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
    <TopNav />
      <button onClick={() => navigate(-1)}>Go Back</button>
      {!user && <p>Loading...</p>}
      {user && (
        <div>
        <h1> {user.username}'s Profile</h1>
        <img width={200} src={user.imageProfile} alt={user.imageProfile}/>
        <p>Username: {user.username}</p>
        <p>Email:{user.email}</p>
        </div>
      ) }
      
     <Link to={'/delete'} >Delete Account</Link>

    </div>
  )
}
