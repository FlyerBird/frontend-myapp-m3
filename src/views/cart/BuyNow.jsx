import React from 'react';
import { motion } from "framer-motion";

export default function buyNow() {
  return (
    <div className='thanks'>
       <h2>THANKS FOR TRUSTING</h2>
       <div className='thanksFR'>
       <motion.h1 initial={{scale: 0.2}} transition={{ duration: 1.5}} animate={{ scale: 1.5 }}>funRide</motion.h1>
       <motion.h3 initial={{scale: 0.2}} transition={{ duration: 1.5}} animate={{ scale: 1.5 }}>SURFSKATES</motion.h3>
      </div>
        <img className='thanksGif' src='https://media2.giphy.com/media/dyAf7IKSw1IMXd0gSj/giphy.gif?cid=6c09b952ulpnr5r5wb0hvlxqxo9lkfn3sn5y2xemrxo8hvc1&rid=giphy.gif&ct=s' alt=''/>
    </div>
  )
}
