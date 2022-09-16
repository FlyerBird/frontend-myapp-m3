import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRightToBracket, faUserPlus, faHandPeace, faGear, faCartShopping } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  const { isLoggedIn, user, isAdmin } = useContext(AuthContext);
  
  return (
    <div className='navbar'>
        <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/"><FontAwesomeIcon icon={faHouse} /> </NavLink>
        {user && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/user"><p className='helloUser'><FontAwesomeIcon icon={faHandPeace} />{user.username}</p> </NavLink>}
        {!isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/signup"><FontAwesomeIcon icon={faUserPlus} /></NavLink>}
        {!isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/login"><FontAwesomeIcon icon={faRightToBracket} /> </NavLink>}
        {isLoggedIn && isAdmin && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/create-product"><FontAwesomeIcon icon={faGear} />Tools</NavLink>}
        {isLoggedIn &&  <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/"><FontAwesomeIcon icon={faCartShopping} /> </NavLink>}
    </div>
  )
}
