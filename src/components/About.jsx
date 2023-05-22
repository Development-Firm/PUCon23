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
          Get ready to be part of the Most Anticipated  event of the year of <span className="font-bold text-[white]">FCIT</span> – <span className="font-bold text-[white]">PUCon'23!</span> This mega event promises to be a melting pot of knowledge,creativity, and inspiration. With participants and attendees coming from all corners of different universities of Pakistan.
          PUCon'23 creates a vibrant and diverse community of tech enthusiasts. It's an unparalleled opportunity to connect with like-minded individuals, network with industry professionals, and forge valuable connections that can last a lifetime.
          PUCon'23 is a great opportunity for students and professionals to showcase their skills and compete against the best in the world. The event is open  to all skill levels, so whether you are a beginner or an experienced competitor,
          you are sure to find something to enjoy at PUCon'23.
          <br />
          Join us <span className="font-bold text-[white]"> at FCIT</span>,  PUCon'23, the Mega Event that brings together the brightest
          minds and  enthusiasts from around the world! This  gathering is set to showcase a diverse range of competitions and challenges, ensuring an
          unforgettable experience for participants and attendees alike.

          <br />
          <p>
            <span className="text-[white] text-[18px] font-bold">Competitions Include:</span>
            <br />
            <ul>
              <li>• Competitive Programming</li>
              <li>• Mobile Hackathon</li>
              <li>• Game Dev Hackathon</li>
              <li>• PWN Capture the Flag</li>
              <li>• Artificial Intelligence</li>
              <li>• ESports</li>
            </ul>
          </p>
          <br />
          <p>
            Mark your calendars on <span className="font-bold text-[white]"> 3rd and 4th june 2023</span>  and Get ready to be part of this extraordinary event that celebrates innovation, talent and the limitless potential of technology at  PUCon'23 and let your brilliance shine in the world. Stay tuned for Further Updates.
          </p>
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
