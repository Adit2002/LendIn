import React from 'react'
import './css/TicketCard.css' 
import { useNavigate } from 'react-router-dom'

const TicketCard = ({ ticket }) => {
  const navigate = useNavigate();
  let color="";
  let score=ticket.TicketScore;
  if(score==="0-10%"){
    color="#f40c0c";
  }
  else if(score==="80-100%"||score==="90-100%"){
    color="#15cc18";
  }
  else if(score==="0-5%"){
    color="#ff0202";
  }
  else if(score==="70-90%"){
    color="#30ba4e";
  }
  else if(score==="60-80%"){
    color="#84d596";
  }
  else if(score==="50-75%"){
    color="#6c992d";
  }
  else if(score==="40-70%"){
    color="#ae4b4b";
  }
  const Pay = (e) => {
    localStorage.setItem('tid',e);
    navigate(`/${localStorage.getItem('Email')}/Open_Ticket`)
  }
  return (
    <div className="card" style={{ backgroundColor: color }}>
      <div className="card-header">
        <h2>Ticket Details</h2>
      </div>
      <div className="card-body">
        <p>
          <strong>Description:</strong> {ticket.Description}
        </p>
        <p>
          <strong>Ticket Score:</strong> {ticket.TicketScore}
        </p>
        <p>
          <strong>Loan Amount:</strong> {ticket.loan_amount}
        </p>
        <p>
          <strong>Loan Duration:</strong> {ticket.loan_duration}
        </p>
        <p>
          <strong>Loan Installment:</strong> {ticket.loan_installment}
        </p>
        <p>
          <strong>Loan Interest:</strong> {ticket.loan_intrest}
        </p>
        <p>
          <strong>Loan Type:</strong> {ticket.loan_type}
        </p>
        <button className="Ticket-btn" onClick={() => Pay(ticket.Ticket_id)}>

          Pay Now
        </button>
      </div>
    </div>
  )
}

export default TicketCard
