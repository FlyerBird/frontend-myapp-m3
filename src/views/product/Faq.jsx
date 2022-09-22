import React, {useState} from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

export default function Faq() {
 const navigate = useNavigate();
 const [open, setOpen] = useState(false);
 const [open2, setOpen2] = useState(false);
 const [open3, setOpen3] = useState(false);
 const [open4, setOpen4] = useState(false);
 const [open5, setOpen5] = useState(false);

  return (
    <div>
    <div className='backFaq'>
      <motion.button 
      transition={{ duration: 1}}
      initial={{ x: 400}}
      animate={{ x: 0}}
      onClick={() => navigate(-1)}><h1 className='faqh1'>funRide</h1></motion.button>
    </div>
    <div className='faq'>
        <h2> Frequently asked Questions about Surfskating </h2>
        <motion.div onClick={() => setOpen(!open) } className='faqCard'>
          <motion.h5> 1. WHAT IS A SURFSKATE BOARD?</motion.h5>
          {open && (
          <motion.div className='faqText'>
            <p>Surfskate is a skateboard that allows movements identical to surfing, surfskates are often used as surf trainers or by anybody
            else who enjoys surfing asphalt and concrete waves.
            Compared to regular skateboard trucks the axle of a surfskate truck does not only pivot but can also turn. 
            Most surfskate brands have built-in springs in their trucks that make the axle bounce back to the center.
            The high sensitivity and rotating axle of the front truck allows you not only to practice various surf maneuvers but also to pump the 
            board instead of pushing it, meaning you can build up speed with both feet on the board.
            </p>
          </motion.div>
          )}
        </motion.div>
        <motion.div onClick={() => setOpen2(!open2)} className='faqCard'>
          <motion.h5> 2. WILL SURFSKATING IMPROVE MY SURFING?</motion.h5>
          {open2 && (
          <motion.div className='faqText'>
            <p>Yes, unless you are a professional surfer spending continuously time in the ocean, there is a very high chance a surfskate will
            help you improve your surfing , even more if you are a beginner or intermediate surfer.
            The most important benefit of using a surfskate as a surf trainer is that you can repeatedly practice maneuvers, analyze and correct 
            your stance and improve your posture without having to catch a wave. A lot of time in the water is spent waiting and paddling for waves,
            on a surfskate the action starts as soon as you step onto the board. With that in mind: surfskating will of course not teach you to read the ocean, improve 
            your pop up , duck dive or paddle power , these aspects of surfing are best to be trained in the water.
            If you are an absolute beginner surfskating can be a great way to prepare for your first surf experience , many basics like stance, posture, compression/ decrompession, movement patterns and the direction of your view can be learned on a surfskate before you even enter the water.
            As if that was not enough surfskating is also a good workout that burns about as much calories as going for a run.
            </p>
          </motion.div>
          )}
        </motion.div>
        <motion.div onClick={() => setOpen3(!open3)} className='faqCard'>
          <motion.h5> 3. WHAT IS THE DIFFERENCE BETWEEN A SURFSKATE, SKATEBOARD AND LONGBOARD?</motion.h5>
          {open3 && (
          <motion.div className='faqText'>
            <p>The main difference is the construction and functionality of the front truck and the fact that there is actually a different truck
            in the front and back. Surfskates are directional boards, meaning that they are ridden in one direction and that they have a nose and
            tail.
            The front truck has an axle that does not only pivot and lean but that can be turned, allowing the rider to perform maneuvers as if he 
            would be surfing a surfboard. Many surfer are using surfskates to train and improve their surfing on land. A surfskate can also be 
            pushed and pumped, meaning that you can build speed standing with both feet on the board. It is not possible to mimic surfing maneuvers
            on a normal skateboard or longboard, also you cannot pump conventional boards. Surfskates are also great skateboards for cruising. 
            The soft and large wheels are made to do grippy carves and to run smooth in uneven terrain. While you can generate speed pumping the 
            board it is also possible to push a surfskate like a conventional skateboard, all it takes is a little practice. 
            </p>
          </motion.div>
          )}
        </motion.div>
        <motion.div onClick={() => setOpen4(!open4)} className='faqCard'>
          <motion.h5>4. IS SURFSKATING SOMETHING FOR BEGINNERS?</motion.h5>
          {open4 && (
          <motion.div className='faqText'>
            <p>Yes, absolutely. It may look a little intimidating and wobbly but with the right board surfskating is as easy to learn as 
            skateboarding in general. If you are an absolute beginner we always recommend to start with a Carver C7 or CX truck. Slide trucks 
            and the 2Hex Pump truck are also surfskate systems that work very well for beginners. The main advantage of these trucks is that 
            their sensitivity can be adjusted. So you can loosen the truck the more secure you feel on the board.
            If you are a surfer, skateboarder or generally athletic and learn things fast you can even start on a YOW, SwellTech or Smoothstar.
            So is it hard to surfskate? No definitely not, you just have to keep in mind that like riding a bike you cannot learn these things 
            in a single day. If you are having fun and the time to practice a couple of days per week you will feel secure on the board 
            and ride in style within a few month.
            </p>
          </motion.div>
          )}
        </motion.div>
        <motion.div onClick={() => setOpen5(!open5)} className='faqCard'>
          <motion.h5>5. HOW DO I CHOOSE MY SURFSKATE SIZE AND SHAPE?</motion.h5>
          {open5 && (
          <motion.div className='faqText'>
            <p>The shape of your surfskate deck also has a reasonable impact on what riding characteristics your  board will have. 
            If e.g. you are into Ollies a longer nose with a little rocker will help to pull the board in the air and control it.  
            A kicktail on the other end will give the board more pop and allow to lift it of the ground.
            Overall the length of the board makes less of a difference, a wider deck however will put more leverage on the front truck
            leading to a more sensitive ride. A wider deck will also lock your feet and secure your stance. In comparison to a low concave 
            a deep concave will further more secure your stance. If e.g. you are looking for a deck that works best in a pool or bowl we would 
            suggest to go for something wide with a deep concave to feel as secure as possible. If you are looking for a surfskate as a cruiser 
            or if you are a beginner a low concave is absolutely fine as a start.
            </p>
          </motion.div>
          )}
        </motion.div>
    </div>
    </div>
  )
}
