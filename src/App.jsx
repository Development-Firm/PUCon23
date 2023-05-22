import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { About, Contact, Hero, Navbar, Sponsors, StarsCanvas } from "./components";
import Applicants from "./components/dashboard/Applicants";
import CodeBeesTeam from "./components/dashboard/CodeBeesTeam";
import Dashboard from "./components/dashboard/Dashboard";
import MobileAppTeam from "./components/dashboard/MobileAppTeam";
import WebTeam from "./components/dashboard/WebTeam";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import Rules from "./components/Rules";
import { artificial_intellegence, competitive_programming, esports_fifa, esports_tekken, game_design, mobile_app_hackathon, pwn_ctf, web_hackathon } from "./constants";
import { useEffect } from "react";
import EventTimeline from "./components/EventTimeline";


const Home=() => {
  return (
    <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
      <About />
      <EventTimeline />
      <Sponsors />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
  )
}

const App=() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/competitions/web" element={<Rules content={web_hackathon} />} />
        <Route path="/competitions/mobile" element={<Rules content={mobile_app_hackathon} />} />
        <Route path="/competitions/cp" element={<Rules content={competitive_programming} />} />
        <Route path="/competitions/ai" element={<Rules content={artificial_intellegence} />} />
        <Route path="/competitions/gd" element={<Rules content={game_design} />} />
        <Route path="/competitions/pwnctf" element={<Rules content={pwn_ctf} />} />
        <Route path="/competitions/fifa" element={<Rules content={esports_fifa} />} />
        <Route path="/competitions/tekken" element={<Rules content={esports_tekken} />} />
        <Route exact path="register" element={<Register />} />
        <Route
          exact
          path='/dashboard/'
          element={
            <ProtectedRoute >
            <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route exact path="" element={<Applicants />} />
          <Route exact path="applicants" element={<Applicants />} />
          <Route exact path="approved_teams/web" element={<WebTeam />} />
          <Route exact path="approved_teams/mobile" element={<MobileAppTeam />} />
          <Route exact path="approved_teams/code" element={<CodeBeesTeam />} />
        </Route>

      </Routes>


    </BrowserRouter>
  );
}

export default App;
