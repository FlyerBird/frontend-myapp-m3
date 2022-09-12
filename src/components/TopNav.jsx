import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'


export default function TopNav() {
 const [showLinks, setShowLinks] = useState(false); 
  
  return (
    <div className='topNav'>
      <div className='leftTopNav'>
       <h1>funRide</h1>
      </div>
      <div className='rightTopNav'>
      <div className='links' id={showLinks ? "hidden" : ""}>
        <Link to={''}>Favorites</Link>
        <Link to={''}>Log out</Link>
      </div>
      <button onClick={() => setShowLinks(!showLinks)}> <FontAwesomeIcon icon={faBars} /></button>
      </div>
    </div>
  )
}
