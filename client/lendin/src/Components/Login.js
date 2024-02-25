import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate()
  const Login_Submit = async (e) => {
    let val = -1
    e.preventDefault()
    // console.log(e);
    // console.log(e.target.investor.checked)
    if (e.target.investor.checked === true) val = 0
    else val = 1
    console.log(val)
    try {
      const serverresponse = await axios.post('http://localhost:3001/Login', {
        role: val,
        email: e.target.Email.value,
        password: e.target.Password.value,
      })
      if (serverresponse.data.istrue === true) {
        localStorage.setItem('token', serverresponse.data.Jtoken)
        localStorage.setItem('Email', e.target.Email.value)
        localStorage.setItem('Role', val)
        if (val == 0) {
          navigate(`/${e.target.Email.value}/DsbInv`)
        } else {
          navigate(`/${e.target.Email.value}/DsbBrw`)
        }
      } else {
        console.log('Invalid Credentials')
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="page">
      <div className="section">
        <form className="info-form" onSubmit={Login_Submit}>
          <div className="radio-form">
            <div className="radio-btn">
              <input type="radio" id="investor" name="role" value="investor" />
              <label for="investor">Investor</label>
            </div>
            <div className="radio-btn">
              <input type="radio" id="borrower" name="role" value="borrower" />
              <label for="borrower">Borrower</label>
            </div>
          </div>
          <input type="text" id="Email" placeholder="Email" />
          <input type="text" id="Password" placeholder="Password" />
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}
export default Login
