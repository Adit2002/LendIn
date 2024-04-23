import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register_Investor = () => {
  const navigate = useNavigate()
  const name=localStorage.getItem('name');
  const email=localStorage.getItem('email');
  const HandleSubmit = async (e) => {
    e.preventDefault()

    try {
      const serverResponse = await axios.post(
        'http://localhost:3001/Register_Inv',
        {
          name: name,
          contact_number: e.target.investor_contact_number.value,
          email: email,
          address: e.target.investor_address.value,
          aadhar: e.target.investor_aadhar.value,
          pan: e.target.investor_pan.value,
          sex: e.target.investor_sex.value,
        }
      )
      if (serverResponse.data.is_true === true) {
        console.log('Success')
        navigate(`/${email}/DsbInv`)
      } else {
        console.log('Try Again, Error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="page">
      <div className='image-prelogin'>
      <div className="info-form">
      <h1 className ="name-card">Investor Registration</h1>
      <h2 className='name-card'>Email: {email} </h2>
        <form  onSubmit={HandleSubmit}>
          <label for="investor_name">Name:</label>
          <input type="text" id="investor_name" name="investor_name" required />

          <label for="investor_contact_number">Contact Number:</label>
          <input
            type="text"
            id="investor_contact_number"
            name="investor_contact_number"
            required
          />

          <label for="investor_pan">PAN Number:</label>
          <input type="text" id="investor_pan" name="investor_pan" required />

          <label for="investor_aadhar">Aadhar Number:</label>
          <input
            type="text"
            id="investor_aadhar"
            name="investor_aadhar"
            required
          />

          <label for="investor_address">Address:</label>
          <input
            type="text"
            id="investor_address"
            name="investor_address"
            required
          />

          <label for="investor_sex">Sex:</label>
          <select id="investor_sex" name="investor_sex" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button type="submit">Register</button>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Register_Investor
