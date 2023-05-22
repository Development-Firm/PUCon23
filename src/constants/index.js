import {
  mobile,
  backend,
  creator,
  web_hack,
  app_hack,
  code,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks=[
  {
    id: "about",
    title: "About",
  },
  {
    id: "contact",
    title: "Help",
  },
];
export const externalLinks=[
  {
    id: "home",
    title: "Home",
    link: '/'
  },
  // {
  //   id: "register",
  //   title: "Registeration",
  //   link: '/register'
  // },
];

const services=[
  {
    title: "Web App Hackathon",
    icon: web_hack,
    link: '/competitions/web'
  },
  {
    title: "Mobile App Hackathon",
    icon: app_hack,
    link: '/competitions/mobile'
  },
  {
    title: "Competitive Programming",
    icon: code,
    link: '/competitions/cp'
  },
  {
    title: "Game Design",
    icon: code,
    link: '/competitions/gd'
  },
  {
    title: "Artificial Intellegence",
    icon: code,
    link: '/competitions/ai'
  },
  {
    title: "pwn CTF",
    icon: code,
    link: '/competitions/pwnctf'
  },
  {
    title: "Esports FIFA",
    icon: code,
    link: '/competitions/fifa'
  },
  {
    title: "Esports TEKKEN",
    icon: code,
    link: '/competitions/tekken'
  },
];

const technologies=[
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const web_hackathon={
  heading: 'Web Application Hackathon.',
  introduction: `FCIT is organizing its first-ever PUCon, which includes an 12-hours Web Application Development Hackathon. The event provides a platform for all web developers to showcase their skills and compete against each other. Participants will be given a general real-world problem or theme to be solved using any web development stack. All teams will be evaluated based on aesthetic design, functionality, effectiveness, and usability. This is a great opportunity for aspiring developers to showcase their talent and potentially unlock multiple opportunities in the web development sector.`,
  rules: [
    `• The problem statement or theme will be announced 30 minutes before the event officially
    starts.`,
    `• The competition duration will be 12 hours, from 9:30 AM to 9:30 PM.`,
    `• Once the competition starts, participants won't be allowed to use their mobile phone or leave the campus.`,
    `• The web application must include both backend and frontend.`,
    `• Teams will be allowed to use any framework, language, or web development stack they
    prefer.`,
    `• The use of CMS like wordpress or any such source will be prohibited.`,
    `• Internet access will be provided to all teams.`,
    `• Teams will be allowed to download resources such as images, fonts, etc. for their
    applications.`,
    `• All the teams will be provided with the judging criteria during the competition which will include criteria like the Case study analysis, Completion of requirements, Technology
    Selection Reason, Visual Design, and Database Design.`,
    `• Teams can only commit to the repository during the competition period.`,
    `• Teams will have to submit their work within.`,
    `• Each team will have to give a 10-20 minute presentation explaining their work to the panel of judges.`,
  ],
  registration: [
    `• The event is open to undergraduate students only.`,
    `• Each team will have 1-3 members, and the registration fee for each team is Rs. 1500.`
  ],
  evaluation: [
    `• The evaluation of the web applications will be conducted on the Sunday June 4th, 2023 at
    10am.`,
    `• It may take up to 2 hours for all the teams to be evaluated and for the results to be
    announced after the competition ends`,
  ],
  dateAndTime: `The Web Application Development Hackathon will be held on June 3rd, Saturday from 9:30 AM to 9:30 PM. After the competition, participants must stay for the evaluation process.
  This hackathon provides a great opportunity for participants to demonstrate their web
application development skills, network with other developers and industry experts, and
potentially win exciting prizes. Don't miss out on this opportunity to showcase your talent and gain valuable experience in the field of web development.
  `, prizePool: [ "50,000", "25,000" ],
}

const mobile_app_hackathon={
  heading: 'Mobile Application Hackathon.',
  introduction: `FCIT is organizing its first-ever PUCon, which includes an 8-hour Mobile Application Development Competition. The event provides a platform for all mobile app developers to showcase their skills and compete against each other. Participants will be given a general real-world problem , a theme or a case study to develop an app on using any mobile application framework (Hybrids such as Flutter & React Native are also allowed). The event will be held on 28th April, Friday. All teams will be evaluated based on Ui/Ux design, features & functionality , Responsiveness and general usability. This is a great opportunity for aspiring developers to showcase their talent and potentially unlock multiple opportunities in the mobile app development sector.`,
  rules: [
    `• The problem statement or theme will be announced when the event officially starts.`,
    `• The competition duration will be 8 hours, from 8:00 AM to 5:00 PM, including a 1-hour Jumah break.`,
    `• Taking your laptop outside the competition premises will not be allowed.`,
    `• During the Jumah break, participants won't be allowed to take their laptops with them.`,
    `• All teams will bring their own laptops.`,
    `• Participants will make a private GitHub repository and add their teammates as collaborators. Only they are allowed to commit to the repository.`,
    `• Teams will add a member of the Event Organizers as a collaborator to their GitHub repository.`,
    `• Teams will be allowed to use any framework, language, or app development framework they prefer (Hybrids such as Flutter & React Native are also allowed). Internet access will be provided to all teams.`,
    `• All the teams will be provided with the judging criteria during the competition which will include criteria like the Case study analysis, and how much will each feature weight towards your final total.`,
    `• Teams can only commit to the repository during the competition period. Any change recorded afterwards will result in negative marking.`,
    `• Teams will have to submit their work by the end of the 8th hour. Late submissions will not be accepted.`,
    `• Each team will have to give a 5-8 minute presentation explaining their work to the panel of judges on the same day.`

  ],
  registration: [
    `• The event is open to undergraduate students only.`,
    `• Each team will have 1-3 members, and the registration fee for each team is Rs. 1000.`,
  ],
  evaluation: [
    `• The evaluation of the mobile applications will be conducted on the same day.`,
    `• It may take up to 2 hours for all the teams to be evaluated and for the results to be
    announced after the competition ends`,
  ],
  dateAndTime: `The Mobile Application Competition will be held on April 28th, Friday, from 9:00 AM to 6:00 PM, including a 1-hour Jumah break. After the competition, participants must stay for the evaluation process.Female students will be allowed to leave as long as one of their teammates stays for the presentation. This Competition provides a great opportunity for participants to demonstrate their mobile application development skills, network with other developers and industry experts, and potentially win exciting prizes. Don't miss out on this opportunity to showcase your talent and gain valuable experience in the field of mobile development.`
  , prizePool: [ "25,000", "15,000" ],
}

const competitive_programming={
  heading: 'Competitive Programming.',
  introduction: `Ignite your coding prowess and prepare for the ultimate battle of algorithms at the nationwide Competitive Programming Contest at PUCon!
  Get ready to witness the talented programmers from across the country as they showcase their problem-
solving skills, algorithmic expertise, and coding finesse at the upcoming nationwide Competitive
Programming Contest. This exhilarating event will combine creativity, logic, and efficient coding to tackle
complex challenges within strict time limits. Be prepared for a thrilling journey of intellectual prowess, as
you compete against the best minds in the country. Whether you are a seasoned competitor or a
newcomer eager to test your mettle, this event will offer an incredible opportunity to enhance your skills,
network with fellow enthusiasts, and leave an indelible mark in the competitive programming community.
  `,
  rules: [
    `• Allowed Programming languages are C/C++, python and Java.`,
    `• Each Team can have up-to 3 members.`,
    `• Contest will have two rounds, top teams from qualification round on first day will compete in final round on second day.`,
    `Teams are ranked by using following parameters:`,
    `• Score:`,
    `Number of problems solved.`,
    `Higher is better.`,
    `• Penalty:`,
    `In case of tie, the penalty is considered.`,
    `Penalty is the sum of the times at which each problem was solved.`,
    `For each incorrect submission, a fixed penalty is added`,
    `Note that only problems which are solved are considered for calculating the penalty.`,
    `Any extra submissions for a problem after it is solved are ignored.`,
    `Lower is better.`,
    `• Tie Breaking:`,
    `If a tie still remains, the time at which the last successful problem was solved is used.`,
    `Lower is better.`,
    `• Leaderboard will freeze for last 30 minutes.`,
    `• In case of any disputes or concerns, participants should immediately notify the contest
      organizers. Decisions made by the organizers regarding rule violations, penalties, or
      disqualifications are final and binding.`,
    `• The contest organizers reserve the right to make amendments or updates to the rules, problem
      statements, or any other aspects of the contest. Participants are responsible for keeping
      themselves informed about any changes communicated by the organizers.`,
    `• Use of mobile phone, Internet, communication with other team will result in disqualification.`
  ],
  registration: [
    `• The event is open to undergraduate students only.`,
    `• Each team will have 1-3 members, and the registration fee for each team is Rs. 1200.`,
  ],
  dateAndTime: `Round 1 of the competition will be held on June 3rd, Saturday, from 3:00 PM to 5:00 PM and Final Round will be held on June 4th, Sunday, from 9:30 AM-1:00 PM. This Competition provides a great opportunity for participants to showcase your talent and gain valuable experience.`,
  prizePool: [ "20,000", "15,000", "10,000" ],
  note: `All participants are expected to adhere to a high standard of ethical conduct throughout the contest.
  Cheating, plagiarism, or any form of dishonesty will not be tolerated. Respectful and professional
  behavior towards fellow participants, organizers, and staff is mandatory.`
}

const game_design={
  heading: 'Game Design.',
  introduction: `Have you ever wondered who comes up with all these epic game ideas? Who creates
  these immersive experiences which keeps millions of people on the edge of their seats while
  playing a game? Do these game development companies have magical powers or is there actually
  a method to this madness? Well, Mindstorm Studios has the answers to all these questions
  through its flagship event called the Game Design Jam.
  The Game Design jam is all about using your creativity and imagination to create games on the
  basis of global industrial best practices. Participants will not only get a chance to learn these
  industrial standards through some of the brightest minds of the local game development
  industry, but will later on get to practically implement these standards to conceptualize games
  on specific themes. Moreover, they will also be mentored throughout the Game Design Jam by
  the epic staff of Mindstorm Studios.
  And to put the cherry on top of the cake, THE WINNER AND RUNNERS UP WILL GET A CHANCE
TO WIN CASH PRIZES!!!`,
  rules: [
    `• Each team must consist of three members.`,
    `• Individual registrations will not be accepted.`,
    `• Teams are required to bring their own laptop for the competition.`,
    `• All other necessary materials and resources will be provided.`,
    `• Participants must create their games based on a specific theme provided during
    the event.`,
    `• The games should showcase creativity, innovation, and adherence to global
    industrial best practices.`,

  ],
  registration: [
    `• The event is open to undergraduate students only.`,
    `• Each team will have 1-3 members, and the registration fee for each team is Rs. 1200.`,
  ],
  evaluation: [
    `• 2 pm - 3 pm: Presentations in front of Judges (3 minutes of presentation and 2
      minutes of Q&A)`,
    `• 3 pm - 3:30 pm: Winner and Runners up Announcement + Certificate Distribution`,
  ],
  dateAndTime: `Competition will be held on June 3rd, Saturday, from 9:30 AM to Sunday 3:00 PM. This Competition provides a great opportunity for participants to showcase your talent and gain valuable experience.`,
  prizePool: [ "15,000", "10,000" ],
}

const artificial_intellegence={
  heading: 'Artificial Intellegence.',
  introduction: `Welcome to Code BEES - the ultimate coding competition designed exclusively for female coders with the aim to empower and equip them to pursue fulfilling careers in the tech industry through friendly competition, networking opportunities, and top-notch educational resources. Competition is designed to help you gain experience in solving algorithmic problem improving your coding speed, and polishing your problem-solving skills`,
  rules: [
    `• Allowed Programming Langauges : C++, Python.`,
    `• Duration of contest will be 3 hours`,
    `• Use of mobile phone, Internet, communication with other team will result in disqualification.`

  ],
  registration: [
    `• The event is open to undergraduate students only.`,
    `• Each team will have 1-3 members, and the registration fee for each team is Rs. 600.`,
  ],
  evaluation: [
    `• Your output format must exactly be same to the format defined for each problem, it will be graded automatically by a computer program.`,
    `• Teams are ranked by count of solved problems, with the cumulative time taken (between the contest's start time and the time of your correct submission) used to break ties.`,
    `• There will be no points for partially correct solutions`,
  ],
  dateAndTime: `Code Bees. Competition will be held on April 28th, Friday, from 9:00 AM to 12:00 PM. This Competition provides a great opportunity for participants to showcase your talent and gain valuable experience.`,
  prizePool: [ "20,000", "15,000", "10,000" ],
}

const pwn_ctf={
  heading: 'pwn CTF.',
  introduction: `Welcome to Code BEES - the ultimate coding competition designed exclusively for female coders with the aim to empower and equip them to pursue fulfilling careers in the tech industry through friendly competition, networking opportunities, and top-notch educational resources. Competition is designed to help you gain experience in solving algorithmic problem improving your coding speed, and polishing your problem-solving skills`,
  rules: [
    `• Allowed Programming Langauges : C++, Python.`,
    `• Duration of contest will be 3 hours`,
    `• Use of mobile phone, Internet, communication with other team will result in disqualification.`

  ],
  registration: [
    `• The event is open to undergraduate students only.`,
    `• Each team will have 1-3 members, and the registration fee for each team is Rs. 600.`,
  ],
  evaluation: [
    `• Your output format must exactly be same to the format defined for each problem, it will be graded automatically by a computer program.`,
    `• Teams are ranked by count of solved problems, with the cumulative time taken (between the contest's start time and the time of your correct submission) used to break ties.`,
    `• There will be no points for partially correct solutions`,
  ],
  dateAndTime: `Code Bees. Competition will be held on April 28th, Friday, from 9:00 AM to 12:00 PM. This Competition provides a great opportunity for participants to showcase your talent and gain valuable experience.`,
  prizePool: [ "20,000", "15,000", "10,000" ],
}

const esports_fifa={
  heading: 'Esports FIFA.',
  introduction: `Welcome to Code BEES - the ultimate coding competition designed exclusively for female coders with the aim to empower and equip them to pursue fulfilling careers in the tech industry through friendly competition, networking opportunities, and top-notch educational resources. Competition is designed to help you gain experience in solving algorithmic problem improving your coding speed, and polishing your problem-solving skills`,
  rules: [
    `• Allowed Programming Langauges : C++, Python.`,
    `• Duration of contest will be 3 hours`,
    `• Use of mobile phone, Internet, communication with other team will result in disqualification.`

  ],
  registration: [
    `• The event is open to undergraduate students only.`,
    `• Each team will have 1-3 members, and the registration fee for each team is Rs. 600.`,
  ],
  evaluation: [
    `• Your output format must exactly be same to the format defined for each problem, it will be graded automatically by a computer program.`,
    `• Teams are ranked by count of solved problems, with the cumulative time taken (between the contest's start time and the time of your correct submission) used to break ties.`,
    `• There will be no points for partially correct solutions`,
  ],
  dateAndTime: `Code Bees. Competition will be held on April 28th, Friday, from 9:00 AM to 12:00 PM. This Competition provides a great opportunity for participants to showcase your talent and gain valuable experience.`,
  prizePool: [ "20,000", "15,000", "10,000" ],
}
const esports_tekken={
  heading: 'Esports TEKKEN.',
  introduction: `Welcome to Code BEES - the ultimate coding competition designed exclusively for female coders with the aim to empower and equip them to pursue fulfilling careers in the tech industry through friendly competition, networking opportunities, and top-notch educational resources. Competition is designed to help you gain experience in solving algorithmic problem improving your coding speed, and polishing your problem-solving skills`,
  rules: [
    `• Allowed Programming Langauges : C++, Python.`,
    `• Duration of contest will be 3 hours`,
    `• Use of mobile phone, Internet, communication with other team will result in disqualification.`

  ],
  registration: [
    `• The event is open to undergraduate students only.`,
    `• Each team will have 1-3 members, and the registration fee for each team is Rs. 600.`,
  ],
  evaluation: [
    `• Your output format must exactly be same to the format defined for each problem, it will be graded automatically by a computer program.`,
    `• Teams are ranked by count of solved problems, with the cumulative time taken (between the contest's start time and the time of your correct submission) used to break ties.`,
    `• There will be no points for partially correct solutions`,
  ],
  dateAndTime: `Code Bees. Competition will be held on April 28th, Friday, from 9:00 AM to 12:00 PM. This Competition provides a great opportunity for participants to showcase your talent and gain valuable experience.`,
  prizePool: [ "20,000", "15,000", "10,000" ],
}



export { services, technologies, web_hackathon, mobile_app_hackathon, competitive_programming, artificial_intellegence, game_design, pwn_ctf, esports_fifa, esports_tekken };
