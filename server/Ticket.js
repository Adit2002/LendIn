const {Schema,model}=require("mongoose");
const Ticket=new Schema({
    loan_amount: Number,
    loan_duration: Number,
});
module.exports=model("Ticket_Schema",Ticket);