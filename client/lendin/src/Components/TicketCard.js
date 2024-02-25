import React from 'react'
import './css/TicketCard.css' // Import your CSS file

const TicketCard = ({ ticket }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Ticket Details</h2>
      </div>
      <div className="card-body">
        <p>
          <strong>Date Created:</strong> {ticket.Date_created}
        </p>
        <p>
          <strong>Description:</strong> {ticket.Description}
        </p>
        <p>
          <strong>Ticket Score:</strong> {ticket.TicketScore}
        </p>
        <p>
          <strong>Ticket ID:</strong> {ticket.Ticket_id}
        </p>
        <p>
          <strong>Borrower Email:</strong> {ticket.borrower_mail}
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
          <strong>Loan Interest:</strong> {ticket.loan_interest}
        </p>
        <p>
          <strong>Loan Type:</strong> {ticket.loan_type}
        </p>
      </div>
    </div>
  )
}

export default TicketCard
