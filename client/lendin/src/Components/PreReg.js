import axios from "axios";
import { useState } from "react"; // Import useState hook
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
const PreReg = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("R");
  const handleHere = async (credential) => {
    try {
      const serverResponse = await axios.post("https://lendin-1.onrender.com/Reg", {
        role: role,
        token: credential,
      });
      localStorage.setItem('role',role);
      localStorage.setItem('name',serverResponse.data.Name);
      localStorage.setItem('email',serverResponse.data.email);
      const email=serverResponse.data.email;
      localStorage.setItem('token',serverResponse.data.Jtoken);
      if(serverResponse.data.isPresent===true){
        if(role===1){
          navigate(`/${email}/DsbBrw`);
          return;
        }
        else{
          navigate(`/${email}/DsbInv`);
          return;
        }
      }
      if (role === 0) {
        navigate("/register_inv");
      } else {
        navigate("/register_brw");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="page">
      <div className="image-prelogin">
        <div className="GLG">
          <h1 className="name-card">Register</h1>
          <GoogleLogin
            theme="filled_black"
            onSuccess={(credentialResponse) => {
              localStorage.setItem("Gtoken", credentialResponse.credential);
              handleHere(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
          />
        </div>
      </div>
    </div>
  );
};
export default PreReg;
