import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditUser() {
    const { isLoggedIn, logOutUser } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getData = async () => {
          try {
            const user = await axios.get(`http://localhost:8000/api/v1/user/${id}`);
            console.log(user)
            setUser(user.data.data);
          } catch (error) {
            console.error(error);
          }
        };
        getData();
      }, [id]);
    
      const handleChange = (e) => {
        setUser(prev => {
          return {
            ...prev,
            [e.target.name]: e.target.value
          }
        })
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const userEdited = await axios.post('http://localhost:8000/api/v1/user', user);
          console.log(userEdited)
          navigate(`/user/${userEdited.data.data._id}`)
        } catch (error) {
          console.error(error);
        }
      }
    


  return (
    <div>
    <h1>EditUser</h1>
    {user && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
          <button type="submit">Save changes</button>
        </form>
      )}
      {!user && <p>Loading</p>}
    {isLoggedIn && <button onClick={() => logOutUser()}>Log out</button>}
    </div>
  )
}
