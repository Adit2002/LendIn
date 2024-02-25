import axios from 'axios'
import { useNavigate } from 'react-router-dom'
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
      <div className="section">
        <h1>See Available Options</h1>
        <a href={`/${localStorage.getItem('Email')}/See_Ticket`}>Go to</a>
        <button className="btn" onClick={HandleLogout}>
          LogOut
        </button>
      </div>
    </div>
  )
}
export default Dashboard_Investor
