import React from 'react'

import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { Link } from "react-router-dom";
import { euphoriaXR, devsinc, _7vals } from '../assets';

const Sponsors=() => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Our Sponsors.</h2>
      </motion.div>

      <div className='cardsm mt-20 sm:flex flex-wrap sm:justify-between'>
      <motion.p
        variants={fadeIn( "", "", 0.1, 1 )}
          className='sm:mt-6 mt-10 text-secondary sm:w-[400px] w-[250px] text-[17px] leading-[30px]'
        >
          <img src={euphoriaXR} className="mx-auto sm:h-[50px]" alt="" />
        </motion.p>
        <motion.p
          variants={fadeIn( "", "", 0.1, 1 )}
          className='sm:mt-0 mt-20 text-secondary sm:w-[200px] w-[250px] text-[17px] leading-[30px]'
        >
          <img src={_7vals} className="mx-auto sm:h-[70px] h-[60px]" alt="" />
        </motion.p>
        <motion.p
          variants={fadeIn( "", "", 0.1, 1 )}
          className=' sm:mt-0 mt-20 text-secondary sm:w-[400px] w-[250px] text-[17px] leading-[30px]'
        >
          <img src={devsinc} className="mx-auto sm:h-[80px]" alt="" />
        </motion.p>

      </div>

    </>
  )
}

export default SectionWrapper( Sponsors, "sponsors" );
