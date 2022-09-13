import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'


export default function TopNav() {
 const [showLinks, setShowLinks] = useState(false); 

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
        <Link to={''}>Log out</Link>
      </div>
      <button onClick={handleNavbar}> {!showLinks ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faX} />}</button>
      </div>
    </div>
  )
}
