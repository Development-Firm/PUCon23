import { useNavigate } from "react-router-dom";
import MainImg from './../assets/main.svg'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";


import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import CountdownTimer from "./CountdownTimer";

const Hero=() => {
  const navigate=useNavigate();
  return (
    <>
    <section className={`relative w-full h-screen mx-auto `} style={{ alignItems: 'center' }}>
      <div
        className={`absolute inset-0 top-[120px] max-w-5xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full counter_gradient_color' />
          <div className='w-1 sm:h-60 h-30 violet-gradient' />
          </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Welcome to <span className='hero_text'>PUCon'23</span>
          </h1>
          <p className={`${styles.heroSubText}  text-white-100`}>
              June 3rd, 2023 <br className='sm:block hidden' />
            Punjab University College of Information Technology
          </p>
          <div>
              <CountdownTimer targetDate={"2 June, 2023, 12:00 AM"} />
          </div>
        </div>
      </div>
      <motion.p
        variants={fadeIn( "", "", 0.1, 1 )}
      >
          <div className="showImg relative">
            <div className="imgInner absolute z-[10] top-[50px]" style={{ marginTop: '80%', width: '90%', marginLeft: '4.5%' }}>
              <img src={MainImg} alt="" />
            </div>

          </div>
      </motion.p>
        <ComputersCanvas />
        <div className='absolute sm:bottom-10 bottom-[10px] registerDiv w-full flex justify-center items-center'>
        <button className='registerBtn heroComp w-[200px] font-bold h-[60px] text-[20px] gradient_color hover:bg-[#6825f7] text-white' onClick={() => navigate( '/register' )} >Register now</button>
        </div>
    </section>
    </>
  );
};

export default Hero;
