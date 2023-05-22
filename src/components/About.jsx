import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { Link, useLocation } from "react-router-dom";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="sm:w-[350px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-5xl leading-[30px]"
      >
        <p>
          FCIT ,one of the leading institutions in computing and information
          technology proudly presents a thrilling multi-competition hackathon
          PUCon'23 Unleash your coding skills at our 2 day hackathon! Join
          fellow enthusiasts to solve real world challenges and showcase your
          talent. You will be expecting 
        </p>
        <br/>
        <ul>
          <li>• Challenging Problem Statements</li>
          <li>• Expert Mentors</li>
          <li>• Collaborative environment</li>
          <li>• Industry Links</li>
          <li>• Prizes & Recognition</li>
          <li>• Learning opportunities</li>
        </ul>
        <br/>
        <p>
        Open to all university students passionate about challenging
        competitions. Don't miss out this exciting event.Let's redefine what's
        possible!
        </p>
      </motion.p>

      <div className="cardsm mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <Link className="sm:w-[350px] w-full" to={service.link}>
            <ServiceCard key={service.title} index={index} {...service} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
