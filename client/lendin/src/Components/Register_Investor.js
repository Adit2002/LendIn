import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register_Investor = () => {
  const navigate = useNavigate()

  const HandleSubmit = async (e) => {
    e.preventDefault()

    try {
      const serverResponse = await axios.post(
        'http://localhost:3001/Register_Inv',
        {
          name: e.target.investor_name.value,
          contact_number: e.target.investor_contact_number.value,
          email: e.target.investor_email.value,
          password: e.target.investor_password.value,
          address: e.target.investor_address.value,
          aadhar: e.target.investor_aadhar.value,
          pan: e.target.investor_pan.value,
          sex: e.target.investor_sex.value,
          // pan_image: e.target.investor_pan_image.files[0],
          // aadhar_image: e.target.investor_aadhar_image.files[0]
        }
      )

      if (serverResponse.data.is_true === true) {
        console.log('Success')
        navigate('/Login')
      } else {
        console.log('Try Again, Error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="page">
      <div className="section">
        <h1>Investor Registration</h1>
        <form className="info-form" onSubmit={HandleSubmit}>
          <label for="investor_name">Name:</label>
          <input type="text" id="investor_name" name="investor_name" required />

          <label for="investor_contact_number">Contact Number:</label>
          <input
            type="text"
            id="investor_contact_number"
            name="investor_contact_number"
            required
          />

          <label for="investor_email">Email:</label>
          <input
            type="email"
            id="investor_email"
            name="investor_email"
            required
          />

          <label for="investor_password">Password:</label>
          <input
            type="password"
            id="investor_password"
            name="investor_password"
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

          <label for="investor_pan_image">Upload PAN Image:</label>
          <input
            type="file"
            id="investor_pan_image"
            name="investor_pan_image"
            accept="image/*"
          />

          <label for="investor_aadhar_image">Upload Aadhar Image:</label>
          <input
            type="file"
            id="investor_aadhar_image"
            name="investor_aadhar_image"
            accept="image/*"
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register_Investor
