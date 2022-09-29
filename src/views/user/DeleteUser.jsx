import React, {useContext} from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function DeleteUser() {
    const { logOutUser, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const storedToken = localStorage.getItem('authToken');
  
    const removeToken = () => {
      localStorage.removeItem('authToken');
    }

    const handleDelete = async () => {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/user/${user._id}`,  { headers: { Authorization: `Bearer ${storedToken}` } });
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
      <div className='deleteAcc'>
      <FontAwesomeIcon className='exclamationIcon' icon={faTriangleExclamation} />
        <div className='delAccText'>
          <h2>Are you sure you want to delete your account?</h2>
        <div className='delAccSub'>
          <h3>Delete your funRide Account</h3>
          <p>When you delete your account, your profile and all your data will be permanently removed.</p>
      </div>
        <div className='delAccButton'>
          <button onClick={handleDelete}>Delete Account</button>
        </div>
        </div>
      </div>
    </div>
  )
}
