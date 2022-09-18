import React, {useContext} from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function DeleteUser() {
    const { logOutUser, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const storedToken = localStorage.getItem('authToken');
    
    

    const removeToken = () => {
      localStorage.removeItem('authToken');
    }


    const handleDelete = async () => {
      try {
        await axios.delete(`http://localhost:8000/api/v1/user/${user._id}`,  { headers: { Authorization: `Bearer ${storedToken}` } });
        toast.success('User deleted')
        navigate("/");
        removeToken();
        logOutUser()
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className='deleteAccount'>
      <div className='back'>
        <button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faCaretLeft} /></button>
      </div>
        <div>
          <button onClick={handleDelete}>Delete Account</button>
        </div>
    </div>
   
  )
}
