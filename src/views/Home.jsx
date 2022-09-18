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
        <p> “funRide SURFSKATES is a family driven company based in Catalonia and has built a 
        reputation for online selling quality high-performance surfskates.
        A good option for surf brands and surf stores to announce and sell their products."
        </p>
      </div>
      <div ref={contact} className="contact">
        <h3> CONTACT </h3>
        <h5> funride@funride.com</h5>
        <h5> +34 633 333 333</h5>
        <h5>
        <span>MADE WITH<span><img className='love' src='https://tudesign.co/wp-content/uploads/2022/03/heart.svg' alt=''/></span>BY CARLOS</span>
        </h5>
      </div>
      </div>
      </div>
    </div>
  )
}
