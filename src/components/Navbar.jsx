import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  
  return (
    <div className='navbar'>
      {user && <p>Hello {user.username}</p> }
      
        <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/"><FontAwesomeIcon icon={faHouse} /> </NavLink>
        {!isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/signup"><FontAwesomeIcon icon={faUserPlus} /></NavLink>}
        {!isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/login"><FontAwesomeIcon icon={faRightToBracket} /> </NavLink>}
        {isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/private">Private view</NavLink>}
        {isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/create-product">Create Product</NavLink>}
        {isLoggedIn && <button onClick={() => logOutUser()}>Log out</button>}
        
  
    </div>
  )
}
