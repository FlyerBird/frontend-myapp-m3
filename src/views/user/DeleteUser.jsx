import React, {useContext} from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DeleteUser() {
    const { logOutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const storedToken = localStorage.getItem('authToken');
    
    

    const removeToken = () => {
      localStorage.removeItem('authToken');
    }


    const handleDelete = async () => {
      try {
        await axios.delete(`http://localhost:8000/api/v1/user/${id}`,  { headers: { Authorization: `Bearer ${storedToken}` } });
        toast.success('User deleted')
        navigate("/");
        removeToken();
        logOutUser()
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div>
         <button onClick={() => navigate(-1)}>Go Back</button>
        <div>
          <button onClick={handleDelete}>Delete Account</button>
        </div>
    </div>
   
  )
}
