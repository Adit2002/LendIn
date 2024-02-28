import './css/home.css'
const Home = () => {
  return (
    <div className="page">
      <div className='image-prelogin'>
      <div className="home section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <br/><br/>
              <h1 className="header">
                LendIn : Lend or Borrow Money instantly
              </h1>
              <a href="/register_inv" className="hero-link">
                New to Investing, Register here
              </a>
              <a href="/register_brw" className="hero-link">
                Want Instant Cash! Register here              </a>
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
  )
}
export default Home
