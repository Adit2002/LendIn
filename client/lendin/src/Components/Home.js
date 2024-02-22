import Hero from './Hero'
import './css/page.css'

const Home = () => {
  return (
    <div className="page">
      <div className="home section">
        <Hero></Hero>
        <h1 className="header">LendIn : Lend/Borrow Money instantly</h1>

        <a href="/register_inv">New to Investing, Register here</a>

        <a href="/register_brw">Want Instant Cash! Register-Apply-Get_Money</a>

        <h2 className="subheader">Login As borrower</h2>
        <a href="/Login">Already a User, Login</a>
      </div>
    </div>
  )
}
export default Home
