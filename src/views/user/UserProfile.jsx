import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import TopNav from '../../components/TopNav';
import { Link } from 'react-router-dom';



export default function EditUser() {
    const { isLoggedIn, logOutUser, } = useContext(AuthContext);
    const storedToken = localStorage.getItem('authToken')
    const [user, setUser] = useState(undefined);
    const navigate = useNavigate();
    const { id } = useParams();

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

      useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/api/v1/user/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } });
            console.log(response);
            setUser(response.data)
          } catch (error) {
            console.error(error);
          }
        }
        getData();
      }, [id]);

      const handleDelete = async () => {
        try {
          await axios.delete(`http://localhost:8000/api/v1/user/${id}`, user);
          navigate("/");
        } catch (error) {
          console.error(error);
        }
      };

  
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
      
      {isLoggedIn && <button onClick={() => logOutUser()}>Log out</button>}
      <Link to={'/'} onClick={() => logOutUser()}>Log out</Link>
      <button onClick={handleDelete}>Delete account</button>
    </div>
  )
}
