import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Register_Borrower = () => {
  const navigate = useNavigate();
  const name=localStorage.getItem('name');
  const email=localStorage.getItem('email');
  const HandleSubmit = async (e) => {
    e.preventDefault()
    try {
      const serverResponse = await axios.post(
        'https://lendin-1.onrender.com/Register_Borrower',
        {
          name: name,
          contact_number: e.target.borrower_contact_number.value,
          email: email,
          address: e.target.borrower_address.value,
          aadhar: e.target.borrower_aadhar.value,
          pan: e.target.borrower_pan.value,
          sex: e.target.borrower_sex.value,
        }
      )
      if (serverResponse.data.is_true === true) {
        console.log('Success')
        navigate(`/${email}/DsbBrw`);
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
        <h1 className='name-card'>Register as Borrower</h1>
        <br/>
        <h2 className='name-card'>Email: {email} </h2>
        <form onSubmit={HandleSubmit}>
          <label for="borrower_name">Name:</label>
          <input type="text" id="borrower_name" name="borrower_name" placeholder={name} />

          <label for="borrower_contact_number">Contact Number:</label>
          <input
            type="text"
            id="borrower_contact_number"
            name="borrower_contact_number"
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
          <button type="submit">Submit</button>
        </form>
        </div>
        </div>
      </div>
  )
}
export default Register_Borrower
