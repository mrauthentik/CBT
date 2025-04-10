import logo from '../../src/Components/logo/logo.jpeg'
import "../App.css"
const Hero = () => {
  return (
    <div className="cbt">
         <div className="main">
        <div className="hero">
            <h1 className="heading">Take An Exam<br/>Before The Exam</h1>
            <p className="para">
                Prepare for your exams with our<br/>computer-based training platform
            </p>
            
 </div>
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="wave">
    <path fill="teal" fillOpacity="1" d="M0,32L80,74.7C160,117,320,203,480,213.3C640,224,800,160,960,112C1120,64,1280,32,1360,16L1440,0L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
 

{/* About Code */}

<div className="about">
      {/* Image Overlay Section */}
      <div className="img-overlay">
        <div className="img-box"></div>
        <div className="img-container">
          <img src={logo} alt="About Image" className="about-img" />
        </div>
      </div>

      {/* Text Section */}
      <div className="about-text">
        <h2>ABOUT US <span className="underline"></span></h2>
        <p>
          <strong>NEXA:</strong> NOUN Exam Experience Assistant
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quisquam at rem
          beatae debitis, eos amet quis similique cumque mollitia ut dignissimos a
          accusantium ipsum ab laborum eveniet corporis! Quis!
        </p>
      </div>
    </div>



        <div className="feat">
            <div className="box">
                <i className='bx bx-book-open' ></i>
                <p>Course Materials</p>
                <small>Access comprehensive study materials</small>
            </div>
            <div className="box">
                <i className='bx bx-laptop'></i>
                <p>CBT</p>
                <small>Take real-time practice exams</small>
            </div>
            </div>
            <div className='features'>
            <div className="box">
                <i className='bx bxs-hourglass-top' ></i>
                <p>Timers</p>
                <small>Simulated exam environment with timers</small>
            </div>
            <div className="box">
                <i className='bx bx-timer'></i>
                <p>Tracks</p>
                <small>Track your progress and improve</small>

            </div>

        </div>

             {/* Team Section */}
             <div className="team">
          <h2 className="team-heading">OUR TEAM <span className="underline"></span></h2>
          <div className="team-grid">
            {/* Team Member 1 */}
            <div className="team-member">
              <div className="team-img-container">
                <img src={logo} alt="Team Member 1" className="team-img" />
              </div>
              <h3 className="team-name">Paul Prince</h3>
              <p className="team-role">Lead Developer</p>
              <p className="team-bio">
                John spearheads the development of NEXA, ensuring a seamless user experience.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="team-member">
              <div className="team-img-container">
                <img src={logo} alt="Team Member 2" className="team-img" />
              </div>
              <h3 className="team-name">Uche Firelord</h3>
              <p className="team-role">UI/UX Designer</p>
              <p className="team-bio">
                Jane designs intuitive interfaces to make exam prep engaging and user-friendly.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="team-member">
              <div className="team-img-container">
                <img src={logo} alt="Team Member 3" className="team-img" />
              </div>
              <h3 className="team-name">Muna Maggie</h3>
              <p className="team-role">Content Specialist</p>
              <p className="team-bio">
                Alex curates high-quality study materials tailored for exam success.
              </p>
            </div>

            {/* Team Member 4 */}
            <div className="team-member">
              <div className="team-img-container">
                <img src={logo} alt="Team Member 4" className="team-img" />
              </div>
              <h3 className="team-name">Ifeanyi Funds</h3>
              <p className="team-role">Project Manager</p>
              <p className="team-bio">
                Emily keeps the team on track, ensuring timely delivery of features.
              </p>
            </div>
          </div>
           {/* FAQ Section */}
        <div className="faq">
          <h2 className="faq-heading">
            FREQUENTLY ASKED QUESTIONS <span className="underline"></span>
          </h2>
          <div className="faq-container">
            <div className="faq-item">
              <input type="checkbox" id="faq1" className="faq-toggle" />
              <label htmlFor="faq1" className="faq-question">
                What is NEXA?
              </label>
              <div className="faq-answer">
                <p>
                  NEXA (NOUN Exam Experience Assistant) is a computer-based training platform
                  designed to help students prepare for exams with practice tests, study
                  materials, and timers.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <input type="checkbox" id="faq2" className="faq-toggle" />
              <label htmlFor="faq2" className="faq-question">
                How do I access the course materials?
              </label>
              <div className="faq-answer">
                <p>
                  You can access course materials by logging into your account and navigating
                  to the "Course Materials" section on the dashboard.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <input type="checkbox" id="faq3" className="faq-toggle" />
              <label htmlFor="faq3" className="faq-question">
                Are the practice exams timed?
              </label>
              <div className="faq-answer">
                <p>
                  Yes, our practice exams include timers to simulate a real exam environment,
                  helping you manage your time effectively.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <input type="checkbox" id="faq4" className="faq-toggle" />
              <label htmlFor="faq4" className="faq-question">
                How can I track my progress?
              </label>
              <div className="faq-answer">
                <p>
                  Your progress is tracked automatically after each practice exam, and you can
                  view detailed reports in the "Tracks" section.
                </p>
              </div>
            </div>
          </div>
              {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <img src={logo} alt="NEXA Logo" className="footer-logo-img" />
            <p className="footer-tagline">NOUN Exam Experience Assistant</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="bx bxl-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="bx bxl-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="bx bxl-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="bx bxl-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} NEXA. All Rights Reserved.</p>
        </div>
      </footer>
        </div>
        </div>
        </div>


    </div>
  );
};

export default Hero;
