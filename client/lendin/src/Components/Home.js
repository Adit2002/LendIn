import './css/home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  // const await

  const handleclick = (s) => {
    localStorage.setItem('R', s);
    navigate('/PreReg');
  };

  return (
    <div className="page">
      <div className='image-prelogin'>
        <div className="home section">
          <div className="hero-container">
            <div className="hero-content">
              <div className="hero-text">
                <br /><br />
                <h1 className="header">
                  LendIn : Lend or Borrow Money instantly
                </h1>
                <button onClick={() => handleclick(0)} className="hero-link"> {/* Pass a callback function */}
                  New to Investing, Register here
                </button>
                <button onClick={() => handleclick(1)} className="hero-link"> {/* Pass a callback function */}
                  Want Instant Cash! Register here
                </button>
                <h2 className="subheader">Login: </h2>
                <a href="/Login" className="hero-link">
                  Already a User, Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
