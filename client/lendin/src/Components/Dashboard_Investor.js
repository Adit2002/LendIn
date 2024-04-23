import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './css/general.css'
const Dashboard_Investor = () => {
  const navigate = useNavigate()
  const funcheck = async () => {
    const checkToken = await axios.get('http://localhost:3001/checktoken', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })

    if (checkToken.data.is_true === false) {
      navigate('/Home')
    } else {
      console.log('True')
    }
  }
  const HandleLogout = () => {
    localStorage.clear()
    navigate('/Login')
  }
  funcheck()
  return (
    <div className="page">
      <div className='image-postlogin'>
      <div className="section">
        <h1 className='metallic-heading'>Hello! {localStorage.getItem('Name')}, How can we assist.</h1><br/><br/>
        <a className='box-link' href={`/${localStorage.getItem('email')}/See_Ticket`}>Invest Here!</a>
        <br/>
        <a className='box-link' href={`/metamask`}>Connect MetaMask!</a>
        <br/>
        <br/>
        <button className="btn" onClick={HandleLogout}>
          LogOut
        </button>
      </div>
      </div>
    </div>
  )
}
export default Dashboard_Investor
