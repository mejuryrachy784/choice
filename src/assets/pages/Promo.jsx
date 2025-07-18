// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Promo.css";
// import logo from "../icons/logo.png copy.jpeg";
// import drive from "../image/drive.png copy.jpeg";

// const Promo = () => {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const goToLogin = () => navigate("/login");
//   const handleStartPracticing = () => navigate("/quiz");
//   const handleTryDemo = () => alert("Demo coming soon!");

//   return (
//     <div className="promo">
//       {/* Header Section */}
//       <header className="promo-header">
//         <img src={logo} alt="VID Exam Pro Logo" className="promo-logo" />
//         <ul className="nav-links">
//           <li><a href="#">Promo, Quiz, Features, Instruction</a></li>
//         </ul>
//         <button
//           className="hamburger"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="Toggle menu"
//         >
//           ☰
//         </button>
//         <nav className={`promo-nav ${menuOpen ? "open" : ""}`}>
//           <button onClick={goToLogin} className="nav-btn">Login</button>
//           <button onClick={goToLogin} className="nav-btn primary">Get Started</button>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <main className="promo-content">
//         <section className="hero-section">
//           <img src={drive} alt="Driving Exam Background" className="hero-image" />
//           <div className="hero-overlay">
//             <h1 className="hero-title">Master Your VID Oral Exam</h1>
//             <p className="hero-subtitle">
//               Practice with authentic audio questions, track your progress, and ace your Vehicle Inspection Department oral examination with confidence.
//             </p>
//             <div className="button-row">
//               <button onClick={handleStartPracticing} className="start-btn">Start Practicing Now</button>
//               <button onClick={handleTryDemo} className="demo-btn">Try Demo</button>
//             </div>
//           </div>
//         </section>

//         {/* Feature Section */}
//         <section className="promo-text">
//           <h2>Why Choose VID Exam Pro?</h2>
//           <p>The most comprehensive and professional VID oral exam preparation platform</p>

//           <div className="features-list">
//             <div className="feature-card">
//               <h3>Professional Audio Quality</h3>
//               <p>Crystal-clear, professionally recorded audio questions that mirror the actual VID oral exam experience.</p>
//             </div>
//             <div className="feature-card">
//               <h3>Advanced Progress Tracking</h3>
//               <p>Track your improvement over time with detailed analytics and personalized insights.</p>
//             </div>
//             <div className="feature-card">
//               <h3>Interactive Learning Experience</h3>
//               <p>Instant feedback, explanations, and adaptive question rotation for smarter studying.</p>
//             </div>
//           </div>

//           <h3>🎯 250+ Unique Questions • 🔊 Professional Audio • 📊 Real-time Analytics</h3>
//           <ul className="benefits-list">
//             <li>✔ No Question Repeats</li>
//             <li>✔ Timed Practice Sessions</li>
//             <li>✔ Instant Feedback</li>
//             <li>✔ Mobile Responsive</li>
//           </ul>

//           <h2>Professional Features for Exam Success</h2>
//           <div className="features-list">
//             <div className="feature-card">
//               <h3>Professional Audio Questions</h3>
//               <p>High-definition, professionally recorded audio questions.</p>
//             </div>
//             <div className="feature-card">
//               <h3>Realistic Timed Practice</h3>
//               <p>Practice with countdown timers to simulate real exam conditions.</p>
//             </div>
//             <div className="feature-card">
//               <h3>Advanced Progress Analytics</h3>
//               <p>Visual charts and improvement tracking to optimize your preparation.</p>
//             </div>
//             <div className="feature-card">
//               <h3>Interactive Feedback System</h3>
//               <p>Get instant results and learn from your mistakes with detailed explanations.</p>
//             </div>
//             <div className="feature-card">
//               <h3>Smart Question Management</h3>
//               <p>Unique rotation system prevents repeats until mastery is reached.</p>
//             </div>
//             <div className="feature-card">
//               <h3>Comprehensive Review System</h3>
//               <p>Bookmark questions and focus on weak areas with adaptive learning tools.</p>
//             </div>
//           </div>

