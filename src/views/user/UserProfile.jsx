import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import TopNav from '../../components/TopNav';
import { Link } from 'react-router-dom';



export default function UserProfile() {
    const { logOutUser , isLoggedIn } = useContext(AuthContext);
    const storedToken = localStorage.getItem('authToken')
    const navigate = useNavigate();
    const { id } = useParams();

    const [user, setUser] = useState(null);
    /*
    const [userData, setUserData] = useState({
      username: user.username,
      email: user.email
    })
*/

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

     
      // DELETE USER DATA 
      useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/api/v1/user/${id}`);
            console.log(response);
            return setUser(response.data.data)
          } catch (error) {
            console.error(error);
          }
        }
        getData();
      }, [id]);

      const handleDelete = async () => {
        try {
          await axios.delete(`http://localhost:8000/api/v1/user/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } });
          toast.success('Account deleted successfully')
          navigate("/");
        } catch (error) {
          console.error(error);
        }
      };
    
      
      /*

      // EDIT USER DATA 
      const handleChange = (e) => {
        setUserData(prev => {
         return {
            ...prev,
            [e.target.name]: e.target.value
        }
      })
    };

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
  */

  
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
