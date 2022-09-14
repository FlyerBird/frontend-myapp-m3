import React, {useContext} from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DeleteUser() {
    const { logOutUser, removeToken, isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
  return (
    <div>
         <button onClick={() => navigate(-1)}>Go Back</button>
        <div>DeleteUser</div>
    </div>
   
  )
}
