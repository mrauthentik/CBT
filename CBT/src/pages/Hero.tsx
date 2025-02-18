
const Hero = () => {
  return (
    <div className="cbt">
         <div className="main">
        <div className="hero">
            <h1 className="heading">Take A Exam<br/>Before The Exam</h1>
            <p className="para">
                Prepare for your exams with our<br/>computer-based training platform
            </p>
            
 </div>
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="wave">
    <path fill="teal" fill-opacity="1" d="M0,32L80,74.7C160,117,320,203,480,213.3C640,224,800,160,960,112C1120,64,1280,32,1360,16L1440,0L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
 
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
        </div>

    </div>
  );
};

export default Hero;
