import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Register_Borrower = () => {
  const navigate = useNavigate()
  const HandleSubmit = async (e) => {
    e.preventDefault()
    try {
      const serverResponse = await axios.post(
        'http://localhost:3001/Register_Borrower',
        {
          name: e.target.borrower_name.value,
          contact_number: e.target.borrower_contact_number.value,
          email: e.target.borrower_email.value,
          password: e.target.borrower_password.value,
          address: e.target.borrower_address.value,
          aadhar: e.target.borrower_aadhar.value,
          pan: e.target.borrower_pan.value,
          sex: e.target.borrower_sex.value,
          pan_image: e.target.borrower_pan_image.files[0], // Access file data using files[0]
          aadhar_image: e.target.borrower_aadhar_image.files[0],
        }
      )
      // console.log(serverResponse.data);
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
        <form className="info-form" onSubmit={HandleSubmit}>
          <label for="borrower_name">Name:</label>
          <input type="text" id="borrower_name" name="borrower_name" />

          <label for="borrower_contact_number">Contact Number:</label>
          <input
            type="text"
            id="borrower_contact_number"
            name="borrower_contact_number"
          />

          <label for="borrower_email">Email:</label>
          <input type="email" id="borrower_email" name="borrower_email" />

          <label for="borrower_password">Password:</label>
          <input
            type="password"
            id="borrower_password"
            name="borrower_password"
          />

          <label for="borrower_address">Address:</label>
          <input type="text" id="borrower_address" name="borrower_address" />

          <label for="borrower_aadhar">Aadhar Number:</label>
          <input type="text" id="borrower_aadhar" name="borrower_aadhar" />

          <label for="borrower_pan">PAN Number:</label>
          <input type="text" id="borrower_pan" name="borrower_pan" />

          <label for="borrower_sex">Sex:</label>
          <select id="borrower_sex" name="borrower_sex">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label for="borrower_pan_image">PAN Image:</label>
          <input
            type="file"
            id="borrower_pan_image"
            name="borrower_pan_image"
          />

          <label for="borrower_aadhar_image">Aadhar Image:</label>
          <input
            type="file"
            id="borrower_aadhar_image"
            name="borrower_aadhar_image"
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}
export default Register_Borrower
