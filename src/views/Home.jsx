import React from 'react';
import AllProducts from './product/AllProducts';
import { useRef } from "react";

export default function Home() {
  const about = useRef(null);
  const contact = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
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
        <h5 onClick={() => scrollToSection(about)} className="linkAbout">Contact</h5>
        
      </div>
      <AllProducts />
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
        <p> Send missage</p>
      </div>
      </div>
      </div>
    </div>
  )
}
