import React, {useState, useEffect} from 'react';
import AllProducts from './product/AllProducts';
import { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';


export default function Home() {
  const about = useRef(null);
  const contact = useRef(null);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    });
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className='headerPic'>
       <h1>funRide</h1>
       <h3>SURFSKATES</h3>
      </div>
      <div className='mainBoxHome'>
      <div className='subHeader'>
        <h5 onClick={() => scrollToSection(about)} className="linkAbout">About</h5>
        <h5 onClick={() => scrollToSection(contact)} className="linkAbout">Contact</h5>
      </div>
      <AllProducts />
      <div> {showScrollTopButton && (
        <FontAwesomeIcon className="goTop" onClick={scrollTop} icon={faAnglesUp} />
       )}
      </div>
      <div className='footer'>
      <div ref={about} className="about">
        <h3>ABOUT</h3>
        <p> 
        We love surfSkate Un relato es un conocimiento que se transmite, 
        por lo general en detalle, respecto a un cierto hecho. El concepto, 
        que tiene su origen en el vocablo latino relātus, también permite nombrar 
        a los cuentos y a las narraciones que no son demasiado extensas.Un relato e
        s un conocimiento que se transmite, por lo general en detalle, respecto a un 
        cierto hecho. El concepto, que tiene su origen en el vocablo latino relātus, 
        también permite nombrar a los cuentos y a las narraciones que no son demasiado e
        xtensas.
        </p>
      </div>
      <div ref={contact} className="contact">
        <h3> CONTACT </h3>
        <p> funride@funride.com</p>
        <h5>
        <span>MADE WITH<span><img className='love' src='https://tudesign.co/wp-content/uploads/2022/03/heart.svg' alt=''/></span>BY CARLOS</span>
        </h5>
      </div>
      </div>
      </div>
    </div>
  )
}
