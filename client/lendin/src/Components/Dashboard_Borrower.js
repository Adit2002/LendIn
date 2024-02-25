import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Dashboard_Borrower = () => {
  const navigate = useNavigate()
  // const token = localStorage.getItem('token');
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
        <h1> Borrower dashboard </h1>
        <a href={`/${localStorage.Email}/CreateTicket`}>
          {' '}
          Link to Create Ticket
        </a>
        <br />
        <a href={`/${localStorage.Email}/Brw_addtnl_info`}>
          Add Additional Info
        </a>
        <button className="btn" onClick={HandleLogout}>
          LogOut
        </button>
      </div>
    </div>
  )
}
export default Dashboard_Borrower
