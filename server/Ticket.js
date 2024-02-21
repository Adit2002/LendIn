const {Schema,model}=require("mongoose");
const Ticket=new Schema({
    Ticket_id: String,
    borrower_mail: String,
    loan_amount: Number,
    loan_duration: Number,
    loan_type: String,
    loan_intrest: Number,
    loan_installment: Number,
    Description: String,
    views: Number,
    TicketScore: Number,
    Date_created: Date
});
module.exports=model("Ticket_Schema",Ticket);
// TicketScore 1 represents Bad Loan (defaulter),
//  Score 0 represents Good Loan. (No Risk)