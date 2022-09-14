import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';


export default function TopNav() {
 const [showLinks, setShowLinks] = useState(false); 
 const { logOutUser, isLoggedIn} = useContext(AuthContext);

 const handleNavbar = () => {
  setShowLinks(showLinks => !showLinks);
};
  
  return (
    <div className='topNav'>
      <div className='leftTopNav'>
       <Link to={'/'}><h1>funRide</h1></Link>
      </div>
      <div className='rightTopNav'>
      <div className='links' id={showLinks ? "hidden" : ""}>
        <Link to={''}>Favorites</Link>
        {isLoggedIn && <Link to={'/'} onClick={() => logOutUser()}>Log out</Link>}
      </div>
      <button onClick={handleNavbar}> {!showLinks ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faX} />}</button>
      </div>
    </div>
  )
}
