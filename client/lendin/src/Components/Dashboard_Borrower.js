import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/general.css";
import { useState } from "react";
const Dashboard_Borrower = () => {
  const navigate = useNavigate();
  const [exp, setExp] = useState(false);
  // const token = localStorage.getItem('token');
  const email = localStorage.getItem("email");
  const expand=()=>{
    setExp(!exp);
  }
  const funcheck = async () => {
    const checkToken = await axios.get("http://localhost:3001/checktoken", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (checkToken.data.is_true === false) {
      navigate("/Home");
    } else {
      console.log("True");
    }
  };
  const HandleLogout = () => {
    localStorage.clear();
    navigate("/Login");
  };
  funcheck();
  return (
    <div className="page">
      <div className="image-postlogin">
        <div className="section">
          <h1 className="metallic-heading">
            {" "}
            Hello! {localStorage.getItem("Name")} How can we help -{" "}
          </h1>
          <br />
          <button onClick={expand} className="box-link">
            Guide on how to borrow instantly{" "}
            <i class="fi fi-sr-angle-small-down"></i>
          </button>
          <br />
          {exp && (
            <div className="info-reg">
              <h2>Guide:</h2>
              <ul>
                <li>
                  <h3>Step 1: Connect to MetaMask for seamless connectivity to the
                  CryptoCurrency Network.</h3>
                </li>
                <li>
                  <h3>Step 2: Add details to get a credit score. A good score
                  describes your ability to repay. Maintain a good score for an
                  easy and fast process.</h3>
                </li>
                <li>
                  <h3>Step 3: Create a ticket describing your requirements, and you
                  are good to go.</h3>
                </li>
              </ul>
            </div>
          )}
          <br/>

          <a className="box-link" href={`/${email}/CreateTicket`}>
            {" "}
            Link to Create Ticket
          </a>
          <br />
          <a className="box-link" href={`/${email}/Brw_addtnl_info`}>
            Add Additional Info
          </a>
          <br />
          <a className="box-link" href={'/metamask'}>
            Connect to MetaMask
          </a>
          <br />
          <br />
          <button className="btn" onClick={HandleLogout}>
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
};
export default Dashboard_Borrower;
