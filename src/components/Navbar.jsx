import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  const { isLoggedIn, user } = useContext(AuthContext);
  
  return (
    <div className='navbar'>
      
      
        <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/"><FontAwesomeIcon icon={faHouse} /> </NavLink>
        {user && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/user"><p className='helloUser'>Hello {user.username}</p> </NavLink>}
        {!isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/signup"><FontAwesomeIcon icon={faUserPlus} /></NavLink>}
        {!isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/login"><FontAwesomeIcon icon={faRightToBracket} /> </NavLink>}
        {isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/create-product">Create Product</NavLink>}
        
        
  
    </div>
  )
}