//           <h2>Success Stories</h2>
//           <div className="testimonials">
//             <div className="testimonial">
//               <h4>Sarah M. - Passed on First Try</h4>
//               <p>"The audio quality is exceptional! The progress tracking helped me focus on weak areas. Highly recommended!"</p>
//               <p className="stars">⭐⭐⭐⭐⭐</p>
//             </div>
//             <div className="testimonial">
//               <h4>Michael R. - 95% Score Achievement</h4>
//               <p>"The interactive questions and instant feedback made all the difference. I felt completely prepared."</p>
//               <p className="stars">⭐⭐⭐⭐⭐</p>
//             </div>
//             <div className="testimonial">
//               <h4>Jennifer L. - Improved from 60% to 92%</h4>
//               <p>"Progress tracking and timed practices made me exam-ready!"</p>
//               <p className="stars">⭐⭐⭐⭐⭐</p>
//             </div>
//           </div>

//           <h2>Ready to Pass Your VID Oral Exam?</h2>
//           <p>Join thousands of successful candidates who used our platform</p>
//           <button className="book-btn" onClick={goToLogin}>Start Your Free Trial</button>
//         </section>

//         {/* Aside Image Section */}
//         <aside className="promo-image">
//           <div className="circle">
//             <img src={drive} alt="Driving exam illustration" />
//           </div>
//         </aside>
//       </main>

//       {/* Footer */}
//       <footer className="promo-footer">
//         <div>
//           <strong>VID Exam Pro</strong><br />
//           Your trusted partner for VID oral exam preparation
//         </div>
//         <div>
//           <strong>Features</strong><br />
//           Audio Practice<br />
//           Progress Tracking<br />
//           Timed Exams<br />
//           Review System
//         </div>
//         <div>
//           <strong>Support</strong><br />
//           Help Center<br />
//           Contact Us<br />
//           FAQ<br />
//           Study Guide
//         </div>
//         <div>
//           <strong>Extras</strong><br />
//           Road Safety Video<br />
//           Road Signs & Safety
//         </div>
//         <div className="copyright">
//           © 2024 VID Exam Pro. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Promo;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Promo.css";
import logo from "../icons/logo.png copy.jpeg";
import drive from "../image/drive.png copy.jpeg";

