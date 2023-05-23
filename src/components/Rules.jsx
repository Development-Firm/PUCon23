import React, { useEffect } from 'react'
import { StarsCanvas } from './canvas'
import Navbar from './Navbar'
import { motion } from 'framer-motion'
import { fadeIn, textVariant } from '../utils/motion'
import { styles } from '../styles'
import { useNavigate } from 'react-router-dom'

const Rules = ({ content }) => {
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className='relative z-0 pb-10 bg-primary'>
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Navbar isExternalLinks />
      </div>
      <motion.div
        className='mt-[120px] mb-[5rem] text-center'
        variants={textVariant()}
      >
        <h1 className={styles.sectionHeadText}>{content.heading}</h1>
        <hr className='border-[#874afe] mt-0 border-4 mb-20 sm:w-[300px] w-[120px] mx-auto' />
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className='mt-4 mb-[3rem] px-5 text-secondary text-[17px] max-w-7xl mx-auto leading-[30px]'
      >
        <motion.div className='mt-[20px] ' variants={textVariant()}>
          <h1 className={styles.sectionSubHead}>Introduction</h1>
        </motion.div>
        {content.introduction}
      </motion.p>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className='mt-4 mb-[3rem] px-5 text-secondary text-[17px] max-w-7xl mx-auto leading-[30px]'
      >
        <motion.div className='mt-[20px] ' variants={textVariant()}>
          <h1 className={styles.sectionSubHead}>Rules</h1>
        </motion.div>
        {content.rules.map(rule => (
          <p>{rule}</p>
        ))}
      </motion.p>

      {content.registration && (
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className='mt-4 mb-[3rem] px-5 text-secondary text-[17px] max-w-7xl mx-auto leading-[30px]'
        >
          <motion.div className='mt-[20px] ' variants={textVariant()}>
            <h1 className={styles.sectionSubHead}>Registration</h1>
          </motion.div>
          {content.registration.map(text => (
            <p>{text}</p>
          ))}
        </motion.p>
      )}

      {content.evaluation && (
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className='mt-4 mb-[3rem] px-5 text-secondary text-[17px] max-w-7xl mx-auto leading-[30px]'
        >
          <motion.div className='mt-[20px] ' variants={textVariant()}>
            <h1 className={styles.sectionSubHead}>Evaluation</h1>
          </motion.div>
          {content.evaluation.map(text => (
            <p>{text}</p>
          ))}
        </motion.p>
      )}

      {content.dateAndTime && (
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className='mt-4 mb-[3rem] px-5 text-secondary text-[17px] max-w-7xl mx-auto leading-[30px]'
        >
          <motion.div className='mt-[20px] ' variants={textVariant()}>
            <h1 className={styles.sectionSubHead}>Date and Time</h1>
          </motion.div>
          {content.dateAndTime}
        </motion.p>
      )}

      {content.prizePool && (
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className='mt-4 mb-[3rem] px-5 text-secondary text-[17px] max-w-7xl mx-auto leading-[30px]'
        >
          <motion.div className='mt-[20px] ' variants={textVariant()}>
            <h1 className={styles.sectionSubHead}>Event Prize Pool</h1>
          </motion.div>
          {content.prizePool.map((prizeAmmount, i) => {
            if (i === 0)
              return (
                <p>
                  First Prize:{' '}
                  <span className='font-bold'>Rs. {prizeAmmount}</span>
                </p>
              )
            else if (i === 1)
              return (
                <p>
                  Second Prize:{' '}
                  <span className='font-bold'>Rs. {prizeAmmount}</span>
                </p>
              )
            else if (i === 2)
              return (
                <p>
                  Third Prize:{' '}
                  <span className='font-bold'>Rs. {prizeAmmount}</span>
                </p>
              )
          })}
        </motion.p>
      )}
      {content.note && (
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className='mt-4 mb-[3rem] px-5 text-[red] text-[13px] max-w-7xl mx-auto leading-[30px]'
        >
          <span>Note: </span>
          {content.note}
        </motion.p>
      )}

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className='mt-4 mb-[3rem] px-5 text-secondary text-[17px] max-w-7xl mx-auto leading-[30px]'
      >
        <button
          className='registerBtn w-[200px] font-bold h-[60px] text-[20px] gradient_color hover:bg-[#6825f7] text-white'
          onClick={() => navigate('/register')}
        >
          Register now
        </button>
      </motion.p>

      <StarsCanvas />
    </div>
  )
}

export default Rules
