import React, { useState } from 'react'
import { StarsCanvas } from './canvas'
import Navbar from './Navbar'
import { motion } from "framer-motion";
import { staggerContainer } from '../utils/motion';
import { styles } from '../styles';
import { Button, Form, Input ,message} from 'antd';
import { fullLogo } from '../assets';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import Cookies from 'js-cookie'

const Login=() => {
  const [ user, setUser ]=useState( {} );
  const navigate=useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  onAuthStateChanged( auth, ( currentUser ) => {
    setUser( currentUser );
  } );

  const onFinish=async ( values ) => {
    try {
      const user=await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      messageApi.open({
        type: 'success',
        content: 'Logged in successfuly',
        duration: 3,
      });
      Cookies.set( 'jwt', user.user.accessToken )
      setTimeout(()=>{
        navigate( '/dashboard' )
      },3000)

    } catch ( error ) {
      if(error.message.includes('user-not-found'))
      messageApi.open({
        type: 'error',
        content: "Email or password is incorrect!",
        duration: 3,
      });
      else
      messageApi.open({
        type: 'error',
        content: 'Something went wrong, ty again!',
        duration: 3,
      });
    }
  }

  return (
    <>
    {contextHolder}
    <div className='relative z-0 h-screen bg-primary'>
      <div className=''>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive( "" );
            window.scrollTo( 0, 0 );
          }}
        >
          <img src={fullLogo} alt='logo' className='object-contain sm:w-[27rem] w-[10rem]' style={{ marginRight: 'auto', marginLeft: 'auto',marginBottom:'-5rem'}} />
        </Link>
      </div>

      <motion.section
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-4xl mx-auto relative z-0`}
      >
        <div
          className={`xl:mt-1 flex xl:flex-row flex-col-reverse gap-10 justify-center overflow-hidden`}
        >
          <motion.div
            // variants={slideIn( "left", "tween", 0.2, 1 )}
            className='flex-[0.75] text-center bg-black-100 p-8 rounded-2xl'
          >
            <h4 className={`${styles.sectionHeadText} mb-[30px]`}>Login.</h4>

            <Form
              layout='vertical'
              name="basic"
              style={{
                // maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                    type: 'email'
                  },
                ]}
              >
                <Input size='large' />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password size='large' />
              </Form.Item>

              <Form.Item

              >
                <button type='submit' className='w-[80px] font-bold h-[40px] text-[18px] gradient_color hover:bg-[#6825f7] text-white'  >Login</button>
              </Form.Item>
            </Form>

          </motion.div>
        </div>
      </motion.section>
      <StarsCanvas />
    </div></>
  )
}

export default Login