import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { styles } from "../styles";
import { externalLinks, navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar=( { isExternalLinks , isRegisteration} ) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location=useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed ${isRegisteration?'top-10':'top-0'} z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      } navbar`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='object-contain logo' style={{ width: '4rem' }} />

        </Link>

        {
          !isExternalLinks? <ul className='list-none hidden sm:flex flex-row gap-10'>
            {navLinks.map( ( nav ) => (
              <li
                key={nav.id}
                className={`${active===nav.title? "text-white":"text-secondary"
                  } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive( nav.title )}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ) )}

          </ul>:<ul className='list-none hidden sm:flex flex-row gap-10'>
            {externalLinks.map( ( nav ) => (
            <li
              key={nav.id}
              className={`${
                location.pathname.includes( 'register' )&&nav.title==="Registeration"? "text-white":"text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
                <Link to={nav.link}>{nav.title}</Link>
            </li>
          ))}
              <div className="dropdown">
                <button className={`${location.pathname.includes( 'competitions' )? 'text-white':'text-secondary'} dropbtn hover:text-white pt-[2px] text-[18px] font-medium cursor-pointer`}>Competitions</button>
                <div className="dropdown-content ">
                      <Link className="links" to='/competitions/web'>Web Hackathon</Link>
                      <Link className="links" to='/competitions/mobile'>Mobile App Hackathon</Link>
                      <Link className="links" to='/competitions/cp'>Competitive Programming</Link>
                      <Link className="links" to='/competitions/ai'>Artificial Intellegence</Link>
                      <Link className="links" to='/competitions/pwnctf'>pwn CTF</Link>
                      <Link className="links" to='/competitions/gd'>Game Design</Link>
                      <Link className="links" to='/competitions/fifa'>Esports FIFA</Link>
                      <Link className="links" to='/competitions/tekken'>Esports TEKKEN</Link>
                </div>
              </div>

        </ul>
        }
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            {
              !isExternalLinks? <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
                {navLinks.map( ( nav ) => (
                  <li
                    key={nav.id}
                    className={`font-poppins text-center font-medium cursor-pointer text-[16px] ${active===nav.title? "text-white":"text-secondary"
                      }`}
                    onClick={() => {
                      setToggle( !toggle );
                      setActive( nav.title );
                    }}
                  >
                    <a href={`#${nav.id}`}>{nav.title}</a>
                  </li>

                ) )}

              </ul>:<ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
                {externalLinks.map( ( nav ) => {
                  return <li
                    key={nav.id}
                    className={`font-poppins text-center font-medium cursor-pointer text-[16px] ${location.pathname.includes( 'register' )&&nav.title==="Registeration"? "text-white":"text-secondary"
                      }`}
                    onClick={() => {
                      setToggle( !toggle );
                      setActive( nav.title );
                    }}
                  >
                    <Link to={nav.link}>{nav.title}</Link>
                  </li>
 } )}
                  <div className="dropdown">
                    <button className={`${location.pathname.includes( 'competitions' )? 'text-white':'text-secondary'} dropbtn hover:text-white pt-[2px] text-[18px] font-medium cursor-pointer`}>Competitions</button>
                    <div className="dropdown-content ">
                      <Link className="links" to='/competitions/web'>Web Hackathon</Link>
                      <Link className="links" to='/competitions/mobile'>Mobile App Hackathon</Link>
                      <Link className="links" to='/competitions/cp'>Competitive Programming</Link>
                      <Link className="links" to='/competitions/ai'>Artificial Intellegence</Link>
                      <Link className="links" to='/competitions/pwnctf'>pwn CTF</Link>
                      <Link className="links" to='/competitions/gd'>Game Design</Link>
                      <Link className="links" to='/competitions/fifa'>Esports FIFA</Link>
                      <Link className="links" to='/competitions/tekken'>Esports TEKKEN</Link>
                    </div>
                  </div>

              </ul>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