const Promo = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const goToLogin = () => navigate("/login");
  const handleStartPracticing = () => navigate("/quiz");
  const handleTryDemo = () => alert("Demo coming soon!");

  return (
    <div className="promo">
      {/* Header Section */}
      <header className="promo-header">
        <img src={logo} alt="VID Exam Pro Logo" className="promo-logo" />
        <ul className="nav-links">
          <li><a href="#">Promo, Quiz, Features, Instruction</a></li>
        </ul>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <nav className={`promo-nav ${menuOpen ? "open" : ""}`}>
          <button onClick={goToLogin} className="nav-btn">Login</button>
          <button onClick={goToLogin} className="nav-btn primary">Get Started</button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="promo-content">
        <section className="hero-section">
          <img src={drive} alt="Driving Exam Background" className="hero-image" />
          <div className="hero-overlay">
            <h1 className="hero-title">Master Your VID Oral Exam</h1>
            <p className="hero-subtitle">
              Practice with authentic audio questions, track your progress, and ace your Vehicle Inspection Department oral examination with confidence.
            </p>
            <div className="button-row">
              <button onClick={handleStartPracticing} className="start-btn">Start Practicing Now</button>
              <button onClick={handleTryDemo} className="demo-btn">Try Demo</button>
            </div>
          </div>
        </section>

       <section className="features-section">
  <h2>Why Choose VID Exam Pro?</h2>
  <p>The most comprehensive and professional VID oral exam preparation platform</p>

  {/* First row: Key highlights */}
  <div className="features">
    <div className="feature">
      <h4>Professional Audio Quality</h4>
      <p>Crystal-clear, professionally recorded audio questions that mirror the actual VID oral exam experience.</p>
    </div>
    <div className="feature">
      <h4>Advanced Progress Tracking</h4>
      <p>Track your improvement over time with detailed analytics and personalized insights.</p>
    </div>
    <div className="feature">
      <h4>Interactive Learning Experience</h4>
      <p>Instant feedback, explanations, and adaptive question rotation for smarter studying.</p>
    </div>
  </div>

  {/* Mid highlight summary */}
  <h3 className="feature-summary">
    🎯 250+ Unique Questions • 🔊 Professional Audio • 📊 Real-time Analytics
  </h3>
  <ul className="benefits-list">
    <li>✔ No Question Repeats</li>
    <li>✔ Timed Practice Sessions</li>
    <li>✔ Instant Feedback</li>
    <li>✔ Mobile Responsive</li>
  </ul>

  {/* Full feature breakdown */}
  <h2>Professional Features for Exam Success</h2>
  <div className="features">
    <div className="feature">
      <h4>Professional Audio Questions</h4>
      <p>High-definition, professionally recorded audio questions.</p>
    </div>
    <div className="feature">
      <h4>Realistic Timed Practice</h4>
      <p>Practice with countdown timers to simulate real exam conditions.</p>
    </div>
    <div className="feature">
      <h4>Advanced Progress Analytics</h4>
      <p>Visual charts and improvement tracking to optimize your preparation.</p>
    </div>
    <div className="feature">
      <h4>Interactive Feedback System</h4>
      <p>Get instant results and learn from your mistakes with detailed explanations.</p>
    </div>
    <div className="feature">
      <h4>Smart Question Management</h4>
      <p>Unique rotation system prevents repeats until mastery is reached.</p>
    </div>
    <div className="feature">
      <h4>Comprehensive Review System</h4>
      <p>Bookmark questions and focus on weak areas with adaptive learning tools.</p>
    </div>
  </div>
</section>

 <section className="features-section">
          <h2>Success Stories</h2>
          <div className="testimonials">
            <div className="testimonial">
              <h4>Sarah M. - Passed on First Try</h4>
              <p>"The audio quality is exceptional! The progress tracking helped me focus on weak areas. Highly recommended!"</p>
              <p className="stars">⭐⭐⭐⭐⭐</p>
            </div>
            <div className="testimonial">
              <h4>Michael R. - 95% Score Achievement</h4>
              <p>"The interactive questions and instant feedback made all the difference. I felt completely prepared."</p>
              <p className="stars">⭐⭐⭐⭐⭐</p>
            </div>
            <div className="testimonial">
              <h4>Jennifer L. - Improved from 60% to 92%</h4>
              <p>"Progress tracking and timed practices made me exam-ready!"</p>
              <p className="stars">⭐⭐⭐⭐⭐</p>
            </div>
          </div>

          <h2>Ready to Pass Your VID Oral Exam?</h2>
          <p>Join thousands of successful candidates who used our platform</p>
          <button className="book-btn" onClick={goToLogin}>Start Your Free Trial</button>
        </section>

        {/* Aside Image Section */}
        <aside className="promo-image">
          <div className="circle">
            <img src={drive} alt="Driving exam illustration" />
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="promo-footer">
        <div>
          <strong>VID Exam Pro</strong><br />
          Your trusted partner for VID oral exam preparation
        </div>
        <div>
          <strong>Features</strong><br />
          Audio Practice<br />
          Progress Tracking<br />
          Timed Exams<br />
          Review System
        </div>
        <div>
          <strong>Support</strong><br />
          Help Center<br />
          Contact Us<br />
          FAQ<br />
          Study Guide
        </div>
        <div>
          <strong>Extras</strong><br />
          Road Safety Video<br />
          Road Signs & Safety
        </div>
        <div className="copyright">
          © 2024 VID Exam Pro. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Promo;


