import React from 'react'

import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { Link } from "react-router-dom";
import { Tabs, Timeline } from 'antd';
import { StarsCanvas } from './canvas';
const { TabPane }=Tabs


const DayOneTimeline=[
  {
    label: <p className="text-[#915EFF] text-[16px] font-bold">9:30 AM-10:15 AM</p>,
    children: <div className="text-[white] text-[14px]">
      <p>Openning Ceremony</p>
    </div>,
  },
  {
    label: <p className="text-[#915EFF] text-[16px] font-bold">10:30 AM-6:30 PM</p>,
    children: <div className="text-[white] text-[14px]">
      <p>Web Hackathon</p>
      <p>Mobile Hackathon</p>
      <p>Game Dev Hackathon</p>
      <p>ESports Events</p>
    </div>,
  },
  {
    label: <p className="text-[#915EFF] text-[16px] font-bold">11:00 AM-1:00 PM</p>,
    children: <div className="text-[white] text-[14px]">
      <p>Speed Programming Round 1 Session 1</p>
    </div>,
  },
  {
    label: <p className="text-[#915EFF] text-[16px] font-bold">1:30 PM-2:30 PM</p>,
    children: <div className="text-[white] text-[14px]">
      <p>Lunch to Hackathon teams</p>
      <p>Lunch to out of city teams</p>
      <p>Lunch to organizing team and guests</p>
    </div>,
  },
  {
    label: <p className="text-[#915EFF] text-[16px]  font-bold">3:00 PM-5:00 PM</p>,
    children: <div className="text-[white] text-[14px]">
      <p>Speed Programming Round 1 Session 2</p>
    </div>,
  },
  {
    label: <p className="text-[#915EFF] text-[16px] font-bold">7:00 PM-8:00 PM</p>,
    children: <div className="text-[white] text-[14px]">
      <p>Lunch to out of city teams</p>
      <p> Lunch to organizing team and guests</p>
    </div>,
  },


]

const DayTwoTimeline=[
  {
    label: <p className="text-[#915EFF] text-[16px] font-bold">9:30 AM-3:30 PM</p>,
    children: <div className="text-[white] text-[14px]">
      <p>ESports Events Final Rounds</p>
    </div>,
  },
  {
    label: <p className="text-[#915EFF] text-[16px] font-bold">9:30 AM-1:00 PM</p>,
    children: <div className="text-[white] text-[14px]">
      <p>Speed Programming Final Round</p>
      <p>PWN (Capture the Flag) CTF</p>
    </div>,
  },
  {
    label: <p className="text-[#915EFF] text-[16px] font-bold">10:00 AM-1:00 PM</p>,
    children: <div className="text-[white] text-[14px]">
      <p>Web Hackathon Evaluation</p>
    </div>,
  },
  {
    label: <p className="text-[#915EFF] text-[16px] font-bold">10:30 AM-6:30 PM</p>,
    children: <div className="text-[white] text-[14px]">
      <p>Mobile Hackathon Evaluation</p>
    </div>,
  },
  {
    label: <p className="text-[#915EFF] text-[16px] font-bold">1:30 PM-2:30 PM</p>,
    children: <div className="text-[white] text-[14px]">
      <p>Lunch to out of city teams</p>
      <p> Lunch to organizing team and guests</p>
    </div>,
  },
  {
    label: <p className="text-[#915EFF] text-[16px] font-bold">5:30 PM-6:30 PM</p>,
    children: <div className="text-[white] text-[14px]">
      <p>Closing Ceremony</p>
    </div>,
  },
  {
    label: <p className="text-[#915EFF] text-[16px] font-bold">6:30 PM-7:00 PM</p>,
    children: <div className="text-[white] text-[14px]">
      <p>Tea to guests</p>
    </div>,
  },
  {
    label: <p className="text-[#915EFF] text-[16px] font-bold">6:30 PM-8:00 PM</p>,
    children: <div className="text-[white] text-[14px]">
      <p>Departure of guests and event closing</p>
    </div>,
  },


]


const EventTimeline=() => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Event Timeline.</h2>
      </motion.div>

      <div className='mt-10'>
        <Tabs centered defaultActiveKey="1">
          <TabPane tab="Day 1" key="1">
            <div style={{ width: '80%', marginInline: 'auto', marginTop: '2.5rem' }}>
              <Timeline
                mode='left'
                items={DayOneTimeline}
              />
            </div>

          </TabPane>
          <TabPane tab="Day 2" key="2">
            <div style={{ width: '80%', marginInline: 'auto', marginTop: '2.5rem' }}>
              <Timeline
                mode='left'
                items={DayTwoTimeline}
              />
            </div>
          </TabPane>
        </Tabs>
        <StarsCanvas />

      </div>
    </>
  )
}

export default SectionWrapper( EventTimeline, "eventTimeline" );
