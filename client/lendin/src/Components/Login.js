import axios from 'axios';
import { useState } from 'react'; // Import useState hook
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const [val, setVal] = useState(-1); 
  const [message,setMessage]=useState();

  const Login_Submit = async (role, credentialResponse) => { 
    try {
      const serverResponse = await axios.post('https://lendin-1.onrender.com/Login', {
        role: role,
        token: credentialResponse, 
      });
      localStorage.setItem('token',serverResponse.data.Jtoken);
      localStorage.setItem('role',role);
      localStorage.setItem('name',serverResponse.data.Name);
      localStorage.setItem('email',serverResponse.data.email);
      if(serverResponse.data.ispresent===false){
        if(val==0){
          navigate('/register_inv');
          return;
        }
        else{
          navigate('/register_brw');
          return;
        }
      }
      if(val==0){
        navigate(`/${serverResponse.data.email}/DsbInv`);
      }
      else{
        navigate(`/${serverResponse.data.email}/DsbBrw`);
      }
    }catch(err){
      console.log(err);
    }
  };
  const Change = (e) => {
    if (e.target.id === 'investor') {
      setVal(0);
    } else if (e.target.id === 'borrower') {
      setVal(1);
    }
  };

  return (
    <div className="page">
      <div className='image-prelogin'>
        <div className='info-form-login'>
          <form onChange={Change}>
            <div className="radio-form">
              <div className="radio-btn">
                <input type="radio" id="investor" name="role" value="investor" />
                <label htmlFor="investor">Investor</label>
              </div>
              <div className="radio-btn">
                <input type="radio" id="borrower" name="role" value="borrower" />
                <label htmlFor="borrower">Borrower</label>
              </div>
            </div>
          </form>
          <div className='google-login'>
            <GoogleLogin theme='filled_black'
              onSuccess={(credentialResponse) => {
                localStorage.setItem('Gtoken', credentialResponse.credential);
                if (val !== -1) {
                  Login_Submit(val, credentialResponse); 
                }
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
