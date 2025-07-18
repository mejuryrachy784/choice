import React from 'react';
import './app.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Promo from './assets/pages/Promo';
import Login from './assets/pages/Login';
import Quiz from './assets/pages/Quiz';
import Dashboard from './assets/pages/Dashboard';
import Mistake from "./assets/pages/Mistake";

import History from './assets/pages/History';
import Service from './assets/pages/Service';
// import Quiz from './assets/pages/Quiz';
import Touch from './assets/pages/Touch';
// import About from './assets/pages/About';
// import Dashboard from './assets/pages/Dashboard';
import Home from './assets/pages/Home';
import Test from "./assets/pages/Test";
import Instructions from "./assets/pages/Instructions";

import OTPVerify from './assets/pages/Otpverify';
import Details from './assets/Component/Details';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Promo />} />           {/* Home page */}
        <Route path="/login" element={<Login />} />      {/* Login page */}
          <Route path="/quiz"element={<Quiz/>}/> {/*Quiz page*/}
             <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ This fixes the issue */}
             <Route path="/mistake"element={<Mistake/>}/> {/* Mistake page*/}
 <Route path="/history"element={<History/>}/> {/*History page*/}

        <Route path="/service"element={<Service/>}/> {/*Service page*/}
         {/* <Route path="/quiz"element={<Quiz/>}/> Quiz page */}
           <Route path="/touch"element={<Touch/>}/> {/* Touch page*/}
        {/* <Route path="/about" element={<About/>}/> About page */}
       
          {/* <Route path="/dashboard" element={<Dashboard />} /> ✅ This fixes the issue */}
        <Route path="/home" element={<Home />} />          {/* Home page after login */}
       
        <Route path="/test" element={<Test />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/verify" element={<OTPVerify />} /> {/* OTP verification */}
          <Route path="/details/:id" element={<Details />} /> {/* ✅ This fixes the warning */}
      
      </Routes>
    </BrowserRouter>
  );
};

export default App;

 






     

