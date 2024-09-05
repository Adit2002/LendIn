import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/openTicket.css";
import PieOne from "./openticketpieone";
import PieTwo from "./openticketpietwo";

const Open_Ticket = () => {
  const navigate = useNavigate();
  const [Ticket_DataAll, setTicket_DataAll] = useState([]);
  const [Ticket_Data, setTicket_Data] = useState({});
  const [User_Data, setUser_Data] = useState({});
  const [User_ML, setUser_ML] = useState({});
  const [showPie, setShowPie] = useState(false);
  const [showPie2,setShowPie2] = useState(false);
  const [showPiestat2, setShowPiestat2] =useState("See");
  const [showPiestat, setShowPiestat] =useState("See");
  const [Trns_Data,setTrns_Data]=useState({
    "email": "",
    "on_time": 0,
    "late_15_to_30": 0,
    "late_30_plus": 0,
    "non_repayment": 0
  });
  const email=localStorage.getItem('email');
  const Handle_Card = async () => {
    try {
      const serverresponse = await axios.post(
        "https://lend-8g9ih55s7-adit2002s-projects.vercel.app/Open_Ticket",
        {
          tid: localStorage.getItem("tid"),
          email: localStorage.getItem("Email"),
        }
      );
      setTicket_Data(serverresponse.data.JsonData_ticket);
      setTicket_DataAll(serverresponse.data.JsonData_ticketAll);
      setUser_Data(serverresponse.data.JsonData_user);
      setUser_ML(serverresponse.data.JsonData_ML);
      console.log(serverresponse.data.JsonTrns_Data.email);
      setTrns_Data({
        email: serverresponse.data.JsonTrns_Data.email,
        on_time: serverresponse.data.JsonTrns_Data.on_time,
        late_15_to_30: serverresponse.data.JsonTrns_Data.late_15_to_30,
        late_30_plus: serverresponse.data.JsonTrns_Data.late_30_plus,
        non_repayment: serverresponse.data.JsonTrns_Data.non_repayment
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = () => {
    setShowPie(!showPie);
    if(showPiestat==="See") setShowPiestat("Unsee");
    else setShowPiestat("See");
  };
  const handleClick2 = () => {
    setShowPie2(!showPie2);
    if(showPiestat2==="See") setShowPiestat2("Unsee");
    else setShowPiestat2("See");
  };
  const funcheck = async () => {
    try {
      const checkToken = await axios.get("https://lend-8g9ih55s7-adit2002s-projects.vercel.app/checktoken", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (!checkToken.data.is_true) {
        navigate("/Home");
      } else {
        Handle_Card();
        console.log("Token is valid");
      }
    } catch (error) {
      console.error("Error checking token:", error);
      navigate("/Home");
    }
  };
  const BTC=()=>{
    navigate(`/${email}/Transaction_init`);
  }
  useEffect(() => {
    funcheck();
  }, []); 
  useEffect(() => {
  }, [Trns_Data]);
    return (
          <div className="openTicket">
              <h1 className="h1">Know The User</h1>
              <div className="chart-container">
                <div className="chart">
                <h3 className="h3">Previous Outstanding Loans, of Borrower</h3>
                <button className="btn1" onClick={handleClick}>{showPiestat}</button>
                  {showPie && <PieOne data_ticketAll={Ticket_DataAll} />}
                </div>
                <div className="chart">   
                  <h3 className="h3">See User RePayment Data</h3>
                  <button className="btn1" onClick={handleClick2}>{showPiestat2}</button>
                  {showPie2 && <PieTwo Trns={Trns_Data} />}
                </div>
              </div>
              <div>
                <br/>
              <h1 className="h1">User Details: </h1>
              <h3 className="h3"> Name : {User_Data.borrower_name} </h3>
              <h3 className="h3"> Contact Number : {User_Data.borrower_contact_number} </h3>
              <h3 className="h3"> Borrower Email : {User_Data.borrower_email} </h3>
              <h3 className="h3"> Address : {User_Data.borrower_address} </h3>
              </div>
              <br/>
              <div>
              <h1 className="h1">Ticket Details: </h1>
              <h3 className="h3"> Loan Amount : {Ticket_Data.loan_amount} </h3>
              <h3 className="h3"> Loan Type : {Ticket_Data.loan_type} </h3>
              <h3 className="h3"> Loan Intrest : {Ticket_Data.loan_intrest} </h3>
              <h3 className="h3"> Loan installment : {Ticket_Data.loan_installment} </h3>
              <h3 className="h3"> Loan Duration : {Ticket_Data.loan_duration} </h3>
              <h3 className="h3"> Ticket Score : {Ticket_Data.ticketScore} </h3>
              </div>
              <button onClick={BTC} className="btn1">Go To Pay</button>
          </div>
    );
};

export default Open_Ticket;
